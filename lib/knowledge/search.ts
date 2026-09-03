import { locations } from '@/lib/locations/data';
import { LocationData } from '@/types/location';

export interface SearchKnowledgeResult {
    results: string;
    locationFound?: string;
    detectedLocation?: LocationData;
    needsLocation?: boolean;
    isDeterministicFact?: boolean;
    showBookingForm?: boolean;
}

// Normalized map for quick mall/city/area aliases
const LOCATION_ALIASES: Array<{ keywords: string[]; slugPrefix: string }> = [
    { keywords: ['abc square', 'abc', 'new town', 'newtown', 'action area'], slugPrefix: 'kolkata-abc-square' },
    { keywords: ['avani', 'avani riverside', 'howrah'], slugPrefix: 'kolkata-avani' },
    { keywords: ['axis mall', 'axis'], slugPrefix: 'kolkata-axis' },
    { keywords: ['city centre 2', 'city center 2', 'cc2', 'rajarhat'], slugPrefix: 'kolkata-city-centre-2' },
    { keywords: ['m5', 'm5 ecity', 'ecity', 'electronic city'], slugPrefix: 'bengaluru-m5-ecity' },
    { keywords: ['meenakshi', 'meenakshi mall', 'bannerghatta', 'minakshi'], slugPrefix: 'bengaluru-meenakshi' },
    { keywords: ['r city', 'rcity', 'ghatkopar'], slugPrefix: 'mumbai-r-city' },
    { keywords: ['seasons', 'seasons mall', 'magarpatta', 'hadapsar'], slugPrefix: 'pune-seasons' },
    { keywords: ['sarath city', 'sarath', 'capital mall', 'kondapur', 'gachibowli', 'hitec'], slugPrefix: 'hyderabad-sarath-city' },
    { keywords: ['dsl', 'dsl virtue', 'uppal'], slugPrefix: 'hyderabad-dsl-virtue' },
    { keywords: ['gip', 'great india place', 'sector 38'], slugPrefix: 'noida-gip' },
    { keywords: ['spectrum', 'spectrum metro', 'sector 75'], slugPrefix: 'noida-spectrum' },
    { keywords: ['vr nagpur', 'vr mall nagpur', 'rambagh', 'untkhana'], slugPrefix: 'nagpur-vr' },
    { keywords: ['prabhatam', 'prabhatam mall', 'dhanbad'], slugPrefix: 'dhanbad-prabhatam' },
    { keywords: ['zora', 'zora mall', 'serikhedi', 'jora', 'zora the mall'], slugPrefix: 'raipur-zora' },
    { keywords: ['nucleus', 'nucleus mall', 'circular road'], slugPrefix: 'ranchi-nucleus' },
    { keywords: ['vr surat', 'vr mall surat', 'dumas', 'magdalla'], slugPrefix: 'surat-vr' },
    { keywords: ['siliguri city centre', 'matigara'], slugPrefix: 'siliguri-city-centre' },
    { keywords: ['r mall thane', 'ghodbunder', 'dokali'], slugPrefix: 'thane-r-mall' },
    { keywords: ['junction mall', 'durgapur junction'], slugPrefix: 'durgapur-junction' },
    { keywords: ['p&m', 'p and m', 'bistupur'], slugPrefix: 'jamshedpur-p-and-m' },
    { keywords: ['nashik city centre', 'untwadi', 'nasik'], slugPrefix: 'nashik-city-centre' },
];

/**
 * Resolves a LocationData object from user text or previous context.
 */
