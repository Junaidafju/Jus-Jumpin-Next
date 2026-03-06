'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LOCATIONS = [
    {
        name: 'JusJumpin Newtown',
        city: 'Kolkata',
        address: 'PS Qube, Action Area IID, Rajarhat, Newtown, WB 700156',
        phone: '+91 9830359999',
        email: 'newtown@jusjumpin.com',
        hours: '10 AM - 9 PM',
        features: ['Free Parking', 'Birthday Zone', 'Cafe']
    },
    {
        name: 'JusJumpin South City',
        city: 'Kolkata',
        address: 'South City Mall, Prince Anwar Shah Rd, WB 700068',
        phone: '+91 9874206206',
        email: 'southcity@jusjumpin.com',
        hours: '10 AM - 9 PM',
        features: ['Mall Location', 'Party Rooms', 'Arcade']
    },
    {
        name: 'JusJumpin Hyderabad',
        city: 'Hyderabad',
        address: 'Inorbit Mall, HITEC City, Madhapur, TS 500081',
        phone: '+91 9230967166',
        email: 'hyderabad@jusjumpin.com',
        hours: '10 AM - 9 PM',
        features: ['Valley Parking', 'VR Zone', 'Cafe']
    },
    {
        name: 'JusJumpin Bangalore',
        city: 'Bengaluru',
        address: 'Nexus Shantiniketan, Whitefield, KA 560048',
        phone: '+91 9830358888',
        email: 'bangalore@jusjumpin.com',
        hours: '10 AM - 9 PM',
        features: ['Weekend Events', 'Training Zone', 'Pro Shop']
    },
    {
        name: 'JusJumpin Mumbai',
        city: 'Mumbai',
        address: 'Phoenix Market City, Kurla, MH 400070',
        phone: '+91 9874206222',
        email: 'mumbai@jusjumpin.com',
        hours: '10 AM - 9 PM',
        features: ['Valley Parking', 'Birthday Packages', 'Cafe']
    },
    {
        name: 'JusJumpin Delhi',
        city: 'Delhi NCR',
        address: 'DLF Cyber City, Gurugram, HR 122002',
        phone: '+91 9230967333',
        email: 'delhi@jusjumpin.com',
        hours: '10 AM - 9 PM',
        features: ['Corporate Events', 'Group Packages', 'Training']
    }
];

// Group by city for display
const cities = ['Kolkata', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'];

export function MapLocationSection() {
    const [selectedCity, setSelectedCity] = useState('Kolkata');
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);

    const filteredLocations = LOCATIONS.filter(loc => loc.city === selectedCity);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        const firstLocation = LOCATIONS.find(loc => loc.city === city);
        if (firstLocation) setSelectedLocation(firstLocation);
    };

    const getMapUrl = (location: typeof LOCATIONS[0]) => {
        return `https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed&z=14`;
    };

    return (
        <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase mb-4">
                        📍 Find Us
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Our Locations{' '}
                        <span className="bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
                            Across India
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Find a JusJumpin near you — spreading joy pan-India with 10+ locations and growing!
                    </p>
                </div>

                {/* City Pills */}
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {cities.map((city) => (
                        <button
                            key={city}
                            onClick={() => handleCityChange(city)}
                            className={`
                px-6 py-2 rounded-full font-medium text-sm transition-all duration-300
                ${selectedCity === city
                                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                }
              `}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                {/* Location Cards */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Location List */}
                    <div className="lg:col-span-1 space-y-4">
                        {filteredLocations.map((location) => (
                            <button
                                key={location.name}
                                onClick={() => setSelectedLocation(location)}
                                className={`
                  w-full text-left p-5 rounded-xl border transition-all duration-300
                  ${selectedLocation.name === location.name
                                        ? 'bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500 shadow-lg shadow-green-600/20'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }
                `}
                            >
                                <h3 className="font-display font-bold text-white mb-2">{location.name}</h3>
                                <p className="text-sm text-gray-400 mb-3">{location.address}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-green-400">{location.hours}</span>
                                    <a href={`tel:${location.phone}`} className="text-green-300 hover:text-green-200">
                                        📞 Call
                                    </a>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-[400px] relative group">
                            <iframe
                                key={selectedLocation.name}
                                src={getMapUrl(selectedLocation)}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Location Info Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-display font-bold text-white">{selectedLocation.name}</h4>
                                        <p className="text-sm text-gray-300 mt-1">{selectedLocation.address}</p>
                                        <div className="flex gap-4 mt-2">
                                            <a href={`tel:${selectedLocation.phone}`} className="text-sm text-green-400 hover:text-green-300">
                                                📞 {selectedLocation.phone}
                                            </a>
                                            <span className="text-sm text-gray-400">🕐 {selectedLocation.hours}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`https://maps.google.com/?q=${encodeURIComponent(selectedLocation.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                                    >
                                        Directions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {[
                        { icon: '🕐', label: 'Open Daily', value: '10 AM - 9 PM' },
                        { icon: '🅿️', label: 'Parking', value: 'Free at all locations' },
                        { icon: '♿', label: 'Accessibility', value: 'Wheelchair friendly' },
                        { icon: '🎟️', label: 'Counter Booking', value: 'Walk-ins welcome' },
                    ].map((feature) => (
                        <div key={feature.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition">
                            <div className="text-3xl mb-2">{feature.icon}</div>
                            <div className="font-display font-bold text-white text-sm">{feature.label}</div>
                            <div className="text-xs text-gray-400 mt-1">{feature.value}</div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10">
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold text-green-400">10+</div>
                        <div className="text-sm text-gray-400">Locations</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold text-green-400">50k+</div>
                        <div className="text-sm text-gray-400">Happy Visitors</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold text-green-400">24/7</div>
                        <div className="text-sm text-gray-400">Online Support</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold text-green-400">100%</div>
                        <div className="text-sm text-gray-400">Fun Guaranteed</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        .font-display {
          font-family: 'Syne', sans-serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
        </section>
    );
}