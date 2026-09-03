'use client';

import React, { useState, useRef, useEffect } from 'react';
import BookingForm from './BookingForm';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
    quickActions?: Array<{ label: string; action: string; isBooking?: boolean }>;
}

interface ChatbotProps {
    onClose?: () => void;
}

/**
 * Parses markdown-like strings (**bold**, links, bullets) into rich React nodes.
 */
function FormattedMessageText({ text, isBot }: { text: string; isBot: boolean }) {
    const lines = text.split('\n');

    return (
        <div className="space-y-1.5 text-[13.5px] leading-relaxed">
            {lines.map((line, lineIdx) => {
                const trimmed = line.trim();

                if (!trimmed) {
                    return <div key={lineIdx} className="h-1" />;
                }

                const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
                const cleanContent = isBullet ? trimmed.replace(/^[•\-]\s*/, '') : trimmed;

                return (
                    <div
                        key={lineIdx}
                        className={isBullet ? 'flex items-start gap-2 pl-1' : ''}
                    >
                        {isBullet && (
                            <span className={`inline-block mt-1 text-xs select-none ${isBot ? 'text-violet-200' : 'text-violet-500'}`}>
                                ✦
                            </span>
                        )}
                        <span className="flex-1">
                            {renderInlineTokens(cleanContent, isBot)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Handles inline tokens: **bold**, URLs, and emojis.
 */
function renderInlineTokens(text: string, isBot: boolean) {
    const tokenRegex = /(\*\*.*?\*\*|https?:\/\/[^\s)]+)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, i) => {
        if (!part) return null;

        if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return (
                <strong
                    key={i}
                    className={`font-bold ${isBot ? 'text-white' : 'text-slate-900'}`}
                >
                    {boldText}
                </strong>
            );
        }

        if (part.startsWith('http://') || part.startsWith('https://')) {
            return (
                <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-semibold underline underline-offset-2 ml-1 text-xs py-0.5 px-2.5 rounded-full transition-all ${isBot
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                        }`}
                >
                    <span>View Link</span>
                    <span className="text-[10px]">↗</span>
                </a>
            );
        }

        return <span key={i}>{part}</span>;
    });
}

const INITIAL_QUICK_ACTIONS = [
    { label: '🎉 Book Party', action: 'book_party', isBooking: true },
    { label: '💰 Pricing', action: 'What are your prices?' },
    { label: '⏰ Hours', action: 'What are your hours?' },
    { label: '📍 Locations', action: 'Where are you located?' },
    { label: '🎮 Activities', action: 'What activities do you have?' }
];

export default function Chatbot({ onClose }: ChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: '👋 Hi! I\'m JusJumpin\'s AI Assistant.\n\nAsk me about our **locations, ticket prices, timings, activities**, or tap any option below to get started!',
            timestamp: new Date(),
            quickActions: INITIAL_QUICK_ACTIONS
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [detectedLocation, setDetectedLocation] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = async (userText: string) => {
        if (!userText.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: userText.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userText.trim(),
                    location: detectedLocation,
                    history: messages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.content
                    }))
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const currentLoc = data.locationFound || detectedLocation;
            if (data.locationFound) {
                setDetectedLocation(data.locationFound);
            }

            if (data.showBookingForm) {
                setShowBookingForm(true);
            }

            let contextualActions: Array<{ label: string; action: string; isBooking?: boolean }> | undefined = undefined;

            if (currentLoc) {
                const shortCity = currentLoc.split('-')[0].trim();
                contextualActions = [
                    { label: `🎉 Book Party at ${shortCity}`, action: 'book_party', isBooking: true },
                    { label: '💰 Pricing', action: `${currentLoc} pricing` },
                    { label: '⏰ Hours', action: `${currentLoc} hours` },
                    { label: '🎮 Activities', action: `${currentLoc} activities` }
                ];
            } else if (data.answer && data.answer.includes('Which location would you like to check?')) {
                contextualActions = [
                    { label: '📍 Kolkata', action: 'Kolkata' },
                    { label: '📍 Bengaluru', action: 'Bengaluru' },
                    { label: '📍 Hyderabad', action: 'Hyderabad' },
                    { label: '📍 Noida', action: 'Noida' },
                    { label: '📍 Mumbai', action: 'Mumbai' },
                    { label: '📍 Raipur', action: 'Raipur' },
                    { label: '🎉 Book Party', action: 'book_party', isBooking: true }
                ];
            } else {
                contextualActions = [
                    { label: '🎉 Book Party', action: 'book_party', isBooking: true },
                    { label: '💰 Pricing', action: 'What are your prices?' },
                    { label: '⏰ Hours', action: 'What are your hours?' },
                    { label: '📍 Locations', action: 'Where are you located?' },
                    { label: '🎮 Activities', action: 'What activities do you have?' }
                ];
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: data.answer || 'I am ready to help! Please ask about our trampoline parks or party bookings.',
                timestamp: new Date(),
                quickActions: contextualActions
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: 'I\'m here to help! Please ask about our locations (Kolkata, Bengaluru, Hyderabad, Noida, Raipur, etc.) or call us at **+91 98362 29922**.',
                timestamp: new Date(),
                quickActions: INITIAL_QUICK_ACTIONS
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleActionClick = (action: string, isBooking?: boolean) => {
        if (isBooking || action === 'book_party') {
            setShowBookingForm(true);
            return;
        }
        sendMessage(action);
    };

    const handleBookingSuccess = (confirmationSummary: string) => {
        const confirmBotMsg: Message = {
            id: Date.now().toString(),
            type: 'bot',
            content: confirmationSummary,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, confirmBotMsg]);
    };

    return (
        <div className="relative flex flex-col h-full bg-[#f4f5fa] rounded-[28px] overflow-hidden select-text">
            {/* Embedded In-Chat Booking Form View */}
            <BookingForm
                isOpen={showBookingForm}
                onClose={() => setShowBookingForm(false)}
                onSuccessBooking={handleBookingSuccess}
                location={detectedLocation}
            />

            {/* Modern Header */}
            <div className="flex-shrink-0 px-5 py-4 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6345fc] via-[#7b57ff] to-[#9a78ff] flex items-center justify-center text-white text-lg shadow-md shadow-violet-500/20">
                            😀
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-[15px] leading-tight tracking-tight">
                                Jus Jumpin AI
                            </h3>
                            <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                Assistant
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            Online • Ready to help
                        </p>
                    </div>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors text-sm"
                        aria-label="Close Chat"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Messages Container with Native Mouse-Wheel Scrolling */}
            <div
                ref={scrollContainerRef}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e1 transparent'
                }}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'
                            }`}
                    >
                        <div
                            className={`flex items-end gap-2.5 max-w-[88%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                        >
                            {/* Avatar */}
                            {message.type === 'bot' ? (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6345fc] to-[#8a68ff] text-white flex items-center justify-center text-xs flex-shrink-0 shadow-xs mb-1">
                                    😎
                                </div>
                            ) : (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-xs mb-1 font-semibold">
                                    👀
                                </div>
                            )}

                            {/* Message Bubble */}
                            <div
                                className={`px-4 py-3 rounded-[20px] shadow-xs ${message.type === 'user'
                                    ? 'bg-white text-slate-800 rounded-br-[4px] border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                                    : 'bg-gradient-to-br from-[#6345fc] via-[#704efe] to-[#7f5cff] text-white rounded-bl-[4px] shadow-[0_4px_14px_rgba(99,69,252,0.22)]'
                                    }`}
                            >
                                <FormattedMessageText
                                    text={message.content}
                                    isBot={message.type === 'bot'}
                                />
                            </div>
                        </div>

                        {/* In-chat Flow Action Buttons */}
                        {message.type === 'bot' && message.quickActions && message.quickActions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5 ml-9 max-w-[88%]">
                                {message.quickActions.map((qa, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleActionClick(qa.action, qa.isBooking)}
                                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all shadow-2xs ${qa.isBooking
                                            ? 'bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-xs font-semibold'
                                            : 'bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200/90'
                                            }`}
                                    >
                                        {qa.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Timestamp */}
                        <span className={`text-[10px] text-slate-400 mt-1 px-1 ${message.type === 'user' ? 'mr-9' : 'ml-9'
                            }`}>
                            {message.timestamp.toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>
                ))}

                {/* Typing Indicator */}
                {loading && (
                    <div className="flex items-end gap-2.5 justify-start">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6345fc] to-[#8a68ff] text-white flex items-center justify-center text-xs flex-shrink-0 shadow-xs mb-1">
                            🤖
                        </div>
                        <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-[20px] rounded-bl-[4px] shadow-xs">
                            <div className="flex items-center space-x-1.5">
                                <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar (Floating Capsule) */}
            <form
                onSubmit={handleSubmit}
                className="flex-shrink-0 p-3 bg-white border-t border-slate-200/80"
            >
                <div className="flex items-center gap-2 bg-[#f4f5fa] border border-slate-200/80 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200/50 transition-all">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about prices, timings, party booking..."
                        disabled={loading}
                        className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none disabled:opacity-50 placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6345fc] to-[#7f5cff] text-white flex items-center justify-center hover:opacity-95 disabled:opacity-40 transition-all shadow-sm flex-shrink-0 cursor-pointer"
                        aria-label="Send message"
                    >
                        {loading ? (
                            <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <span className="text-xs font-bold leading-none">➤</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}