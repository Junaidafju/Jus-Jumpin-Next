'use client';

import React, { useState } from 'react';

interface BookingFormData {
    name: string;
    phone: string;
    email: string;
    people: string;
    location: string;
    date: string;
    time: string;
    specialRequests: string;
}

interface BookingFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccessBooking?: (details: string) => void;
    location?: string;
}

export default function BookingForm({ isOpen, onClose, onSuccessBooking, location }: BookingFormProps) {
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        phone: '',
        email: '',
        people: '10',
        location: location || '',
        date: '',
        time: '',
        specialRequests: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // If location prop changes, update default
    React.useEffect(() => {
        if (location) {
            setFormData(prev => ({ ...prev, location }));
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate Indian phone number (10 digits, starts with 6,7,8,9)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            setError('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)');
            setLoading(false);
            return;
        }

        if (formData.name.trim().length < 2) {
            setError('Please enter your full name');
            setLoading(false);
            return;
        }

        if (parseInt(formData.people) < 1) {
            setError('Please enter number of guests (minimum 1)');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                const summary = `🎉 **Party Booking Request Received!**\n\n• **Name:** ${formData.name}\n• **Location:** ${formData.location || 'General'}\n• **Guests:** ${formData.people} people\n• **Date & Time:** ${formData.date || 'To be confirmed'} ${formData.time || ''}\n\nOur team will call you at **+91 ${formData.phone}** within 24 hours to confirm packages and themes!`;

                setTimeout(() => {
                    setSuccess(false);
                    onSuccessBooking?.(summary);
                    onClose();
                    setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        people: '10',
                        location: location || '',
                        date: '',
                        time: '',
                        specialRequests: '',
                    });
                }, 2000);
            } else {
                setError(data.error || 'Failed to submit booking');
            }
        } catch (err) {
            setError('Could not connect to server. Please try again or call +91 98362 29922.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-20 flex flex-col bg-[#f4f5fa] rounded-[28px] overflow-hidden animate-fadeIn select-text">
            {/* Form Header */}
            <div className="flex-shrink-0 px-4 py-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-xs">
                <button
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-full transition-colors"
                >
                    <span>←</span>
                    <span>Back to Chat</span>
                </button>
                <div className="text-right">
                    <h3 className="font-bold text-slate-900 text-sm leading-none">🎉 Book Your Party</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">Quick 24h Confirmation</p>
                </div>
            </div>

            {/* Form Body */}
            <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-4 space-y-3.5 overscroll-contain"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
            >
                {success ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-3 shadow-md animate-bounce">
                            ✓
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">Booking Request Sent!</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                            Thank you, {formData.name}! Our events coordinator will contact you shortly to confirm packages & themes.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
                                <span>⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                placeholder="e.g. Rahul Sharma"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Mobile Number * (10 Digits)
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                placeholder="9876543210"
                                maxLength={10}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Park Location *
                            </label>
                            <select
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            >
                                <option value="">Select a Park</option>
                                <option value="Hyderabad - Sarath City Capital Mall">Hyderabad - Sarath City Capital Mall</option>
                                <option value="Hyderabad - DSL Virtue Mall">Hyderabad - DSL Virtue Mall</option>
                                <option value="Kolkata - ABC Square Building">Kolkata - ABC Square Building</option>
                                <option value="Kolkata - Avani Mall">Kolkata - Avani Mall</option>
                                <option value="Kolkata - Axis Mall">Kolkata - Axis Mall</option>
                                <option value="Kolkata - City Centre 2">Kolkata - City Centre 2</option>
                                <option value="Bengaluru - M5 Ecity Mall">Bengaluru - M5 Ecity Mall</option>
                                <option value="Bengaluru - Meenakshi Mall">Bengaluru - Meenakshi Mall</option>
                                <option value="Noida - The Great India Place (GIP)">Noida - The Great India Place (GIP)</option>
                                <option value="Noida - Spectrum Metro Mall">Noida - Spectrum Metro Mall</option>
                                <option value="Mumbai - R City Mall">Mumbai - R City Mall</option>
                                <option value="Pune - Seasons Mall">Pune - Seasons Mall</option>
                                <option value="Raipur - Zora The Mall">Raipur - Zora The Mall</option>
                                <option value="Nagpur - VR Mall">Nagpur - VR Mall</option>
                                <option value="Ranchi - Nucleus Mall">Ranchi - Nucleus Mall</option>
                                <option value="Surat - VR Mall">Surat - VR Mall</option>
                                <option value="Dhanbad - Prabhatam Grand Mall">Dhanbad - Prabhatam Grand Mall</option>
                                <option value="Siliguri - City Centre Mall">Siliguri - City Centre Mall</option>
                                <option value="Thane - R Mall">Thane - R Mall</option>
                                <option value="Durgapur - Junction Mall">Durgapur - Junction Mall</option>
                                <option value="Jamshedpur - P&M Mall">Jamshedpur - P&M Mall</option>
                                <option value="Nashik - City Centre Mall">Nashik - City Centre Mall</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Number of Guests *
                                </label>
                                <input
                                    type="number"
                                    value={formData.people}
                                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                                    className="w-full bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    min="1"
                                    placeholder="10"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-white border border-slate-200/90 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Special Requests / Theme (Optional)
                            </label>
                            <textarea
                                value={formData.specialRequests}
                                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                className="w-full bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 resize-none"
                                rows={2}
                                placeholder="e.g. Superhero theme, vegetarian snacks, mascots..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-xs font-bold transition-all shadow-md shadow-violet-500/25 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <span>🎉 Submit Booking Request</span>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}