export function resolveLocationFromText(query: string, contextLocation?: LocationData | string): LocationData | undefined {
    if (!locations || locations.length === 0) return undefined;
    const q = query.toLowerCase().trim();

    // 1. Check alias keywords first (exact mall/area matches)
    for (const alias of LOCATION_ALIASES) {
        for (const kw of alias.keywords) {
            if (new RegExp(`\\b${kw}\\b`, 'i').test(q) || q.includes(kw)) {
                const match = locations.find(l => l.slug.toLowerCase().includes(alias.slugPrefix));
                if (match) return match;
            }
        }
    }

    // 2. Check full mall names
    for (const loc of locations) {
        if (loc.mall && q.includes(loc.mall.toLowerCase())) {
            return loc;
        }
    }

    // 3. Check city names (if only 1 location in city, or return primary)
    for (const loc of locations) {
        if (loc.city && (new RegExp(`\\b${loc.city.toLowerCase()}\\b`, 'i').test(q) || q.includes(loc.city.toLowerCase()))) {
            const cityLocs = locations.filter(l => l.city.toLowerCase() === loc.city.toLowerCase());
            if (cityLocs.length === 1) {
                return cityLocs[0];
            }
            if (contextLocation) {
                const ctxLoc = typeof contextLocation === 'string' ? getLocationInfo(contextLocation) : contextLocation;
                if (ctxLoc && ctxLoc.city.toLowerCase() === loc.city.toLowerCase()) {
                    return ctxLoc;
                }
            }
            return cityLocs[0];
        }
    }

    // 4. Check state name
    for (const loc of locations) {
        if (loc.stateName && new RegExp(`\\b${loc.stateName.toLowerCase()}\\b`, 'i').test(q)) {
            const stateLocs = locations.filter(l => l.stateName.toLowerCase() === loc.stateName.toLowerCase());
            return stateLocs[0];
        }
    }

    // 5. If no location detected in query, check contextLocation
    if (contextLocation) {
        if (typeof contextLocation === 'object' && contextLocation.slug) {
            return contextLocation;
        }
        if (typeof contextLocation === 'string' && contextLocation.trim()) {
            return getLocationInfo(contextLocation);
        }
    }

    return undefined;
}

/**
 * Helper to get all locations in a city or state.
 */
export function getLocationsByScope(query: string): { scoped: LocationData[]; scopeLabel: string } | undefined {
    const q = query.toLowerCase().trim();

    // Check state
    for (const loc of locations) {
        if (loc.stateName && (new RegExp(`\\b${loc.stateName.toLowerCase()}\\b`, 'i').test(q) || q.includes(loc.stateName.toLowerCase()))) {
            const scoped = locations.filter(l => l.stateName?.toLowerCase() === loc.stateName.toLowerCase());
            return { scoped, scopeLabel: loc.stateName };
        }
    }

    // Check city
    for (const loc of locations) {
        if (loc.city && (new RegExp(`\\b${loc.city.toLowerCase()}\\b`, 'i').test(q) || q.includes(loc.city.toLowerCase()))) {
            const scoped = locations.filter(l => l.city.toLowerCase() === loc.city.toLowerCase());
            return { scoped, scopeLabel: loc.city };
        }
    }

    return undefined;
}

/**
 * Main knowledge search engine. Returns structured data, deterministic answers,
 * and sets flags for the chat API.
 */
