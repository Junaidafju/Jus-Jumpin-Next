'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, 
    Eye, 
    Sparkles, 
    Video, 
    DoorOpen, 
    HeartPulse, 
    MapPin, 
    Users, 
    Baby, 
    Ticket, 
    Shirt, 
    Gift, 
    Camera, 
    Car, 
    HelpCircle, 
    Plus 
} from 'lucide-react';
import { FAQ } from '@/types/location';

interface SafetyFAQProps {
    faqs: FAQ[];
    accentColor: string;
    isKids: boolean;
}

const SAFETY_ITEMS = [
    {
        Icon: Shield,
        label: 'Padded Surfaces',
        desc: 'All play zones have high-quality padded surfaces.',
        color: '#ff007f', // Pink glow
        shadow: 'rgba(255, 0, 127, 0.4)',
    },
    {
        Icon: Eye,
        label: 'Trained Supervisors',
        desc: 'Our team is trained to ensure a safe & fun experience.',
        color: '#ffc60b', // Yellow glow
        shadow: 'rgba(255, 198, 11, 0.4)',
    },
    {
        Icon: Sparkles,
        label: 'Regular Sanitisation',
        desc: 'Zones are sanitised regularly for a clean & hygienic environment.',
        color: '#22c55e', // Green glow
        shadow: 'rgba(34, 197, 94, 0.4)',
    },
    {
        Icon: Video,
        label: 'CCTV Monitoring',
        desc: '24/7 surveillance for your safety and peace of mind.',
        color: '#00b9e3', // Cyan glow
        shadow: 'rgba(0, 185, 227, 0.4)',
    },
    {
        Icon: DoorOpen,
        label: 'Controlled Entry/Exit',
        desc: 'Secure entry & exit points for complete safety.',
        color: '#8869d2', // Purple glow
        shadow: 'rgba(136, 105, 210, 0.4)',
    },
    {
        Icon: HeartPulse,
        label: 'First Aid Ready',
        desc: 'Trained staff & first aid kits are always available.',
        color: '#ff3645', // Red glow
        shadow: 'rgba(255, 54, 69, 0.4)',
    },
];

// Helper to determine custom Lucide icon based on FAQ question keywords
const getFAQIcon = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes('where') || q.includes('location') || q.includes('mall') || q.includes('exactly')) {
        return { Icon: MapPin, color: '#8869d2', bg: 'rgba(136, 105, 210, 0.12)' };
    }
    if (q.includes('adult') || q.includes('play too') || q.includes('people')) {
        return { Icon: Users, color: '#6dc065', bg: 'rgba(109, 192, 101, 0.12)' };
    }
    if (q.includes('toddler') || q.includes('child') || q.includes('safe') || q.includes('kid')) {
        return { Icon: Baby, color: '#ff661a', bg: 'rgba(255, 102, 26, 0.12)' };
    }
    if (q.includes('ticket') || q.includes('buy') || q.includes('price')) {
        return { Icon: Ticket, color: '#4facfe', bg: 'rgba(79, 172, 254, 0.12)' };
    }
    if (q.includes('wear') || q.includes('clothing') || q.includes('socks')) {
        return { Icon: Shirt, color: '#00b9e3', bg: 'rgba(0, 185, 227, 0.12)' };
    }
    if (q.includes('birthday') || q.includes('party') || q.includes('host') || q.includes('celebration')) {
        return { Icon: Gift, color: '#ffc60b', bg: 'rgba(255, 198, 11, 0.12)' };
    }
    if (q.includes('photo') || q.includes('camera') || q.includes('video') || q.includes('photography')) {
        return { Icon: Camera, color: '#ff5da0', bg: 'rgba(255, 93, 160, 0.12)' };
    }
    if (q.includes('parking') || q.includes('car')) {
        return { Icon: Car, color: '#b2d235', bg: 'rgba(178, 210, 53, 0.12)' };
    }
    return { Icon: HelpCircle, color: '#4facfe', bg: 'rgba(79, 172, 254, 0.12)' };
};

