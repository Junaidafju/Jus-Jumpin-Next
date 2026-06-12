'use client';

import { useState } from 'react';
import { FAQ } from '@/types/location';

interface SafetyFAQProps {
    faqs: FAQ[];
    accentColor: string;
    isKids: boolean;
}

const SAFETY_ITEMS = [
    { icon: '🛡️', label: 'Padded Surfaces', color: '#4facfe' },
    { icon: '👀', label: 'Trained Supervisors', color: '#6dc065' },
    { icon: '🧼', label: 'Regular Sanitisation', color: '#ffc60b' },
    { icon: '📹', label: 'CCTV Monitoring', color: '#ff661a' },
    { icon: '🚪', label: 'Controlled Entry/Exit', color: '#f67edd' },
    { icon: '🩺', label: 'First Aid Ready', color: '#ff3645' },
];

export default function SafetyFAQ({ faqs, accentColor, isKids }: SafetyFAQProps) {
    const bg = isKids ? '#f0f5ff' : '#0a1218';
    const cardBg = isKids ? '#fff' : '#152030';
    const textColor = isKids ? '#2d2d2d' : '#fff';
    const mutedColor = isKids ? '#666' : 'rgba(255,255,255,0.6)';
    const borderColor = isKids ? '#e8eef8' : 'rgba(255,255,255,0.08)';

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    // Split FAQs into 2 columns
    const mid = Math.ceil(faqs.length / 2);
    const col1 = faqs.slice(0, mid);
    const col2 = faqs.slice(mid);

    return (
        <section style={{ background: bg, padding: '80px 0 80px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                {/* ── Safety Section ─── */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontFamily: 'Fredoka One, cursive', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: textColor, margin: '0 0 12px' }}>
                        Your <span style={{ color: accentColor }}>Safety</span> Comes First
                    </h2>
                    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1rem', color: mutedColor, maxWidth: '550px', margin: '0 auto' }}>
                        Every zone is built with international safety standards and constantly monitored.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '64px' }}>
                    {SAFETY_ITEMS.map((item, i) => (
                        <div key={i} style={{ background: cardBg, borderRadius: '20px', padding: '28px 16px', textAlign: 'center', border: `1px solid ${borderColor}`, transition: 'transform 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.8rem' }}>
                                {item.icon}
                            </div>
                            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 700, color: textColor }}>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── FAQ Section ─── */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <h2 style={{ fontFamily: 'Fredoka One, cursive', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: textColor, margin: 0 }}>
                        Frequently Asked <span style={{ color: accentColor }}>Questions</span>
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {[col1, col2].map((col, colIdx) => (
                        <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {col.map((faq, i) => {
                                const globalIndex = colIdx === 0 ? i : i + mid;
                                const isOpenItem = openIndex === globalIndex;
                                return (
                                    <div key={globalIndex} style={{ background: cardBg, borderRadius: '16px', border: `1px solid ${isOpenItem ? accentColor : borderColor}`, overflow: 'hidden', transition: 'border-color 0.3s' }}>
                                        <button
                                            onClick={() => toggle(globalIndex)}
                                            style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}
                                        >
                                            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 700, color: textColor, textAlign: 'left' }}>{faq.question}</span>
                                            <span style={{ fontSize: '18px', color: accentColor, transition: 'transform 0.3s', transform: isOpenItem ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                                        </button>
                                        <div style={{ maxHeight: isOpenItem ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                                            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: mutedColor, lineHeight: 1.7, padding: '0 20px 18px', margin: 0 }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
