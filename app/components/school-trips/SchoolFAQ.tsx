// components/school-trips/SchoolFAQ.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    ChevronDown,
    HelpCircle,
    MessageCircle,
    Phone,
    Mail,
    Search,
    X,
    Sparkles,
    Star,
    Zap
} from "lucide-react";
import Link from "next/link";

// Vibrant kids zone color theme
const themeColors = {
    pink: '#f67edd',
    green: '#6dc065',
    orange: '#ff661a',
    cyan: '#00b9e3',
    rose: '#ff5da0',
    yellow: '#ffc60b',
    lime: '#b2d235',
    red: '#ff3645',
    purple: '#8869d2'
};

// FAQ data structure with vibrant colors
interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: "booking" | "safety" | "activities" | "logistics";
    color: string;
    icon: string;
}

const faqData: FAQItem[] = [
    {
        id: "1",
        question: "How do I book a school trip to Jus Jumpin?",
        answer: "Booking is super easy! Fill out our colorful online form with your preferred dates, group size, and fun requirements. Our friendly school coordinators will contact you within 24 hours with a personalized adventure plan!",
        category: "booking",
        color: themeColors.cyan,
        icon: "🎫",
    },
    {
        id: "2",
        question: "What's the minimum and maximum group size?",
        answer: "We welcome groups from 15 to 200 energetic students! Small groups (15-30) get special weekday morning slots. Bigger groups (100+) are split into exciting batches so everyone gets maximum jumping time!",
        category: "booking",
        color: themeColors.orange,
        icon: "👫",
    },
    {
        id: "3",
        question: "What safety measures keep kids protected?",
        answer: "Safety is our #1 priority! We have certified first aid heroes on-site, mandatory safety briefings with fun demos, age-perfect activity zones, secure storage lockers, super-clean equipment, and full insurance coverage. All staff are background-checked safety superstars!",
        category: "safety",
        color: themeColors.green,
        icon: "🛡️",
    },
    {
        id: "4",
        question: "Are activities fun for all age groups?",
        answer: "Absolutely! We have magical zones for every age: Tiny Bouncers (4-7 years), Jumping Juniors (8-12 years), and Teen Flyers (13+ years). Each zone has perfectly-sized equipment and awesome challenges matched to their superpowers!",
        category: "activities",
        color: themeColors.purple,
        icon: "🎪",
    },
    {
        id: "5",
        question: "What should super students wear and bring?",
        answer: "Wear comfy athletic clothes (capes optional! 😉). We provide special grip socks with cool designs! Bring: water bottles (refill stations available), any needed medications, and signed permission slips. We handle all the fun equipment!",
        category: "logistics",
        color: themeColors.yellow,
        icon: "🎒",
    },
    {
        id: "6",
        question: "What's the teacher-to-student ratio?",
        answer: "We need 1 teacher per 10 primary kids or 1 per 15 secondary students. Our awesome staff adds extra supervision with dedicated activity leaders. Bonus: extra teachers get FREE entry to join the fun!",
        category: "logistics",
        color: themeColors.lime,
        icon: "👩‍🏫",
    },
    {
        id: "7",
        question: "What about rainy days or emergencies?",
        answer: "We're 100% INDOOR - rain or shine, the fun never stops! Need to reschedule? Just give us 48 hours notice. We have emergency plans, first aid stations, and direct lines to medical helpers if needed.",
        category: "safety",
        color: themeColors.rose,
        icon: "🌈",
    },
    {
        id: "8",
        question: "Do you have educational activities too?",
        answer: "Yes! Get ready for physics of bouncing, health & fitness challenges, and team-building adventures! Students earn awesome certificates. Many schools use us for PE, Science, and PSHE lessons - learning has never been this fun!",
        category: "activities",
        color: themeColors.pink,
        icon: "📚",
    },
];

