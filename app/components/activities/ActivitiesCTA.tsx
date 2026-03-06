// components/activities/ActivitiesCTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Users, Gift, ArrowRight, Phone, Mail, Star } from "lucide-react";
import Link from "next/link";
import { colors } from "./activitiesData";

export default function ActivitiesCTA() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink}, ${colors.orange})`
                }}
            />

            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Floating shapes */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-white" />
                            <span className="text-sm font-bold text-white">Ready for Adventure?</span>
                        </div>

                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
                            style={{ fontFamily: '"Fredoka One", cursive' }}
                        >
                            Plan Your
                            <br />
                            <span className="text-[#ffc60b]">Epic Day Out!</span>
                        </h2>

                        <p className="text-white/90 text-lg mb-8 max-w-lg">
                            Book your activities now and get ready for an unforgettable adventure filled with fun, laughter, and excitement!
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {[
                                { icon: Calendar, text: "Flexible Booking" },
                                { icon: Users, text: "Group Discounts" },
                                { icon: Gift, text: "Free Goodies" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/book">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-[#ff661a] font-bold rounded-full shadow-xl flex items-center gap-2"
                                    style={{ fontFamily: '"Fredoka One", cursive' }}
                                >
                                    Book Now
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                                    style={{ fontFamily: '"Fredoka One", cursive' }}
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Animated rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-4 border-white/20"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full border-4 border-white/30"
                                animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />

                            {/* Center content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-8xl mb-4"
                                >
                                    🎪
                                </motion.div>
                                <h3
                                    className="text-3xl font-black mb-2"
                                    style={{ fontFamily: '"Fredoka One", cursive' }}
                                >
                                    25+ Activities
                                </h3>
                                <p className="text-white/80">All in one place!</p>
                            </div>

                            {/* Floating contact cards */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#ff661a]/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-[#ff661a]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">Call us</div>
                                        <div className="text-sm font-bold text-gray-800">1800-123-4567</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#00b9e3]/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-[#00b9e3]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">Email us</div>
                                        <div className="text-sm font-bold text-gray-800">hello@jusjumpin.com</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Rating badge */}
                            <motion.div
                                className="absolute top-1/2 -right-8 bg-white rounded-xl p-3 shadow-xl"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">4.9/5 Rating</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}