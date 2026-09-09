'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { locations } from '@/lib/locations/data';
import { LocationData } from '@/types/location';

// Group by city for display with 'All' option
const CITIES = ['All', ...Array.from(new Set(locations.map((loc) => loc.city)))];

export function MapLocationSection() {
    const [selectedCity, setSelectedCity] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState<LocationData>(locations[0]);

    const filteredLocations = useMemo(() => {
        if (selectedCity === 'All') return locations;
        return locations.filter((loc) => loc.city.toLowerCase() === selectedCity.toLowerCase());
    }, [selectedCity]);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        const firstLocation =
            city === 'All'
                ? locations[0]
                : locations.find((loc) => loc.city.toLowerCase() === city.toLowerCase());
        if (firstLocation) setSelectedLocation(firstLocation);
    };

    const getMapUrl = (location: LocationData) => {
        if (location.mapsEmbedUrl) {
            return location.mapsEmbedUrl;
        }
        return `https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed&z=14`;
    };

    const getDirectionsUrl = (location: LocationData) => {
        return location.mapsDirectionsUrl || `https://maps.google.com/?q=${encodeURIComponent(location.address)}`;
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
                        Find a JusJumpin near you — spreading joy pan-India with {locations.length}+ locations and growing!
                    </p>
                </div>

                {/* City Pills */}
                <div className="flex flex-wrap gap-2.5 justify-center mb-8 max-w-5xl mx-auto px-2">
                    {CITIES.map((city) => (
                        <button
                            key={city}
                            type="button"
                            onClick={() => handleCityChange(city)}
                            className={`
                px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer
                ${selectedCity === city
                                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30 scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }
              `}
                        >
                            {city === 'All' ? '🌐 All Cities' : city}
                        </button>
                    ))}
                </div>

                {/* Locations Count Badge */}
                <div className="flex justify-between items-center mb-4 px-1 text-xs text-gray-400 font-medium">
                    <span>
                        Showing <strong className="text-green-400">{filteredLocations.length}</strong> {filteredLocations.length === 1 ? 'venue' : 'venues'} {selectedCity === 'All' ? 'across India' : `in ${selectedCity}`}
                    </span>
                    {selectedCity !== 'All' && (
                        <button
                            onClick={() => handleCityChange('All')}
                            className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors cursor-pointer"
                        >
                            Show all cities
                        </button>
                    )}
                </div>

                {/* Location Cards and Map Grid */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8 items-start">
                    {/* Location List */}
                    <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredLocations.map((location) => {
                            const isSelected = selectedLocation?.slug === location.slug;
                            return (
                                <button
                                    key={location.slug}
                                    type="button"
                                    onClick={() => setSelectedLocation(location)}
                                    className={`
                    w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                    ${isSelected
                                            ? 'bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500 shadow-lg shadow-green-600/20'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }
                  `}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                        <h3 className="font-display font-bold text-white text-base leading-snug">
                                            {location.mall}
                                        </h3>
                                        <span
                                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${location.type === 'adults-kids'
                                                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                }`}
                                        >
                                            {location.type === 'adults-kids' ? 'Adults & Kids' : 'Kids'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-green-400 font-medium mb-1.5">
                                        {location.city}, {location.stateName}
                                    </p>
                                    <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                                        {location.address}
                                    </p>
                                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                                        <span className="text-gray-300 font-medium">
                                            🕐 {location.weekdayHours || '10 AM - 9 PM'}
                                        </span>
                                        {location.phone && (
                                            <a
                                                href={`tel:${location.phone.replace(/[^0-9+]/g, '')}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-green-300 hover:text-green-200 font-semibold"
                                            >
                                                📞 Call
                                            </a>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-[450px] lg:h-[500px] relative group shadow-2xl">
                            {selectedLocation && (
                                <>
                                    <iframe
                                        key={selectedLocation.slug}
                                        src={getMapUrl(selectedLocation)}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        title={`Map for ${selectedLocation.mall}`}
                                        className="transition-transform duration-700 group-hover:scale-105 w-full h-full"
                                    />

                                    {/* Location Info Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md rounded-xl p-4 md:p-5 border border-green-500/30 shadow-2xl">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                                                        {selectedLocation.city} • {selectedLocation.stateName}
                                                    </span>
                                                    <span className="text-xs text-gray-500">•</span>
                                                    <span className="text-xs text-gray-300 font-medium">
                                                        {selectedLocation.type === 'adults-kids'
                                                            ? 'Adults & Kids Arena'
                                                            : 'Kids Play Zone'}
                                                    </span>
                                                </div>
                                                <h4 className="font-display font-bold text-white text-base md:text-lg truncate">
                                                    {selectedLocation.mall}
                                                </h4>
                                                <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                                                    {selectedLocation.address}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs">
                                                    {selectedLocation.phone && (
                                                        <a
                                                            href={`tel:${selectedLocation.phone.replace(/[^0-9+]/g, '')}`}
                                                            className="text-green-400 hover:text-green-300 font-semibold"
                                                        >
                                                            📞 {selectedLocation.phone}
                                                        </a>
                                                    )}
                                                    <span className="text-gray-400">
                                                        🕐 {selectedLocation.weekdayHours || '10 AM - 9 PM'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <Link
                                                    href={`/${selectedLocation.slug}`}
                                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap"
                                                >
                                                    View Arena →
                                                </Link>
                                                <Link
                                                    href={getDirectionsUrl(selectedLocation)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-green-600/30 transition whitespace-nowrap"
                                                >
                                                    Directions 📍
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {[
                        { icon: '🕐', label: 'Open Daily', value: '11:00 AM - 9:30 PM' },
                        { icon: '🅿️', label: 'Parking', value: 'Mall & Basement Parking' },
                        { icon: '♿', label: 'Accessibility', value: 'Wheelchair friendly' },
                        { icon: '🎟️', label: 'Counter Booking', value: 'Walk-ins welcome' },
                    ].map((feature) => (
                        <div
                            key={feature.label}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition"
                        >
                            <div className="text-3xl mb-2">{feature.icon}</div>
                            <div className="font-display font-bold text-white text-sm">{feature.label}</div>
                            <div className="text-xs text-gray-400 mt-1">{feature.value}</div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10">
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold text-green-400">{locations.length}+</div>
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
        </section>
    );
}