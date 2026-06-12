'use client';

import { Activity, LocationType } from '@/types/location';

interface ActivitiesSectionProps {
    activities: Activity[];
    type: LocationType;
    accentColor: string;
}

export default function ActivitiesSection({ activities, type, accentColor }: ActivitiesSectionProps) {
    const isKids = type === 'kids';
    const bg = isKids ? '#fef9f0' : '#111820';
    const cardBg = isKids ? '#fff' : '#1a2d3f';
    const textColor = isKids ? '#2d2d2d' : '#fff';
    const mutedColor = isKids ? '#666' : 'rgba(255,255,255,0.65)';
    const badgeText = isKids ? '🧒 Kids Activities' : '👨‍👩‍👧 Adults + Kids Activities';

    return (
        <section id="activities" style={{ background: bg, padding: '80px 0 0', position: 'relative' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <span style={{ display: 'inline-block', background: accentColor, color: '#fff', padding: '8px 24px', borderRadius: '999px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                        {badgeText}
                    </span>
                    <h2 style={{ fontFamily: 'Fredoka One, cursive', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: textColor, margin: '0 0 12px' }}>
                        Our <span style={{ color: accentColor }}>Activities</span>
                    </h2>
                    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1rem', color: mutedColor, maxWidth: '550px', margin: '0 auto' }}>
                        Discover all the amazing zones waiting for you at this venue.
                    </p>
                </div>

                {/* Activity Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {activities.map((activity, i) => (
                        <div
                            key={i}
                            className="activity-card"
                            style={{
                                background: cardBg,
                                borderRadius: '20px',
                                padding: '32px 24px',
                                transition: 'all 0.35s ease',
                                cursor: 'default',
                                border: `2px solid transparent`,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = activity.color;
                                e.currentTarget.style.borderColor = activity.color;
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${activity.color}44`;
                                const texts = e.currentTarget.querySelectorAll('.card-text');
                                texts.forEach((t) => ((t as HTMLElement).style.color = '#fff'));
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = cardBg;
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                const texts = e.currentTarget.querySelectorAll('.card-text');
                                texts.forEach((t, idx) => {
                                    (t as HTMLElement).style.color = idx === 0 ? textColor : idx === 1 ? textColor : mutedColor;
                                });
                            }}
                        >
                            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '16px' }}>{activity.emoji}</span>
                            <h3 className="card-text" style={{ fontFamily: 'Fredoka One, cursive', fontSize: '1.2rem', color: textColor, margin: '0 0 8px', transition: 'color 0.3s' }}>{activity.name}</h3>
                            <p className="card-text" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.9rem', color: mutedColor, lineHeight: 1.6, margin: '0 0 12px', transition: 'color 0.3s' }}>{activity.description}</p>
                            <span className="card-text" style={{ display: 'inline-block', background: `${activity.color}22`, color: activity.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontFamily: 'Nunito, sans-serif', fontWeight: 700, transition: 'color 0.3s' }}>
                                {activity.ageGroup}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Zigzag separator */}
            <div style={{ marginTop: '60px', lineHeight: 0 }}>
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
                    <polygon points="0,0 60,60 120,0 180,60 240,0 300,60 360,0 420,60 480,0 540,60 600,0 660,60 720,0 780,60 840,0 900,60 960,0 1020,60 1080,0 1140,60 1200,0 1260,60 1320,0 1380,60 1440,0 1440,60 0,60" fill={isKids ? '#f8f6ff' : '#0d1520'} />
                </svg>
            </div>
        </section>
    );
}
