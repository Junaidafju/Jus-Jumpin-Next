'use client';

import { useState, useEffect } from 'react';
import { LocationData } from '@/types/location';

interface TimingsPricingMapProps {
    data: LocationData;
}

/* ─── SVG Icon Components ─── */
const ClockIcon = ({ color = '#a855f7' }: { color?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
        <path d="M12 6v6l4 2" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TicketIcon = ({ color = '#f97316' }: { color?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10C3.10457 10 4 10.8954 4 12C4 13.1046 3.10457 14 2 14V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V14C20.8954 14 20 13.1046 20 12C20 10.8954 20.8954 10 22 10Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4V20" stroke={color} strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
    </svg>
);

const LocationIcon = ({ color = '#84cc16' }: { color?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="3" stroke={color} strokeWidth="2.5" />
    </svg>
);

const PhoneIcon = ({ color = '#84cc16' }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SocksIcon = ({ color = '#84cc16' }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 4h6v4c0 1.66-1.34 3-3 3s-3-1.34-3-3V4Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8v9a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V11h-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StarIcon = ({ color = '#facc15', size = 16, fill = 'none' }: { color?: string; size?: number; fill?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CalendarIcon = ({ color = '#a78bfa' }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const NavigationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─── Floating Background Decorations ─── */
const FloatingDecorations = () => (
    <div className="floating-deco" aria-hidden="true">
        {/* Bouncing colorful balls */}
        <div className="deco-ball ball-1" />
        <div className="deco-ball ball-2" />
        <div className="deco-ball ball-3" />
        <div className="deco-ball ball-4" />

        {/* Energy Lines / Lightning vector */}
        <div className="deco-lightning">
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
                <path d="M70 0L20 80h40L40 160l70-90H70L70 0z" fill="url(#lightningGrad)" opacity="0.12" />
                <defs>
                    <linearGradient id="lightningGrad" x1="0" y1="0" x2="120" y2="160">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#84cc16" />
                    </linearGradient>
                </defs>
            </svg>
        </div>

        {/* Small floating stars */}
        <div className="deco-star star-1"><StarIcon size={14} color="#facc15" fill="#facc15" /></div>
        <div className="deco-star star-2"><StarIcon size={10} color="#c084fc" fill="#c084fc" /></div>
        <div className="deco-star star-3"><StarIcon size={12} color="#fb923c" fill="#fb923c" /></div>
        <div className="deco-star star-4"><StarIcon size={8} color="#a3e635" fill="#a3e635" /></div>

        {/* Decorative Grid Patterns (Halftones) */}
        <div className="deco-grid grid-left" />
        <div className="deco-grid grid-right" />
    </div>
);

export default function TimingsPricingMap({ data }: TimingsPricingMapProps) {
    const isKids = data.type === 'kids';

    // Theme values configuration
    const config = {
        bg: isKids
            ? 'linear-gradient(135deg, #f5f0ff 0%, #e8e2f7 50%, #fcfaff 100%)'
            : 'linear-gradient(135deg, #090514 0%, #0d0926 50%, #04020b 100%)',
        cardBg: isKids ? 'rgba(255, 255, 255, 0.85)' : 'rgba(20, 14, 43, 0.85)',
        cardBorder: isKids ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255, 255, 255, 0.08)',
        textColor: isKids ? '#1e1b4b' : '#ffffff',
        mutedColor: isKids ? '#4f46e5' : 'rgba(255, 255, 255, 0.6)',
        accent: data.accentColor || '#84cc16',
        orange: '#f97316',
        pink: '#d946ef',
        green: '#84cc16',
        purple: '#a855f7',
    };

    const [time, setTime] = useState<Date | null>(null);
    useEffect(() => {
        setTime(new Date());
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const isWeekend = time ? (time.getDay() === 0 || time.getDay() === 6) : false;
    const hours = isWeekend ? data.weekendHours : data.weekdayHours;
    const timeStr = time
        ? time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
        : '--:--:--';

    // Parse digits and AM/PM
    const [clockDigits, clockMeridiem] = timeStr.includes(' ')
        ? timeStr.split(' ')
        : [timeStr, ''];

    // Open status check (11 AM to 9:30/10 PM)
    const h = time ? time.getHours() : 0;
    const isOpen = time ? (h >= 11 && h < (isWeekend ? 22 : 21.5)) : false;

    const statusColor = time ? (isOpen ? config.green : '#ef4444') : '#888888';
    const statusText = time ? (isOpen ? 'Open Now' : 'Closed') : 'Loading...';
    const hasPulse = time ? isOpen : false;

    return (
        <section id="booking" className={`tp-section ${isKids ? 'kids-theme' : 'dark-theme'}`}>
            {/* Rich atmospheric glows */}
            <div className="section-bg-glows" aria-hidden="true">
                <div className="bg-glow bg-glow-1" />
                <div className="bg-glow bg-glow-2" />
                <div className="bg-glow bg-glow-3" />
                <div className="bg-vignette" />
            </div>

            {/* Character Decorations and Vectors */}
            <FloatingDecorations />
            <div className="characters-container" aria-hidden="true">
                <img
                    src="/image/birthday/birthday-boy.png"
                    className="deco-character char-left"
                    alt=""
                />
                <img
                    src="/image/birthday/party-girl.png"
                    className="deco-character char-right"
                    alt=""
                />
            </div>

            <div className="tp-container">
                {/* Custom Heading Design matching image */}
                <div className="tp-heading-wrap">
                    <h2 className="tp-heading">
                        <span className="text-white">Timings, </span>
                        <span className="text-gradient-orange">Pricing</span>
                        <span className="text-green-amp"> & </span>
                        <span className="text-white">Location</span>
                    </h2>
                    <div className="heading-underline">
                        <div className="underline-dot" />
                        <div className="underline-line" />
                        <div className="underline-dot" />
                    </div>
                </div>

                <div className="tp-cards-grid">
                    {/* ─── Card 1: Park Timings ─── */}
                    <div className="tp-card card-timings">
                        <div className="card-header">
                            <div className="icon-circle" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
                                <ClockIcon color="#c084fc" />
                            </div>
                            <h3 className="card-title">Park Timings</h3>
                        </div>

                        <div className="clock-display">
                            <div className="clock-time">
                                {clockDigits}
                                <span className="clock-ampm"> {clockMeridiem?.toUpperCase()}</span>
                            </div>
                            <div className="status-badge" style={{ background: `linear-gradient(135deg, ${statusColor} 0%, rgba(20,14,43,0.1) 180%)`, border: `0px solid ${statusColor}44` }}>
                                <span className={`status-dot ${hasPulse ? 'pulse' : ''}`} style={{ background: statusColor }} />
                                <span className="status-text" style={{ color: statusColor }}>{statusText}</span>
                            </div>
                        </div>

                        <div className="hours-list">
                            <div className="hours-row">
                                <div className="hours-label">
                                    <CalendarIcon color={config.mutedColor} />
                                    <span>Monday – Friday</span>
                                </div>
                                <span className="hours-value">{data.weekdayHours}</span>
                            </div>
                            <div className="hours-row">
                                <div className="hours-label">
                                    <CalendarIcon color={config.mutedColor} />
                                    <span>Saturday – Sunday</span>
                                </div>
                                <span className="hours-value">{data.weekendHours}</span>
                            </div>
                            <div className="hours-row hours-row-today" style={{ borderColor: `${config.green}33` }}>
                                <div className="hours-label">
                                    <CalendarIcon color={config.green} />
                                    <span style={{ color: config.green, fontWeight: 700 }}>Today</span>
                                </div>
                                <span className="hours-value" style={{ color: config.green, fontWeight: 800 }}>{hours}</span>
                            </div>
                        </div>
                    </div>

                    {/* ─── Card 2: Ticket Pricing ─── */}
                    <div className="tp-card card-pricing">
                        <div className="card-header">
                            <div className="icon-circle" style={{ background: 'rgba(249, 115, 22, 0.15)' }}>
                                <TicketIcon color="#fb923c" />
                            </div>
                            <h3 className="card-title">Ticket Pricing</h3>
                            <div className="pricing-stars">
                                <StarIcon size={14} color="#facc15" fill="#facc15" />
                                <StarIcon size={14} color="#facc15" fill="#facc15" />
                                <StarIcon size={14} color="#facc15" fill="none" />
                            </div>
                        </div>

                        <div className="pricing-table-wrapper">
                            <table className="pricing-table">
                                <thead>
                                    <tr>
                                        <th className="pt-header pt-type">Type</th>
                                        <th className="pt-header pt-weekday" style={{ color: config.green }}>Weekday</th>
                                        <th className="pt-header pt-weekend" style={{ color: config.orange }}>Weekend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.pricing.map((row, i) => (
                                        <tr key={i} className="pt-row">
                                            <td className="pt-cell pt-type">{row.label}</td>
                                            <td className="pt-cell pt-weekday" style={{ color: config.green }}>{row.weekday}</td>
                                            <td className="pt-cell pt-weekend" style={{ color: config.orange }}>{row.weekend}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="socks-note" style={{ borderColor: `${config.mutedColor}22` }}>
                            <div className="socks-icon-wrap" style={{ background: `${config.green}15` }}>
                                <SocksIcon color={config.green} />
                            </div>
                            <span>{data.ticketNote || 'Anti-Skid Grip Socks at ₹60 (One-time Purchase. Compulsory for your safety.)'}</span>
                        </div>

                        <a
                            href="https://jusjumpin.co.in/customer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-book"
                        >
                            <TicketIcon color="#fff" />
                            <span>Book Tickets Online</span>
                            <ArrowRightIcon />
                        </a>
                    </div>

                    {/* ─── Card 3: Our Address ─── */}
                    <div className="tp-card card-address">
                        <div className="card-header">
                            <div className="icon-circle" style={{ background: 'rgba(132, 204, 22, 0.15)' }}>
                                <LocationIcon color={config.green} />
                            </div>
                            <h3 className="card-title">Our Address</h3>
                        </div>

                        <div className="address-content">
                            <p className="address-text">{data.address}</p>
                            <div className="phone-row" style={{ color: config.mutedColor }}>
                                <PhoneIcon color={config.green} />
                                <span>{data.phone}</span>
                            </div>
                        </div>

                        <div className="address-actions">
                            <a
                                href={data.mapsDirectionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-directions"
                            >
                                <NavigationIcon />
                                <span>Get Directions</span>
                            </a>
                            <a
                                href={data.reviewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-review"
                            >
                                <StarIcon size={16} color="currentColor" fill="none" />
                                <span>Review Us on Google</span>
                            </a>
                        </div>
                    </div>

                    {/* ─── Card 4: Find Us on Map ─── */}
                    <div className="tp-card card-map">
                        <div className="map-header">
                            <div className="icon-circle" style={{ background: 'rgba(132, 204, 22, 0.15)' }}>
                                <LocationIcon color={config.green} />
                            </div>
                            <h3 className="card-title">Find Us on Map</h3>
                        </div>
                        <div className="map-container">
                            <iframe
                                src={data.mapsEmbedUrl}
                                className="map-iframe"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Jus Jumpin ${data.city} ${data.mall} location`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Smooth Wave separator */}
            <div className="wave-separator">
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="wave-svg">
                    <path
                        d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
                        fill={isKids ? '#f0f5ff' : '#0a1218'}
                    />
                </svg>
            </div>

            <style jsx>{`
                /* ─── Base Styles ─── */
                .tp-section {
                    position: relative;
                    width: 100%;
                    padding: 100px 0 0;
                    overflow: hidden;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .dark-theme {
                    background: ${config.bg};
                    color: ${config.textColor};
                }

                .kids-theme {
                    background: ${config.bg};
                    color: ${config.textColor};
                }

                /* ─── Atmospheric Backgrounds ─── */
                .section-bg-glows {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .bg-glow {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(140px);
                    opacity: 0.35;
                }

                .dark-theme .bg-glow-1 {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, #6d28d9 0%, transparent 70%);
                    top: -10%;
                    left: -5%;
                }

                .dark-theme .bg-glow-2 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, #1d4ed8 0%, transparent 70%);
                    top: 30%;
                    right: -10%;
                }

                .dark-theme .bg-glow-3 {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, #065f46 0%, transparent 70%);
                    bottom: 10%;
                    left: 30%;
                }

                .kids-theme .bg-glow-1 {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, #e0d5ff 0%, transparent 75%);
                    top: -10%;
                    left: -5%;
                    opacity: 0.5;
                }

                .kids-theme .bg-glow-2 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, #bae6fd 0%, transparent 75%);
                    top: 30%;
                    right: -10%;
                    opacity: 0.5;
                }

                .kids-theme .bg-glow-3 {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, #dcfce7 0%, transparent 75%);
                    bottom: 10%;
                    left: 30%;
                    opacity: 0.5;
                }

                .bg-vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, ${isKids ? '0.05' : '0.45'}) 100%);
                }

                /* ─── Floating Animations ─── */
                .floating-deco {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 1;
                    overflow: hidden;
                }

                .deco-ball {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.35;
                    animation: float-ball 6s ease-in-out infinite;
                }

                .ball-1 {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, ${config.pink}, ${config.orange});
                    top: 15%;
                    left: 6%;
                    animation-delay: 0s;
                }

                .ball-2 {
                    width: 30px;
                    height: 30px;
                    background: linear-gradient(135deg, #06b6d4, #3b82f6);
                    top: 45%;
                    right: 8%;
                    animation-delay: 1.5s;
                }

                .ball-3 {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #eab308, ${config.orange});
                    bottom: 25%;
                    left: 5%;
                    animation-delay: 3s;
                }

                .ball-4 {
                    width: 25px;
                    height: 25px;
                    background: linear-gradient(135deg, ${config.green}, #059669);
                    top: 60%;
                    right: 12%;
                    animation-delay: 4.5s;
                }

                .deco-lightning {
                    position: absolute;
                    top: 25%;
                    right: 4%;
                    animation: pulse-glow 4s ease-in-out infinite;
                }

                .deco-star {
                    position: absolute;
                    animation: twinkle 3s ease-in-out infinite;
                }

                .star-1 { top: 12%; left: 22%; animation-delay: 0s; }
                .star-2 { top: 38%; right: 28%; animation-delay: 0.8s; }
                .star-3 { bottom: 32%; left: 26%; animation-delay: 1.6s; }
                .star-4 { top: 68%; right: 18%; animation-delay: 2.4s; }

                .deco-grid {
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    opacity: ${isKids ? '0.07' : '0.15'};
                    background-image: radial-gradient(circle, currentColor 2px, transparent 2px);
                    background-size: 14px 14px;
                    pointer-events: none;
                }

                .grid-left {
                    top: 10%;
                    left: 2%;
                    color: ${config.purple};
                }

                .grid-right {
                    bottom: 20%;
                    right: 2%;
                    color: ${config.orange};
                }

                /* ─── Absolute Characters Decor ─── */
                .characters-container {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 1;
                    overflow: hidden;
                }

                .deco-character {
                    position: absolute;
                    width: 220px;
                    height: auto;
                    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3));
                    animation: jump-float 5s ease-in-out infinite;
                }

                .char-left {
                    top: 18%;
                    left: 1%;
                    transform: rotate(10deg);
                    animation-delay: 0.5s;
                }

                .char-right {
                    top: 14%;
                    right: 1%;
                    transform: rotate(-10deg);
                    animation-delay: 2s;
                }

                /* ─── Content Wrapper ─── */
                .tp-container {
                    position: relative;
                    z-index: 2;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* ─── Heading ─── */
                .tp-heading-wrap {
                    text-align: center;
                    margin-bottom: 56px;
                }

                .tp-heading {
                    font-family: 'Fredoka One', 'Baloo 2', cursive, sans-serif;
                    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
                    font-weight: 700;
                    letter-spacing: -0.5px;
                    line-height: 1.2;
                    margin: 0;
                }

                .dark-theme .text-white {
                    color: #ffffff;
                }

                .kids-theme .text-white {
                    color: #1e1b4b;
                }

                .text-gradient-orange {
                    background: linear-gradient(135deg, #ff8f3d 0%, #f97316 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(249, 115, 22, 0.35);
                }

                .text-green-amp {
                    color: ${config.green};
                    font-weight: 800;
                    text-shadow: 0 0 30px rgba(132, 204, 22, 0.35);
                }

                .heading-underline {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 18px;
                }

                .underline-line {
                    width: 70px;
                    height: 4px;
                    background: linear-gradient(90deg, transparent, ${config.orange}, transparent);
                    border-radius: 4px;
                }

                .underline-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: ${config.orange};
                    box-shadow: 0 0 12px ${config.orange}88;
                }

                /* ─── Layout Cards Grid ─── */
                .tp-cards-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                    margin-bottom: 48px;
                }

                /* ─── Premium Glass Card ─── */
                .tp-card {
                    background: ${config.cardBg};
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 0px solid ${config.cardBorder};
                    border-radius: 28px;
                    padding: 36px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, ${isKids ? '0.08' : '0.35'}), 
                                inset 0 1px 1px rgba(255, 255, 255, ${isKids ? '0.3' : '0.08'});
                    transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), 
                                box-shadow 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), 
                                border-color 0.35s ease;
                    position: relative;
                    overflow: hidden;
                }

                .tp-card:hover {
                    transform: translateY(-6px);
                    border-color: ${isKids ? 'rgba(124, 58, 237, 0.35)' : 'rgba(255, 255, 255, 0.18)'};
                    box-shadow: 0 25px 50px rgba(0, 0, 0, ${isKids ? '0.12' : '0.5'}), 
                                0 0 35px ${isKids ? 'rgba(124, 58, 237, 0.08)' : 'rgba(168, 85, 247, 0.08)'},
                                inset 0 1px 1px rgba(255, 255, 255, ${isKids ? '0.5' : '0.15'});
                }

                /* Faded Image Background implementation per card */
                .card-timings {
                    background-image: ${isKids
                    ? `linear-gradient(90deg, rgba(255, 255, 255, 0.98) 45%, rgba(255, 255, 255, 0.78) 75%, rgba(255, 255, 255, 0.2) 100%), url('/image/foam-pit.jpg')`
                    : `linear-gradient(90deg, rgba(20, 14, 43, 0.98) 45%, rgba(20, 14, 43, 0.8) 75%, rgba(20, 14, 43, 0.2) 100%), url('/image/foam-pit.jpg')`};
                    background-size: cover;
                    background-position: right center;
                    background-repeat: no-repeat;
                }

                .card-pricing {
                    background-image: ${isKids
                    ? `linear-gradient(90deg, rgba(255, 255, 255, 0.98) 45%, rgba(255, 255, 255, 0.78) 75%, rgba(255, 255, 255, 0.2) 100%), url('/image/bouncy-castle.jpg')`
                    : `linear-gradient(90deg, rgba(20, 14, 43, 0.98) 45%, rgba(20, 14, 43, 0.8) 75%, rgba(20, 14, 43, 0.2) 100%), url('/image/bouncy-castle.jpg')`};
                    background-size: cover;
                    background-position: right center;
                    background-repeat: no-repeat;
                }

                .card-address {
                    background-image: ${isKids
                    ? `linear-gradient(90deg, rgba(255, 255, 255, 0.98) 45%, rgba(255, 255, 255, 0.78) 75%, rgba(255, 255, 255, 0.2) 100%), url('/image/family-jumping.jpg')`
                    : `linear-gradient(90deg, rgba(20, 14, 43, 0.98) 45%, rgba(20, 14, 43, 0.8) 75%, rgba(20, 14, 43, 0.2) 100%), url('/image/family-jumping.jpg')`};
                    background-size: cover;
                    background-position: right center;
                    background-repeat: no-repeat;
                }

                .card-map {
                    background-image: ${isKids
                    ? `linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)`
                    : `linear-gradient(180deg, rgba(20, 14, 43, 0.98) 0%, rgba(20, 14, 43, 0.9) 100%)`};
                    padding: 0; /* clean fit for map container */
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                /* ─── Card Header ─── */
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                }

                .dark-theme .icon-circle {
                    width: 46px;
                    height: 46px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                }

                .kids-theme .icon-circle {
                    width: 46px;
                    height: 46px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .card-title {
                    font-family: 'Fredoka One', 'Baloo 2', cursive, sans-serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .dark-theme .card-title {
                    color: #ffffff;
                }

                .kids-theme .card-title {
                    color: #1e1b4b;
                }

                /* ─── Clock Module ─── */
                .clock-display {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .clock-time {
                    font-family: 'Bebas Neue', 'Oswald', sans-serif;
                    font-size: clamp(2.8rem, 5vw, 4.4rem);
                    font-weight: 600;
                    letter-spacing: 3px;
                    line-height: 1;
                    font-variant-numeric: tabular-nums;
                    text-shadow: 0 0 35px rgba(168, 85, 247, 0.4);
                }

                .dark-theme .clock-time {
                    color: #ffffff;
                }

                .kids-theme .clock-time {
                    color: #4f46e5;
                }

                .clock-ampm {
                    font-size: 0.45em;
                    color: ${config.mutedColor};
                    letter-spacing: 1px;
                    margin-left: 8px;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 18px;
                    border-radius: 99px;
                    margin-top: 14px;
                    font-family: 'Nunito', 'Inter', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    backdrop-filter: blur(4px);
                }

                .status-dot {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                }

                .status-dot.pulse {
                    animation: blink-dot 1.8s ease-in-out infinite;
                }

                .status-text {
                    font-weight: 800;
                }

                /* ─── Timings Table List ─── */
                .hours-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0px;
                }

                .hours-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 0;
                    border-bottom: 1px solid ${isKids ? 'rgba(124,58,237,0.08)' : 'rgba(255, 255, 255, 0.05)'};
                }

                .hours-row:last-child {
                    border-bottom: none;
                }

                .hours-row-today {
                    background: ${isKids ? 'rgba(132, 204, 22, 0.08)' : 'rgba(132, 204, 22, 0.04)'};
                    margin: 4px -20px 0;
                    padding: 16px 20px;
                    border-radius: 16px;
                    border: 1px solid transparent;
                }

                .hours-label {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: ${config.textColor};
                    opacity: 0.85;
                }

                .hours-value {
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.95rem;
                    color: ${config.textColor};
                    font-weight: 700;
                }

                /* ─── Ticket Pricing Card ─── */
                .pricing-stars {
                    margin-left: auto;
                    display: flex;
                    gap: 6px;
                }

                .pricing-table-wrapper {
                    margin-bottom: 24px;
                }

                .pricing-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .pt-header {
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    padding: 0 0 14px;
                    border-bottom: 2px solid ${isKids ? 'rgba(124,58,237,0.12)' : 'rgba(255, 255, 255, 0.1)'};
                    text-align: center;
                }

                .pt-header.pt-type {
                    text-align: left;
                    color: ${config.mutedColor};
                }

                .pt-row {
                    transition: background 0.2s ease;
                }

                .pt-row:hover {
                    background: ${isKids ? 'rgba(124,58,237,0.03)' : 'rgba(255, 255, 255, 0.02)'};
                }

                .pt-cell {
                    font-family: 'Nunito', sans-serif;
                    font-size: 1.05rem;
                    padding: 16px 0;
                    border-bottom: 1px solid ${isKids ? 'rgba(124,58,237,0.06)' : 'rgba(255, 255, 255, 0.05)'};
                }

                .pt-cell.pt-type {
                    color: ${config.textColor};
                    font-weight: 700;
                }

                .pt-cell.pt-weekday,
                .pt-cell.pt-weekend {
                    text-align: center;
                    font-weight: 800;
                    font-size: 1.15rem;
                }

                .socks-note {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 0;
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: ${config.mutedColor};
                    border-top: 1px solid ${isKids ? 'rgba(124,58,237,0.08)' : 'rgba(255, 255, 255, 0.06)'};
                    margin-bottom: 28px;
                }

                .socks-icon-wrap {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                /* ─── Online Booking button ─── */
                .btn-book {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    width: 100%;
                    padding: 16px 32px;
                    border-radius: 18px;
                    background: linear-gradient(135deg, ${config.pink} 0%, ${config.orange} 100%);
                    color: #ffffff;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 800;
                    font-size: 0.95rem;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 10px 25px rgba(236, 72, 153, 0.35);
                    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
                    border: none;
                    cursor: pointer;
                }

                .btn-book:hover {
                    transform: scale(1.02) translateY(-2px);
                    box-shadow: 0 15px 35px rgba(236, 72, 153, 0.5);
                    filter: brightness(1.08);
                }

                .btn-book:hover svg:last-child {
                    transform: translateX(4px);
                }

                .btn-book svg:last-child {
                    transition: transform 0.2s ease;
                }

                /* ─── Address Card ─── */
                .address-content {
                    margin-bottom: 32px;
                }

                .address-text {
                    font-family: 'Nunito', sans-serif;
                    font-size: 1.1rem;
                    color: ${config.textColor};
                    line-height: 1.7;
                    margin: 0 0 20px;
                    font-weight: 600;
                    opacity: 0.95;
                }

                .phone-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Nunito', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 700;
                }

                .address-actions {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }

                .btn-directions {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    border-radius: 16px;
                    background: ${config.green};
                    color: #0c0920;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 800;
                    font-size: 0.9rem;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 6px 18px rgba(132, 204, 22, 0.35);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    border: none;
                    cursor: pointer;
                }

                .btn-directions:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 22px rgba(132, 204, 22, 0.5);
                }

                .btn-review {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    border-radius: 16px;
                    background: transparent;
                    color: ${config.textColor};
                    font-family: 'Nunito', sans-serif;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1.5px solid ${isKids ? 'rgba(30,27,75,0.25)' : 'rgba(255, 255, 255, 0.25)'};
                    backdrop-filter: blur(10px);
                    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
                    cursor: pointer;
                }

                .btn-review:hover {
                    transform: translateY(-2px);
                    border-color: ${isKids ? '#1e1b4b' : '#ffffff'};
                    background: ${isKids ? 'rgba(30,27,75,0.05)' : 'rgba(255, 255, 255, 0.05)'};
                }

                /* ─── Map Card ─── */
                .map-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 36px 36px 20px;
                }

                .map-container {
                    flex: 1;
                    min-height: 320px;
                    position: relative;
                    border-radius: 0 0 26px 26px;
                    overflow: hidden;
                    margin: 0;
                    border-top: 1px solid ${config.cardBorder};
                }

                .map-iframe {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    filter: saturate(0.85) contrast(1.05) ${isKids ? 'none' : 'invert(0.9) hue-rotate(180deg)'};
                }

                /* ─── Wave Separator ─── */
                .wave-separator {
                    margin-top: 80px;
                    line-height: 0;
                    position: relative;
                    z-index: 2;
                }

                .wave-svg {
                    width: 100%;
                    height: 75px;
                    display: block;
                }

                /* ─── Keyframe Animations ─── */
                @keyframes float-ball {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(15deg); }
                }

                @keyframes jump-float {
                    0%, 100% { transform: translateY(0px) scale(1) rotate(var(--rot, 0deg)); }
                    50% { transform: translateY(-15px) scale(1.03) rotate(calc(var(--rot, 0deg) + 2deg)); }
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1.15); }
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.12; transform: scale(1); }
                    50% { opacity: 0.22; transform: scale(1.05); }
                }

                @keyframes blink-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.8); }
                }

                /* Set individual child tilts */
                .char-left {
                    --rot: 10deg;
                }
                .char-right {
                    --rot: -10deg;
                }

                /* ─── Responsive Media Queries ─── */
                @media (max-width: 1200px) {
                    .tp-container {
                        padding: 0 20px;
                    }

                    .deco-character {
                        width: 160px;
                    }

                    .char-left {
                        top: 25%;
                        left: -2%;
                    }

                    .char-right {
                        top: 22%;
                        right: -2%;
                    }
                }

                @media (max-width: 1024px) {
                    .tp-section {
                        padding: 80px 0 0;
                    }

                    .tp-cards-grid {
                        gap: 24px;
                    }

                    .tp-card {
                        padding: 28px;
                    }

                    .map-header {
                        padding: 28px 28px 16px;
                    }
                }

                @media (max-width: 860px) {
                    /* Hide character decoration assets on smaller viewports to prevent covering layout */
                    .deco-character {
                        display: none;
                    }

                    .tp-cards-grid {
                        grid-template-columns: 1fr;
                        max-width: 600px;
                        margin: 0 auto 48px;
                    }

                    .card-timings, .card-pricing, .card-address {
                        background-position: center right;
                    }
                }

                @media (max-width: 640px) {
                    .tp-section {
                        padding: 60px 0 0;
                    }

                    .tp-heading-wrap {
                        margin-bottom: 40px;
                    }

                    .tp-card {
                        padding: 24px;
                        border-radius: 24px;
                    }

                    .map-header {
                        padding: 24px 24px 16px;
                    }

                    .clock-time {
                        font-size: 2.8rem;
                    }

                    .pt-cell {
                        font-size: 0.95rem;
                        padding: 12px 0;
                    }

                    .pt-cell.pt-weekday,
                    .pt-cell.pt-weekend {
                        font-size: 1.05rem;
                    }

                    .address-actions {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .btn-directions,
                    .btn-review {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .tp-card {
                        padding: 20px;
                        border-radius: 20px;
                    }

                    .map-header {
                        padding: 20px 20px 14px;
                    }

                    .hours-row-today {
                        margin: 4px -16px 0;
                        padding: 14px 16px;
                    }

                    .socks-note {
                        font-size: 0.8rem;
                    }

                    .address-text {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
}
