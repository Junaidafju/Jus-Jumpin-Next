'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export function ContactFormSection() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name.trim()) newErrors.name = 'Full name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone) {
            newErrors.phone = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Enter valid 10-digit number starting with 6-9';
        }

        if (!formData.subject) newErrors.subject = 'Please select a topic';

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const inputClasses = (error?: string) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
    ${error
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-green-200 bg-green-50/50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
        }
    outline-none font-sans text-gray-700
  `;

    const labelClasses = 'block font-sans font-semibold text-sm text-green-700 mb-2';

    // Quick contact cards data
    const contactCards = [
        {
            icon: '📍',
            title: 'Our Address',
            content: 'PS Qube, Street No. 1111, Action Area IID, Rajarhat, Newtown, West Bengal 700156',
            link: null
        },
        {
            icon: '✉️',
            title: 'Email Us',
            content: 'info@jusjumpin.com',
            link: 'mailto:info@jusjumpin.com'
        },
        {
            icon: '📞',
            title: 'Booking & Birthdays',
            content: '+91 9830359999\n+91 9874206206',
            link: 'tel:+919830359999'
        },
        {
            icon: '📣',
            title: 'Marketing Queries',
            content: '+91 9230967166',
            link: 'tel:+919230967166'
        }
    ];

    return (
        <section className="relative py-24 px-4" style={{
            background: 'linear-gradient(180deg,#052e16 0%,#0f172a 100%)'
        }}>
            {/* Spacer for overlapping CTA */}
            <div className="h-20" />

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Column - Quick Connect */}
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="text-center lg:text-left">
                            <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase mb-4">
                                ✦ Get In Touch
                            </span>
                            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                                Quick Connect
                            </h2>
                            <p className="text-green-200/80 max-w-lg mx-auto lg:mx-0">
                                We're here to help with bookings, birthdays, marketing and events.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="group bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="flex gap-4">
                                        <span className="text-2xl">{card.icon}</span>
                                        <div>
                                            <h3 className="font-display font-bold text-green-400 text-sm mb-1">{card.title}</h3>
                                            {card.link ? (
                                                <a
                                                    href={card.link}
                                                    className="text-gray-300 hover:text-green-300 transition text-sm block whitespace-pre-line"
                                                >
                                                    {card.content}
                                                </a>
                                            ) : (
                                                <p className="text-gray-300 text-sm">{card.content}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">🌐</span>
                                <h3 className="font-display font-bold text-green-400">Follow Our Journey</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: 'Instagram', url: 'https://instagram.com/jusjumpin', icon: '📸', color: 'from-purple-500 to-pink-500' },
                                    { label: 'Facebook', url: 'https://facebook.com/jusjumpin', icon: '👍', color: 'from-blue-500 to-blue-600' },
                                    { label: 'YouTube', url: 'https://youtube.com/jusjumpin', icon: '▶️', color: 'from-red-500 to-red-600' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${social.color} text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                                    >
                                        {social.icon} {social.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Live Chat */}
                        <div className="bg-gradient-to-r from-green-600/20 to-green-500/10 border border-green-500/30 rounded-xl p-5 flex items-center gap-4">
                            <span className="text-3xl animate-bounce">💬</span>
                            <div>
                                <h3 className="font-display font-bold text-green-400">Chat with Us</h3>
                                <p className="text-gray-300 text-sm">Open Daily: 10 AM – 9 PM</p>
                            </div>
                            <div className="ml-auto">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
                            {/* Top Accent Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="text-7xl mb-6 animate-bounce">🎉</div>
                                    <h3 className="font-display font-bold text-2xl text-gray-800 mb-3">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thanks for reaching out! We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-display font-bold text-2xl text-gray-800 mb-2">Send us a Message</h3>
                                    <p className="text-gray-600 text-sm mb-6">
                                        Have a question or want to book a session? Fill out the form below and we'll respond as soon as possible.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Full Name */}
                                        <div>
                                            <label className={labelClasses}>
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                className={inputClasses(errors.name)}
                                                placeholder="e.g. Arjun Sharma"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                    <span>⚠</span> {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className={labelClasses}>
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                className={inputClasses(errors.email)}
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                    <span>⚠</span> {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className={labelClasses}>
                                                Mobile Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="flex items-center bg-green-50 border-2 border-green-200 rounded-xl px-4 font-medium text-green-700">
                                                    🇮🇳 +91
                                                </div>
                                                <input
                                                    type="tel"
                                                    maxLength={10}
                                                    value={formData.phone}
                                                    onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                                                    className={inputClasses(errors.phone)}
                                                    placeholder="9876543210"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                    <span>⚠</span> {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className={labelClasses}>
                                                Subject <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => handleChange('subject', e.target.value)}
                                                className={inputClasses(errors.subject)}
                                            >
                                                <option value="">Select a topic…</option>
                                                <option value="booking">Booking & Reservations</option>
                                                <option value="birthday">Birthday Parties</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="feedback">Feedback & Suggestions</option>
                                                <option value="corporate">Corporate Events</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.subject && (
                                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                    <span>⚠</span> {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className={labelClasses}>
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => handleChange('message', e.target.value)}
                                                className={inputClasses(errors.message)}
                                                placeholder="Tell us how we can help…"
                                            />
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                    <span>⚠</span> {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`
                        w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl
                        font-display font-bold text-lg
                        transform transition-all duration-300
                        ${isLoading
                                                    ? 'opacity-70 cursor-not-allowed'
                                                    : 'hover:scale-105 hover:shadow-xl hover:shadow-green-600/30'
                                                }
                      `}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                'Send Message →'
                                            )}
                                        </button>

                                        {/* Security Note */}
                                        <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                                            <span>🔒</span> Your information is secure and private
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}