export default function SafetyFAQ({ faqs, accentColor, isKids }: SafetyFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    // Split FAQs into 2 columns
    const mid = Math.ceil(faqs.length / 2);
    const col1 = faqs.slice(0, mid);
    const col2 = faqs.slice(mid);

    // Theme configuration based on isKids (matching TimingsPricingMap.tsx)
    const config = {
        bg: isKids
            ? 'linear-gradient(135deg, #f5f0ff 0%, #e8e2f7 50%, #fcfaff 100%)'
            : 'linear-gradient(135deg, #090514 0%, #0d0926 50%, #04020b 100%)',
        cardBg: isKids ? 'rgba(255, 255, 255, 0.85)' : 'rgba(20, 14, 43, 0.85)',
        cardBorder: isKids ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255, 255, 255, 0.08)',
        textColor: isKids ? '#1e1b4b' : '#ffffff',
        mutedColor: isKids ? '#4f46e5' : 'rgba(255, 255, 255, 0.6)',
        waveColor: isKids ? '#e8e2f7' : '#090514',
        accent: accentColor || '#ff661a',
    };

    // Cross-browser gradient text styling
    const gradientStyle = {
        background: `linear-gradient(to right, ${config.accent}, #ff3645)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    return (
        <section 
            className="relative overflow-x-hidden py-24 px-4 md:px-8 min-h-screen flex flex-col justify-center transition-colors duration-500"
            style={{ background: config.bg }}
        >
            {/* Top Wavy Section Separator */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%] z-10 pointer-events-none">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[70px]" style={{ fill: config.waveColor }}>
                    <path d="M0,0 C150,90 350,20 500,60 C650,100 850,20 1000,50 C1150,80 1200,60 1200,120 L1200,120 L0,120 Z"></path>
                </svg>
            </div>

            {/* Background Grid Pattern (Only visible on dark backgrounds to avoid clutter on kids page) */}
            {!isKids && <div className="absolute inset-0 opacity-15 pointer-events-none grid-bg" aria-hidden="true" />}
            
            {/* Background Glow Spots */}
            <div className={`absolute top-20 left-10 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${isKids ? 'bg-purple-600/5' : 'bg-blue/10'}`} aria-hidden="true" />
            <div className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${isKids ? 'bg-pink-600/5' : 'bg-purple/5'}`} aria-hidden="true" />
            <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[120px] pointer-events-none ${isKids ? 'bg-purple-600/5' : 'bg-pink/10'}`} aria-hidden="true" />

            {/* Floating 3D Bouncing Spheres */}
            <div 
                className="absolute top-[15%] left-[6%] w-7 h-7 rounded-full pointer-events-none hidden md:block float-sphere shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.5)]" 
                style={{ 
                    background: 'radial-gradient(circle at 35% 35%, #a3e635, #16a34a)', 
                    filter: 'drop-shadow(0 8px 12px rgba(34, 197, 94, 0.35))',
                    animation: 'float-key 5s ease-in-out infinite'
                }} 
                aria-hidden="true"
            />
            <div 
                className="absolute top-[55%] left-[4%] w-9 h-9 rounded-full pointer-events-none hidden md:block float-sphere shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.5)]" 
                style={{ 
                    background: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7)', 
                    filter: 'drop-shadow(0 10px 15px rgba(56, 189, 248, 0.35))',
                    animation: 'float-key 6s ease-in-out infinite',
                    animationDelay: '1.2s'
                }} 
                aria-hidden="true"
            />
            <div 
                className="absolute bottom-[12%] right-[8%] w-11 h-11 rounded-full pointer-events-none hidden md:block float-sphere shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5)]" 
                style={{ 
                    background: 'radial-gradient(circle at 35% 35%, #f472b6, #db2777)', 
                    filter: 'drop-shadow(0 12px 18px rgba(244, 114, 182, 0.35))',
                    animation: 'float-key 7s ease-in-out infinite',
                    animationDelay: '2.5s'
                }} 
                aria-hidden="true"
            />

            {/* Wireframe Outline Triangles */}
            <div className="absolute top-[42%] left-[10%] w-8 h-8 pointer-events-none opacity-40 hidden lg:block" style={{ animation: 'float-key 6.5s ease-in-out infinite', animationDelay: '2.1s' }} aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-yellow stroke-[4.5]" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 198, 11, 0.4))' }}>
                    <polygon points="50,15 90,85 10,85" />
                </svg>
            </div>
            <div className="absolute bottom-[10%] left-[8%] w-10 h-10 pointer-events-none opacity-30 hidden lg:block" style={{ animation: 'float-key 5.8s ease-in-out infinite', animationDelay: '0.6s' }} aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-pink stroke-[4.5]" style={{ filter: 'drop-shadow(0 0 5px rgba(246, 126, 221, 0.4))' }}>
                    <polygon points="50,15 90,85 10,85" />
                </svg>
            </div>

            {/* Main Content Area - Expanded to Full Width */}
            <div className="max-w-[1550px] mx-auto relative z-10 w-full px-4 md:px-12 lg:px-16">
                
                {/* ─── Safety Section Header ─── */}
                <div className="text-center mb-16">
                    <h2 className="font-sans font-black text-center text-[clamp(2.25rem,4.5vw,3.25rem)] tracking-tight mb-4" style={{ color: config.textColor }}>
                        Your <span className="inline-block" style={gradientStyle}>Safety</span> Comes First
                        <span className="inline-block ml-3 text-cyan text-[clamp(1.5rem,3vw,2.5rem)] align-middle font-bold drop-shadow-[0_0_8px_#00b9e3] animate-pulse" aria-hidden="true" style={{ color: isKids ? '#7c3aed' : '#00b9e3' }}>//</span>
                    </h2>
                    <p className="font-sans text-center text-base md:text-lg max-w-[620px] mx-auto leading-relaxed" style={{ color: config.mutedColor }}>
                        Every zone is built with international safety standards and constantly monitored.
                    </p>
                </div>

                {/* ─── Safety Cards Grid + Cutout Characters ─── */}
                <div className="relative flex items-center justify-center w-full px-4 mb-28 xl:px-44 lg:px-20">
                    {/* Left Kid (Builder Emoji / Illustration) */}
                    <div className="absolute left-[-2%] xl:left-[2%] w-[130px] xl:w-[185px] hidden lg:block pointer-events-none float-boy z-20">
                        <img 
                            src="/characters/left_boy.png" 
                            alt="Safety character illustration left" 
                            className="w-full h-auto object-contain filter drop-shadow-[0_15px_22px_rgba(0,0,0,0.6)]" 
                        />
                    </div>

                    {/* Cards Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full relative z-10">
                        {SAFETY_ITEMS.map((item, i) => {
                            const Icon = item.Icon;
                            return (
                                <div 
                                    key={i} 
                                    className="group relative flex flex-col items-center text-center p-6 py-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2"
                                    style={{ 
                                        backgroundColor: config.cardBg,
                                        borderColor: config.cardBorder,
                                        boxShadow: isKids ? '0 10px 30px rgba(124, 58, 237, 0.05)' : '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    {/* Neon border hover overlay */}
                                    <div 
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{
                                            border: `1.5px solid ${item.color}`,
                                            boxShadow: `0 0 15px ${item.shadow}`,
                                        }}
                                    />

                                    {/* Icon Container */}
                                    <div 
                                        className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300"
                                        style={{
                                            border: `2px solid ${item.color}`,
                                            boxShadow: `0 0 12px ${item.shadow}, inset 0 0 8px ${item.shadow}`,
                                            background: `${item.color}0d`
                                        }}
                                    >
                                        <Icon className="transition-transform duration-300 group-hover:scale-110" style={{ color: item.color }} size={24} />
                                    </div>

                                    {/* Card Content - Dynamic Text Colors */}
                                    <h3 className="font-sans font-extrabold text-base md:text-[17px] mb-3 tracking-wide" style={{ color: config.textColor }}>
                                        {item.label}
                                    </h3>
                                    <p className="font-sans text-[13px] md:text-[14px] leading-relaxed font-semibold transition-colors duration-300 group-hover:text-opacity-100" style={{ color: isKids ? '#554fb7' : '#9ca3af' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Kid (Safety Cat / Illustration) */}
                    <div className="absolute right-[-2%] xl:right-[2%] w-[130px] xl:w-[185px] hidden lg:block pointer-events-none float-girl z-20">
                        <img 
                            src="/characters/right_girl.png" 
                            alt="Safety character illustration right" 
                            className="w-full h-auto object-contain filter drop-shadow-[0_15px_22px_rgba(0,0,0,0.6)]" 
                        />
                    </div>
                </div>

                {/* ─── FAQ Header ─── */}
                <div className="relative text-center mb-14">
                    <h2 className="font-sans font-black text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight inline-flex items-center gap-3" style={{ color: config.textColor }}>
                        {/* Left Slashes Decoration */}
                        <span className="hidden sm:inline-flex items-center gap-1 opacity-70" aria-hidden="true">
                            <span className="w-1 h-5 rounded-full transform -skew-x-12" style={{ backgroundColor: config.accent }} />
                            <span className="w-1 h-5 rounded-full transform -skew-x-12" style={{ backgroundColor: isKids ? '#db2777' : '#ffc60b' }} />
                            <span className="w-1 h-5 rounded-full transform -skew-x-12" style={{ backgroundColor: isKids ? '#2563eb' : '#6dc065' }} />
                        </span>

                        <span>Frequently Asked </span>
                        <span className="inline-block" style={gradientStyle}>
                            Questions
                        </span>

                        {/* Right Slashes Decoration */}
                        <span className="hidden sm:inline-flex items-center gap-1 opacity-70" aria-hidden="true">
                            <span className="w-1 h-5 rounded-full transform -skew-x-12" style={{ backgroundColor: isKids ? '#db2777' : '#f67edd' }} />
                            <span className="w-1 h-5 rounded-full transform -skew-x-12" style={{ backgroundColor: isKids ? '#2563eb' : '#00b9e3' }} />
                        </span>
                    </h2>
                </div>

                {/* ─── FAQ Grid Accordions ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1250px] mx-auto px-4 relative z-10">
                    {[col1, col2].map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-4">
                            {col.map((faq, i) => {
                                const globalIndex = colIdx === 0 ? i : i + mid;
                                const isOpenItem = openIndex === globalIndex;
                                
                                const { Icon, color, bg: iconBg } = getFAQIcon(faq.question);

                                return (
                                    <div 
                                        key={globalIndex} 
                                        className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                                            isOpenItem 
                                                ? 'border-transparent shadow-[0_10px_25px_rgba(255,102,26,0.15)]' 
                                                : 'hover:border-opacity-50'
                                        }`}
                                        style={{
                                            backgroundColor: config.cardBg,
                                            borderColor: isOpenItem ? config.accent : config.cardBorder,
                                            boxShadow: isOpenItem && isKids ? '0 10px 25px rgba(124, 58, 237, 0.12)' : undefined,
                                        }}
                                    >
                                        <button
                                            onClick={() => toggle(globalIndex)}
                                            className="w-full flex items-center justify-between p-5 py-6 text-left transition-colors duration-200 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Circular FAQ Icon Wrapper */}
                                                <div 
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                                                    style={{
                                                        background: iconBg,
                                                        borderColor: `${color}28`,
                                                    }}
                                                >
                                                    <Icon size={20} style={{ color }} />
                                                </div>
                                                
                                                {/* Question Text - Increased size */}
                                                <span className="font-sans font-extrabold text-[16px] md:text-[18px] tracking-wide select-none" style={{ color: config.textColor }}>
                                                    {faq.question}
                                                </span>
                                            </div>

                                            {/* Plus button rotating */}
                                            <div 
                                                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
                                                style={{
                                                    transform: isOpenItem ? 'rotate(45deg)' : 'rotate(0)',
                                                }}
                                            >
                                                <Plus size={22} style={{ color: config.accent }} />
                                            </div>
                                        </button>

                                        {/* Height animation with Framer Motion */}
                                        <AnimatePresence initial={false}>
                                            {isOpenItem && (
                                                <motion.div
                                                    initial="collapsed"
                                                    animate="open"
                                                    exit="collapsed"
                                                    variants={{
                                                        open: { opacity: 1, height: 'auto' },
                                                        collapsed: { opacity: 0, height: 0 }
                                                    }}
                                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                >
                                                    {/* Answer Text - Dynamic readability */}
                                                    <div className="px-5 pb-6 pt-1 border-t border-white/[0.03] ml-14">
                                                        <p className="font-sans text-[14px] md:text-[15px] leading-relaxed font-semibold" style={{ color: isKids ? '#4f46e5' : '#9ca3af' }}>
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Embedded Scoped CSS Styles for floating animations and patterns */}
            <style jsx>{`
                .grid-bg {
                    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
                    background-size: 24px 24px;
                }

                @keyframes float-key {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }

                @keyframes float-boy-anim {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-14px) rotate(2deg); }
                }

                @keyframes float-girl-anim {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-11px) rotate(-2deg); }
                }

                .float-boy {
                    animation: float-boy-anim 6s ease-in-out infinite;
                }

                .float-girl {
                    animation: float-girl-anim 7s ease-in-out infinite;
                }

                @media (max-width: 1024px) {
                    .float-boy, .float-girl {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
}