export function searchKnowledge(query: string, contextLocation?: LocationData | string): SearchKnowledgeResult {
    const q = query.toLowerCase().trim();

    if (!locations || locations.length === 0) {
        return {
            results: 'No location data available',
            locationFound: undefined,
            needsLocation: false
        };
    }

    // Intent detectors
    const asksPrice = /\b(price|prices|pricing|cost|rate|rates|₹|rupee|rupees|fee|ticket|tickets|charge|charges|how much)\b/i.test(q);
    const asksHours = /\b(hour|hours|timing|timings|time|open|opening|close|closing|schedule)\b/i.test(q);
    const asksLocation = /\b(location|locations|address|where|direction|directions|reach|map|maps|landmark)\b/i.test(q);
    const asksActivities = /\b(activit|activities|game|games|play|ride|rides|slide|slides|trampoline|ninja|arcade|foam pit|bowling)\b/i.test(q);
    const asksAdult = /\b(adult|adults|grown up|grownups|18\+|teens?)\b/i.test(q);
    const asksSocks = /\b(sock|socks|grip sock|grip socks)\b/i.test(q);
    const asksAge = /\b(age|ages|age limit|kids age|toddler|toddlers|min age|minimum age)\b/i.test(q);
    const asksFood = /\b(food|cafe|restaurant|bites|eat|snacks|jus bites|outside food)\b/i.test(q);
    const asksSafety = /\b(safe|safety|hygiene|clean|cleanliness|supervis|protocol)\b/i.test(q);
    const asksPartyInfo = /\b(party|parties|birthday|birthdays|celebrat|celebration|package|packages|kitty party|corporate|event|book party|book birthday)\b/i.test(q);

    // -----------------------------------------------------------------
    // 1. "How many stores/outlets/branches" & "Any other location(s)"
    // -----------------------------------------------------------------
    const asksCount = /how many|number of|count of|total (stores|branches|locations|parks|outlets)/i.test(q);
    const asksOtherLocations = /\bany other\b|\bother (location|store|outlet|branch|mall|park)/i.test(q);
    const asksAllLocations = /all (locations|stores|branches|parks|cities)|list (of )?(all )?(locations|stores|cities|branches)/i.test(q);

    if (asksCount || asksOtherLocations || asksAllLocations) {
        const scopeResult = getLocationsByScope(q);
        let scoped: LocationData[];
        let scopeLabel: string;

        if (scopeResult) {
            scoped = scopeResult.scoped;
            scopeLabel = scopeResult.scopeLabel;
        } else {
            scoped = locations;
            scopeLabel = 'India';
        }

        const count = scoped.length;
        const listLines = scoped.map(l => {
            const shortAddr = l.address ? l.address.split(',')[0].trim() : '';
            return `• **${l.mall}** (${shortAddr || l.city}) — 📞 ${l.phone || '+91 98362 29922'}`;
        });

        const countResults = [
            `📊 We have **${count} location${count === 1 ? '' : 's'}** in **${scopeLabel}**:`,
            '',
            ...listLines,
            '',
            `💡 Mention any mall (e.g. *"${scoped[0]?.mall || 'ABC Square'} prices"*) to see exact tickets and timings!`
        ];

        return {
            results: countResults.join('\n'),
            locationFound: scopeLabel,
            detectedLocation: scoped.length === 1 ? scoped[0] : undefined,
            needsLocation: false,
            isDeterministicFact: true
        };
    }

    // -----------------------------------------------------------------
    // 2. City-Scoped Birthday / Party Queries (e.g., Hyderabad with 2 locations)
    // -----------------------------------------------------------------
    if (asksPartyInfo) {
        const scopeResult = getLocationsByScope(q);
        if (scopeResult && scopeResult.scoped.length > 1) {
            const partyLines = [
                `🎉 **Birthday & Party Celebrations in ${scopeResult.scopeLabel}**`,
                '',
                `Yes, absolutely! We host birthday celebrations across our **${scopeResult.scoped.length} locations** in ${scopeResult.scopeLabel}:`,
                '',
                ...scopeResult.scoped.map(l => `• **${l.mall}** (${l.address ? l.address.split(',')[0].trim() : l.city}) — ${l.type === 'adults-kids' ? 'Kids & Adult Trampoline Arenas' : 'Kids Adventure Play Zone'}${l.phone ? ` (📞 ${l.phone})` : ''}`),
                '',
                `🎈 **What's included in our packages:**`,
                `• Dedicated party hosts & custom themed decorations`,
                `• Mascots, tattoo artists, music & interactive games`,
                `• Delicious food & snack combos from Jus' Bites`,
                `• Full access to trampoline & adventure zones for all guests`,
                '',
                `💡 Tap the **'🎉 Book Party'** button below to reserve a slot for your celebration!`
            ];

            return {
                results: partyLines.join('\n'),
                locationFound: scopeResult.scopeLabel,
                detectedLocation: scopeResult.scoped[0],
                needsLocation: false,
                isDeterministicFact: true
            };
        }
    }

    // -----------------------------------------------------------------
    // 3. Resolve target location (from query or previous context)
    // -----------------------------------------------------------------
    const detectedLocation = resolveLocationFromText(q, contextLocation);

    // If query asks for socks policy without mentioning a location
    if (asksSocks && !detectedLocation) {
        const resLines = [
            `🧦 **Anti-Skid Grip Socks Policy:**`,
            '',
            `Anti-skid grip socks are mandatory on all trampolines across all Jus Jumpin parks for safety and grip.`,
            `• **Price:** ₹40–₹60 per pair (one-time purchase, reusable for all future visits)`,
            `• Available directly at our entry counter.`,
            '',
            `💡 Mention your mall or city (e.g. *"Axis Mall socks"* or *"Kolkata ABC socks"*) to see the exact price for that park!`
        ];

        return {
            results: resLines.join('\n'),
            locationFound: undefined,
            detectedLocation: undefined,
            needsLocation: false,
            isDeterministicFact: true
        };
    }

    // If query asks for specific facts but no location is detected/provided
    if (!detectedLocation && (asksPrice || asksHours || (asksActivities && !asksPartyInfo))) {
        const allCities = [...new Set(locations.map(l => l.city))];
        const resLines = [
            `📍 **Which location would you like to check?**`,
            '',
            `We have trampoline & adventure parks in:`,
            `• ${allCities.join(' • ')}`,
            '',
            `💡 Example: *"Kolkata prices"*, *"Noida hours"*, or *"Hyderabad activities"*`
        ];

        return {
            results: resLines.join('\n'),
            locationFound: undefined,
            detectedLocation: undefined,
            needsLocation: true,
            isDeterministicFact: true
        };
    }

    // If a specific location is resolved:
    if (detectedLocation) {
        const loc = detectedLocation;
        const locationName = `${loc.city} - ${loc.mall}`;

        // -------------------------------------------------------------
        // Fact A: Birthday / Party Info for Specific Location
        // -------------------------------------------------------------
        if (asksPartyInfo) {
            const partyLines = [
                `🎉 **Birthday & Party Celebrations — ${loc.city} (${loc.mall})**`,
                '',
                `Yes, absolutely! We host birthday celebrations at Jus Jumpin ${loc.mall}. Packages include:`,
                `• 🎈 **Dedicated Party Zones & Custom Themed Decorations**`,
                `• 🎪 **Dedicated Party Hosts, Mascots & Tattoo Artists**`,
                `• 🍕 **Delicious Snacks & Meals from Jus' Bites**`,
                `• 🎟️ **Full Access to Trampoline & Adventure Arenas** for all guests`,
                `• 👥 **Zone Type:** ${loc.type === 'adults-kids' ? 'Kids & Adult Trampoline Arenas' : 'Kids Adventure Park (Ages 1–12)'}`,
                '',
                `🏢 **Address:** ${loc.address}`,
                `📞 **Party Booking Desk:** ${loc.phone}`,
                '',
                `💡 Tap the **'🎉 Book Party'** button below to enter your party details and reserve your slot!`
            ];

            return {
                results: partyLines.join('\n'),
                locationFound: locationName,
                detectedLocation: loc,
                needsLocation: false,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact B: Anti-Skid Grip Socks (Specific to Location)
        // -------------------------------------------------------------
        if (asksSocks) {
            const note = loc.ticketNote || 'Anti-Skid Grip Socks at ₹50 (One-time Purchase. Compulsory for your safety.)';
            return {
                results: `🧦 **Anti-Skid Grip Socks — ${loc.city} (${loc.mall}):**\n\n📌 **${note}**\n\nAnti-skid grip socks are mandatory on all trampolines and play structures for safety and grip. They can be purchased directly at our entry desk and are reusable on all your future visits.\n\n📍 **Location:** ${loc.address}\n📞 **Phone:** ${loc.phone}`,
                locationFound: locationName,
                detectedLocation: loc,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact C: Operating Hours (Only Hours)
        // -------------------------------------------------------------
        if (asksHours && !asksPrice && !asksActivities) {
            const hoursLines = [
                `⏰ **Operating Hours — ${loc.city} (${loc.mall})**`,
                '',
                `• **Weekdays (Mon–Fri):** ${loc.weekdayHours || '11:00 AM – 9:30 PM'}`,
                `• **Weekends (Sat–Sun):** ${loc.weekendHours || '11:00 AM – 9:30 PM'}`,
                '',
                `🏢 **Address:** ${loc.address}`,
                `📞 **Phone:** ${loc.phone}`,
                `🔗 https://www.jusjumpin.com/${loc.slug}`
            ];

            return {
                results: hoursLines.join('\n'),
                locationFound: locationName,
                detectedLocation: loc,
                needsLocation: false,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact D: Pricing / Tickets (Only Pricing)
        // -------------------------------------------------------------
        if (asksPrice && !asksHours && !asksActivities) {
            const pricingLines: string[] = [
                `💰 **Ticket Pricing — ${loc.city} (${loc.mall})**`,
                ''
            ];

            if (loc.pricing && loc.pricing.length > 0) {
                loc.pricing.forEach(p => {
                    pricingLines.push(`• **${p.label}:** Weekday **${p.weekday}** | Weekend **${p.weekend}**`);
                });
            } else {
                pricingLines.push(`• Standard entry sessions (60 & 90 mins) available.`);
            }

            if (loc.ticketNote) {
                pricingLines.push('');
                pricingLines.push(`📌 *${loc.ticketNote}*`);
            }

            pricingLines.push('');
            pricingLines.push(`📞 For party or bulk bookings: ${loc.phone}`);
            pricingLines.push(`🔗 https://www.jusjumpin.com/${loc.slug}`);

            return {
                results: pricingLines.join('\n'),
                locationFound: locationName,
                detectedLocation: loc,
                needsLocation: false,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact D: Activities (Only Activities)
        // -------------------------------------------------------------
        if (asksActivities && !asksPrice && !asksHours) {
            const actLines: string[] = [
                `🎮 **Activities & Attractions — ${loc.city} (${loc.mall})**`,
                ''
            ];

            if (loc.activities && loc.activities.length > 0) {
                loc.activities.slice(0, 10).forEach(a => {
                    actLines.push(`• **${a.name}** ${a.ageGroup ? `(${a.ageGroup})` : ''}`);
                });
                if (loc.activities.length > 10) {
                    actLines.push(`• *And ${loc.activities.length - 10} more exciting attractions...*`);
                }
            } else {
                actLines.push(`• Trampoline Arena, Foam Pit, Wave Slide, Soft Play Area, Ball Pool, Wall Climbing, and Obstacle Courses!`);
            }

            actLines.push('');
            actLines.push(`👥 **Type:** ${loc.type === 'adults-kids' ? 'Kids & Adults (Dedicated Adult Trampoline Zone)' : 'Kids Fun Park (Ages 1–12)'}`);
            actLines.push(`⏰ **Hours:** ${loc.weekdayHours}`);
            actLines.push(`🔗 https://www.jusjumpin.com/${loc.slug}`);

            return {
                results: actLines.join('\n'),
                locationFound: locationName,
                detectedLocation: loc,
                needsLocation: false,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact E: Address & Directions
        // -------------------------------------------------------------
        if (asksLocation && !asksPrice && !asksHours && !asksActivities) {
            const addrLines = [
                `📍 **Address & Directions — ${loc.city} (${loc.mall})**`,
                '',
                `🏢 **Address:** ${loc.address}`,
                `📞 **Phone:** ${loc.phone}`,
                `⏰ **Hours:** ${loc.weekdayHours} (All Days)`,
                '',
                loc.mapsDirectionsUrl ? `🗺️ **Google Maps:** ${loc.mapsDirectionsUrl}` : '',
                `🔗 https://www.jusjumpin.com/${loc.slug}`
            ].filter(Boolean);

            return {
                results: addrLines.join('\n'),
                locationFound: locationName,
                detectedLocation: loc,
                needsLocation: false,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact F: Adult Zone Inquiries
        // -------------------------------------------------------------
        if (asksAdult) {
            const adultLines: string[] = [];
            if (loc.type === 'adults-kids') {
                adultLines.push(`👥 **Yes! Adult Trampoline Zone Available at ${loc.city} (${loc.mall})**`);
                adultLines.push('');
                adultLines.push(`✅ This location features dedicated adult & teen trampoline arenas, dodgeball, ninja warrior courses, and foam pits.`);
                adultLines.push(`⏰ **Hours:** ${loc.weekdayHours}`);
                if (loc.pricing && loc.pricing.length > 0) {
                    adultLines.push(`💰 **Pricing:** ${loc.pricing.map(p => `${p.label} (${p.weekday} WD / ${p.weekend} WE)`).join(', ')}`);
                }
            } else {
                adultLines.push(`👶 **Kids-Only Play Zone at ${loc.city} (${loc.mall})**`);
                adultLines.push('');
                adultLines.push(`ℹ️ This branch is specially designed for kids (ages 1–12).`);
                adultLines.push(`🏢 For full adult trampoline and adventure parks, check out our flagship adult locations:`);
                adultLines.push(`   • **Kolkata - ABC Square Building** (Newtown)`);
                adultLines.push(`   • **Hyderabad - Sarath City Capital Mall** (Gachibowli)`);
                adultLines.push(`   • **Raipur - Zora The Mall** (NH-6)`);
            }
            adultLines.push('');
            adultLines.push(`📞 Phone: ${loc.phone}`);
            adultLines.push(`🔗 https://www.jusjumpin.com/${loc.slug}`);

            return {
                results: adultLines.join('\n'),
                locationFound: locationName,
                detectedLocation: loc,
                needsLocation: false,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact G: Socks / Safety / Food / Age FAQs
        // -------------------------------------------------------------
        if (asksSocks) {
            const note = loc.ticketNote || 'Anti-Skid Grip Socks at ₹50 (One-time Purchase. Compulsory for your safety.)';
            return {
                results: `🧦 **Anti-Skid Grip Socks Policy — ${loc.city} (${loc.mall}):**\n\n📌 **${note}**\n\nAnti-skid grip socks are compulsory on all trampolines and play arenas for safety and grip. You can purchase them at our front desk (reusable for future visits).\n\n📍 **Location:** ${loc.address}\n📞 **Phone:** ${loc.phone}`,
                locationFound: locationName,
                detectedLocation: loc,
                isDeterministicFact: true
            };
        }

        if (asksAge) {
            return {
                results: `👶 **Age Guidelines — ${loc.city} (${loc.mall}):**\n\n• **Toddlers (1–5 yrs):** Dedicated soft play zones, ball pools, and mini slides.\n• **Kids (5–12 yrs):** Trampolines, obstacle courses, and slides.\n• **Teens & Adults (13+ yrs):** ${loc.type === 'adults-kids' ? 'Full access to adult trampoline park and ninja course!' : 'Visit our Kolkata ABC Square or Hyderabad Sarath City locations for dedicated adult trampoline arenas.'}\n\n📞 Need more info? Call ${loc.phone}`,
                locationFound: locationName,
                detectedLocation: loc,
                isDeterministicFact: true
            };
        }

        if (asksFood) {
            return {
                results: `🍔 **Food & Refreshments:**\n\nWe feature our in-house cafe **Jus' Bites** offering snacks, beverages, and party menus! Outside cooked food is not permitted inside play arenas for hygiene and safety.\n\n📍 **Location:** ${loc.city} - ${loc.mall}\n📞 ${loc.phone}`,
                locationFound: locationName,
                detectedLocation: loc,
                isDeterministicFact: true
            };
        }

        // -------------------------------------------------------------
        // Fact H: Full Overview (Combined pricing/activities or general inquiry)
        // -------------------------------------------------------------
        const overviewLines: string[] = [
            `📍 **Jus Jumpin — ${loc.city} (${loc.mall})**`,
            `📝 ${loc.subtitle || loc.h1}`,
            '',
            `🏢 **Address:** ${loc.address}`,
            `📞 **Phone:** ${loc.phone}`,
            '',
            `⏰ **Hours:** Weekdays ${loc.weekdayHours} | Weekends ${loc.weekendHours}`
        ];

        if (loc.pricing && loc.pricing.length > 0) {
            overviewLines.push('');
            overviewLines.push(`💰 **Pricing:**`);
            loc.pricing.forEach(p => {
                overviewLines.push(`• ${p.label}: **${p.weekday}** (WD) | **${p.weekend}** (WE)`);
            });
            if (loc.ticketNote) {
                overviewLines.push(`📌 *${loc.ticketNote}*`);
            }
        }

        if (loc.activities && loc.activities.length > 0) {
            overviewLines.push('');
            overviewLines.push(`🎮 **Activities:** ${loc.activities.slice(0, 6).map(a => a.name).join(', ')}${loc.activities.length > 6 ? ` + ${loc.activities.length - 6} more` : ''}`);
        }

        overviewLines.push('');
        overviewLines.push(`🔗 https://www.jusjumpin.com/${loc.slug}`);

        return {
            results: overviewLines.join('\n'),
            locationFound: locationName,
            detectedLocation: loc,
            needsLocation: false,
            isDeterministicFact: true
        };
    }

    // -----------------------------------------------------------------
    // 4. Birthday / Party Informational Query (Generic)
    // -----------------------------------------------------------------
    if (asksPartyInfo) {
        const partyLines = [
            `🎉 **Celebrate Birthday Parties & Events at Jus Jumpin!**`,
            '',
            `Our all-inclusive birthday & event packages include:`,
            `• 🎈 **Dedicated Party Rooms & Custom Theme Decorations**`,
            `• 🎪 **Dedicated Party Hosts, Mascots & Tattoo Artists**`,
            `• 🍕 **Delicious Food & Snacks from Jus' Bites**`,
            `• 🎟️ **Full Access to Trampoline & Adventure Arenas**`,
            `• 🎁 **Personalized Gift Vouchers & Return Favors**`,
            '',
            `💡 Tap the **'🎉 Book Party'** button below or call **+91 98362 29922** to check availability!`
        ];

        return {
            results: partyLines.join('\n'),
            locationFound: undefined,
            detectedLocation: undefined,
            needsLocation: false,
            isDeterministicFact: true
        };
    }

    // -----------------------------------------------------------------
    // 5. Default Fallback Overview
    // -----------------------------------------------------------------
    const allCities = [...new Set(locations.map(l => l.city))];
    const defaultLines = [
        `🏢 **Jus Jumpin — Premier Indoor Trampoline & Adventure Parks**`,
        '',
        `📍 **20+ Locations across India:**`,
        `• ${allCities.join(' • ')}`,
        '',
        `📞 **Helpline:** +91 98362 29922`,
        `⏰ **Hours:** 11:00 AM – 9:30 PM (All Days)`,
        '',
        `💡 Tell me your city or mall to get exact tickets, timings, and activities!`
    ];

    return {
        results: defaultLines.join('\n'),
        locationFound: undefined,
        detectedLocation: undefined,
        needsLocation: false,
        isDeterministicFact: false
    };
}

/**
 * Get LocationData by query matching city or mall name.
 */
export function getLocationInfo(query: string): LocationData | undefined {
    if (!locations || locations.length === 0) return undefined;
    return resolveLocationFromText(query);
}

/**
 * Get all unique cities.
 */
export function getAllCities(): string[] {
    const cities = new Set(locations.map(l => l.city));
    return Array.from(cities);
}

/**
 * Get LocationData for a given city name.
 */
export function getLocationByCity(city: string): LocationData | undefined {
    return locations.find(l => l.city.toLowerCase() === city.toLowerCase());
}