// Category config with vibrant colors
const categoryConfig = {
    booking: { label: "Booking", color: themeColors.cyan, bg: "bg-cyan-100", icon: "🎫" },
    safety: { label: "Safety", color: themeColors.green, bg: "bg-green-100", icon: "🛡️" },
    activities: { label: "Activities", color: themeColors.purple, bg: "bg-purple-100", icon: "🎪" },
    logistics: { label: "Logistics", color: themeColors.yellow, bg: "bg-yellow-100", icon: "🎒" },
};

// Individual FAQ Item Component
const FAQItemComponent: React.FC<{
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}> = ({ item, isOpen, onToggle, index }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 100 }}
            className="h-full"
        >
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={onToggle}
                className={`relative h-full cursor-pointer rounded-3xl border-4 transition-all duration-300 overflow-hidden
          ${isOpen
                        ? "border-white shadow-2xl"
                        : "border-white/50 hover:border-white shadow-lg hover:shadow-xl"
                    }`}
                style={{
                    background: isOpen ? `linear-gradient(135deg, ${item.color}90, white)` : 'white',
                    boxShadow: isOpen ? `0 20px 40px ${item.color}0` : undefined
                }}
            >
                {/* Colorful top bar */}
                <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}
                />

                <div className="p-5 md:p-6">
                    {/* Header with icon and category */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                                style={{ background: `${item.color}20` }}
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                {item.icon}
                            </motion.div>
                            <div>
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                                    style={{ background: `${item.color}20`, color: item.color }}
                                >
                                    {categoryConfig[item.category].label}
                                </span>
                            </div>
                        </div>

                        {/* Animated chevron */}
                        <motion.div
                            animate={{
                                rotate: isOpen ? 180 : 0,
                                backgroundColor: isOpen ? item.color : '#f3f4f6'
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                            <ChevronDown
                                className="w-6 h-6"
                                style={{ color: isOpen ? 'white' : '#9ca3af' }}
                            />
                        </motion.div>
                    </div>

                    {/* Question */}
                    <h3
                        className="font-black text-lg md:text-xl leading-tight mb-3"
                        style={{
                            fontFamily: '"Fredoka One", cursive',
                            color: isOpen ? item.color : '#1f2937'
                        }}
                    >
                        {item.question}
                    </h3>

                    {/* Answer with animation */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div
                                    className="pt-3 border-t-2 border-dashed rounded-lg mt-3"
                                    style={{ borderColor: `${item.color}30` }}
                                >
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {item.answer}
                                    </p>

                                    {/* Fun CTA for booking */}
                                    {item.category === "booking" && (
                                        <Link href="/school-trips/book">
                                            <motion.span
                                                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-bold text-white"
                                                style={{ background: item.color }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                Start Booking Adventure!
                                            </motion.span>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closed state hint */}
                    {!isOpen && (
                        <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                            <Zap className="w-4 h-4" style={{ color: item.color }} />
                            <span>Tap to reveal!</span>
                        </div>
                    )}
                </div>

                {/* Decorative corner */}
                <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10"
                    style={{ background: item.color }}
                />
            </motion.div>
        </motion.div>
    );
};

// Main FAQ Component
export default function SchoolFAQ() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headerRef, { once: true, margin: "-100px" });

    // Filter FAQs
    const filteredFAQs = faqData.filter((item) => {
        const matchesSearch =
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory ? item.category === activeCategory : true;
        return matchesSearch && matchesCategory;
    });

    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const categories = ["all", "booking", "safety", "activities", "logistics"] as const;

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 overflow-hidden"
            style={{
                background: `linear-gradient(180deg, ${themeColors.pink}10 0%, ${themeColors.cyan}05 50%, ${themeColors.yellow}08 100%)`
            }}
            aria-labelledby="faq-heading"
        >
            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
                    style={{ background: themeColors.pink, top: '10%', left: '-10%' }}
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
                    style={{ background: themeColors.cyan, bottom: '20%', right: '-5%' }}
                    animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
                    style={{ background: themeColors.yellow, top: '50%', left: '50%' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Floating fun elements */}
            <div className="absolute inset-0 pointer-events-none">
                {['⭐', '🎈', '🎪', '🌈', '🎉', '✨'].map((emoji, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl md:text-5xl"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${15 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    >
                        {emoji}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm md:text-base mb-6 shadow-lg"
                        style={{ background: `linear-gradient(90deg, ${themeColors.orange}, ${themeColors.red})` }}
                    >
                        <MessageCircle className="w-5 h-5" />
                        Got Questions?
                        <motion.span
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🤔
                        </motion.span>
                    </motion.div>

                    <motion.h2
                        id="faq-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <span style={{ color: themeColors.purple }}>Frequently</span>{' '}
                        <span style={{ color: themeColors.cyan }}>Asked</span>{' '}
                        <span style={{ color: themeColors.orange }}>Questions</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Everything you need to know about the most awesome school trips ever!
                        <span className="inline-block ml-2 animate-bounce">🎉</span>
                    </motion.p>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative max-w-xl mx-auto mb-8"
                >
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors" style={{ color: themeColors.purple }} />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-12 py-4 bg-white border-4 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all text-lg"
                            style={{
                                borderColor: searchQuery ? themeColors.pink : '#f7f7f7ff',
                                boxShadow: searchQuery ? `0 0 0 4px ${themeColors.pink}20` : 'none'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                                style={{ background: themeColors.red }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Category Filter Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat, index) => {
                        const isActive = activeCategory === cat || (cat === "all" && !activeCategory);
                        const colors = [themeColors.cyan, themeColors.green, themeColors.purple, themeColors.yellow, themeColors.pink];
                        const color = colors[index % colors.length];

                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat === "all" ? null : cat)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 border-4
                  ${isActive ? 'text-white shadow-lg' : 'bg-white text-gray-600 hover:text-gray-900 border-gray-200'}`}
                                style={{
                                    backgroundColor: isActive ? color : 'white',
                                    borderColor: isActive ? color : '#e5e7eb',
                                    boxShadow: isActive ? `0 10px 20px ${color}40` : 'none'
                                }}
                            >
                                {cat === "all" ? "🌈 All Questions" : `${categoryConfig[cat as keyof typeof categoryConfig].icon} ${categoryConfig[cat as keyof typeof categoryConfig].label}`}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* FAQ Grid - 2 columns on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((item, index) => (
                            <FAQItemComponent
                                key={item.id}
                                item={item}
                                isOpen={openId === item.id}
                                onToggle={() => toggleFAQ(item.id)}
                                index={index}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full text-center py-16 bg-white rounded-3xl border-4 border-dashed"
                            style={{ borderColor: themeColors.pink }}
                        >
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Fredoka One", cursive' }}>No questions found!</h3>
                            <p className="text-gray-500 mb-6">Try different keywords or categories</p>
                            <motion.button
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory(null);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-full text-white font-bold"
                                style={{ background: themeColors.cyan }}
                            >
                                Clear Filters ✨
                            </motion.button>
                        </motion.div>
                    )}
                </div>

                {/* Fun Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 md:mt-20 relative rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${themeColors.purple}, ${themeColors.pink})`
                    }}
                >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-4 h-4 bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-4"
                        >
                            🚀
                        </motion.div>

                        <h3
                            className="text-3xl md:text-4xl font-black mb-4"
                            style={{ fontFamily: '"Fredoka One", cursive' }}
                        >
                            Still Have Questions?
                        </h3>

                        <p className="text-white/90 mb-8 max-w-lg mx-auto text-lg">
                            Our adventure specialists are ready to help plan your perfect school trip!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.a
                                href="tel:+911234567890"
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 bg-white rounded-full font-bold text-lg shadow-xl"
                                style={{ color: themeColors.purple }}
                            >
                                <Phone className="w-6 h-6" />
                                Call Us! 📞
                            </motion.a>

                            <motion.a
                                href="mailto:schools@jusjumpin.com"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-xl border-4 border-white"
                                style={{
                                    background: themeColors.yellow,
                                    color: '#ecedeeff'
                                }}
                            >
                                <Mail className="w-6 h-6" />
                                Email Us! 📧
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}