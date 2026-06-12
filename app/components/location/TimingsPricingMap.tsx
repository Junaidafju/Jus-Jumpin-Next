'use client';

import { useState, useEffect } from 'react';
import { LocationData } from '@/types/location';

interface TimingsPricingMapProps {
    data: LocationData;
}

export default function TimingsPricingMap({ data }: TimingsPricingMapProps) {
    const isKids = data.type === 'kids';
    const bg = isKids ? '#f8f6ff' : '#0d1520';
    const cardBg = isKids ? '#fff' : '#152030';
    const textColor = isKids ? '#2d2d2d' : '#fff';
    const mutedColor = isKids ? '#666' : 'rgba(255,255,255,0.6)';
    const borderColor = isKids ? '#ede8f5' : 'rgba(255,255,255,0.08)';

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const day = time.getDay();
    const isWeekend = day === 0 || day === 6;
    const hours = isWeekend ? data.weekendHours : data.weekdayHours;
    const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    // Simple open check (assume open 11 AM – 9:30/10 PM)
    const h = time.getHours();
    const isOpen = h >= 11 && h < (isWeekend ? 22 : 21);

    return (
        <section id="booking" style={{ background: bg, padding: '80px 0 0', position: 'relative' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                <h2 style={{ fontFamily: 'Fredoka One, cursive', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: textColor, textAlign: 'center', margin: '0 0 48px' }}>
                    Timings, <span style={{ color: data.accentColor }}>Pricing</span> & Location
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
                    {/* ── Left: Clock + Hours ─── */}
                    <div style={{ background: cardBg, borderRadius: '20px', padding: '32px', border: `1px solid ${borderColor}` }}>
                        {/* Live Clock */}
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', color: data.accentColor, letterSpacing: '4px' }}>
                                {timeStr}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: isOpen ? '#6dc065' : '#ff3645', display: 'inline-block', animation: isOpen ? 'pulse 1.5s infinite' : 'none' }} />
                                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: isOpen ? '#6dc065' : '#ff3645', fontWeight: 700 }}>
                                    {isOpen ? 'Open Now' : 'Closed'}
                                </span>
                            </div>
                        </div>

                        {/* Hours Table */}
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ ...cellStyle, color: mutedColor }}>Monday – Friday</td>
                                    <td style={{ ...cellStyle, color: textColor, fontWeight: 700, textAlign: 'right' }}>{data.weekdayHours}</td>
                                </tr>
                                <tr>
                                    <td style={{ ...cellStyle, color: mutedColor }}>Saturday – Sunday</td>
                                    <td style={{ ...cellStyle, color: textColor, fontWeight: 700, textAlign: 'right' }}>{data.weekendHours}</td>
                                </tr>
                                <tr>
                                    <td style={{ ...cellStyle, color: mutedColor }}>Today</td>
                                    <td style={{ ...cellStyle, color: data.accentColor, fontWeight: 800, textAlign: 'right' }}>{hours}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ── Right: Pricing Table ─── */}
                    <div style={{ background: cardBg, borderRadius: '20px', padding: '32px', border: `1px solid ${borderColor}` }}>
                        <h3 style={{ fontFamily: 'Fredoka One, cursive', fontSize: '1.3rem', color: textColor, margin: '0 0 20px', textAlign: 'center' }}>
                            🎟️ Ticket Pricing
                        </h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ ...headerCellStyle, color: mutedColor }}>Type</th>
                                    <th style={{ ...headerCellStyle, color: '#4facfe' }}>Weekday</th>
                                    <th style={{ ...headerCellStyle, color: '#ff661a' }}>Weekend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.pricing.map((row, i) => (
                                    <tr key={i}>
                                        <td style={{ ...cellStyle, color: textColor, fontWeight: 600 }}>{row.label}</td>
                                        <td style={{ ...cellStyle, color: '#4facfe', fontWeight: 700, textAlign: 'center' }}>{row.weekday}</td>
                                        <td style={{ ...cellStyle, color: '#ff661a', fontWeight: 700, textAlign: 'center' }}>{row.weekend}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', color: mutedColor, textAlign: 'center', marginTop: '16px' }}>
                            {data.ticketNote}
                        </p>
                    </div>
                </div>

                {/* ── Address + Map ─── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
                    {/* Address Card */}
                    <div style={{ background: cardBg, borderRadius: '20px', padding: '32px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontFamily: 'Fredoka One, cursive', fontSize: '1.3rem', color: textColor, margin: '0 0 16px' }}>📍 Our Address</h3>
                        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1rem', color: mutedColor, lineHeight: 1.7, margin: '0 0 8px' }}>{data.address}</p>
                        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1rem', color: mutedColor, margin: '0 0 24px' }}>📞 {data.phone}</p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <a href={data.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', borderRadius: '999px', background: data.accentColor, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                                📍 Get Directions
                            </a>
                            <a href={data.reviewUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', borderRadius: '999px', background: isKids ? '#ffc60b' : '#4facfe', color: isKids ? '#1a1a1a' : '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                                ⭐ Review Us on Google
                            </a>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${borderColor}`, minHeight: '300px' }}>
                        <iframe
                            src={data.mapsEmbedUrl}
                            style={{ border: 0, width: '100%', height: '100%', minHeight: '300px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Jus Jumpin ${data.city} ${data.mall} location`}
                        />
                    </div>
                </div>
            </div>

            {/* Smooth Wave separator */}
            <div style={{ marginTop: '60px', lineHeight: 0 }}>
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
                    <path d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z" fill={isKids ? '#f0f5ff' : '#0a1218'} />
                </svg>
            </div>

            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}

const cellStyle: React.CSSProperties = {
    fontFamily: 'Nunito, sans-serif',
    fontSize: '14px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(128,128,128,0.15)',
};

const headerCellStyle: React.CSSProperties = {
    fontFamily: 'Nunito, sans-serif',
    fontSize: '12px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '0 0 12px',
    borderBottom: '2px solid rgba(128,128,128,0.2)',
    textAlign: 'center',
};
