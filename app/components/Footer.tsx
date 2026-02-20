"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBirthdayCake, FaHome, FaInfoCircle, FaBlog, FaChevronUp, FaSchool } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LottieIcon from './LottieIcon';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

    const quickLinks = [
        { name: 'Home', href: '/', icon: <FaHome className="mr-2" /> },
        { name: 'About Us', href: '/about', icon: <FaInfoCircle className="mr-2" /> },
        { name: 'Birthday Celebrations', href: '/birthday-celebration', icon: <FaBirthdayCake className="mr-2" /> },
        { name: 'Our Activities', href: '/activities', icon: <FaHome className="mr-2" /> },
        { name: 'School Trips', href: '/school-trips', icon: <FaSchool className="mr-2" /> },
        { name: 'Contact Us', href: '/contacts', icon: <FaPhone className="mr-2" /> },
        { name: 'Blogs', href: '/blogs', icon: <FaBlog className="mr-2" /> },
    ];

    const locations = [
        { city: 'Kolkata', address: 'ABC Square Building' },
        { city: 'Kolkata', address: 'Avani Mall' },
        { city: 'Kolkata', address: 'Axis Mall' },
        { city: 'Kolkata', address: 'City Centre 2' },
        { city: 'Siliguri', address: 'City Centre' },
        { city: 'Durgapur', address: 'Junction Mall' },
        { city: 'Bengaluru', address: 'M5 Ecity Mall' },
        { city: 'Bengaluru', address: 'Meenakshi Mall' },
        { city: 'Ghatkopar', address: 'R City Mall' },
        { city: 'Dhanbad', address: 'Prabhatam Mall' },
        { city: 'Mumbai', address: 'Infiniti Mall' },
        { city: 'Delhi', address: 'Select Citywalk' },
        { city: 'Chennai', address: 'Express Avenue' },
        { city: 'Hyderabad', address: 'Inorbit Mall' },
        { city: 'Pune', address: 'Phoenix Marketcity' },
        { city: 'Ahmedabad', address: 'Alpha One Mall' },
        { city: 'Lucknow', address: 'Phoenix Palassio' },
        { city: 'Jaipur', address: 'World Trade Park' },
        { city: 'Chandigarh', address: 'Elante Mall' },
        { city: 'Indore', address: 'Treasure Island' },
        { city: 'Bhopal', address: 'DB City Mall' },
        { city: 'Coimbatore', address: 'Brookefields Mall' },
    ];

    const socialLinks = [
        {
            icon: <LottieIcon src="/json/fb.json" alt="Facebook" className="w-4 h-8" />,
            href: 'https://www.facebook.com/jusjumpin/',
            label: 'Facebook'
        },
        {
            icon: <LottieIcon src="/json/insta.json" alt="Instagram" className="w-7 h-7" />,
            href: 'https://www.instagram.com/jusjumpin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
            label: 'Instagram'
        },
        {
            icon: <LottieIcon src="/json/yt.json" alt="Youtube" className="w-7 h-6" />,
            href: 'https://www.youtube.com/@jusjumpin',
            label: 'Youtube'
        },
    ];

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Fixed animation variants with proper TypeScript types
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const fadeInUp = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-yellow-500/30 rounded-full"
                        initial={{
                            x: ((i * 13) % 100) + '%',
                            y: ((i * 23) % 100) + '%'
                        }}
                        animate={{
                            x: [null, ((i * 37) % 100) + '%'],
                            y: [null, ((i * 47) % 100) + '%']
                        }}
                        transition={{
                            duration: ((i * 5) % 10) + 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}
            </div>

            {/* Top decorative wave with animation */}
            <motion.div
                className="overflow-hidden relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <svg className="w-full h-16 text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <motion.path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Brand & Description - Takes 3 columns */}
                    <motion.div
                        className="lg:col-span-3 space-y-6"
                        variants={fadeInUp}
                    >
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src="/image/Jus-Jumpin-Logo.webp"
                                alt="Jus Jumpin Logo"
                                className="h-12 w-auto filter brightness-100"
                            />
                        </motion.div>
                        <motion.p
                            className="text-gray-300 text-lg leading-relaxed font-light"
                            variants={fadeInUp}
                        >
                            A vibrant indoor entertainment zone — perfect for playful kids and thrill-loving adults looking to unleash their inner jumper.
                        </motion.p>

                        <motion.div
                            className="flex space-x-4"
                            variants={fadeInUp}
                        >
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center border border-gray-700 group"
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="group-hover:scale-110 transition-transform duration-300">
                                        {social.icon}
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Quick Links - Takes 2 columns */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={fadeInUp}
                    >
                        <motion.h3
                            className="text-2xl font-bold mb-6 pb-2 relative inline-block"
                            variants={fadeInUp}
                        >
                            Quick Links
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-pink-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                        </motion.h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 group pl-2"
                                    >
                                        <motion.span
                                            className="inline-block mr-3 group-hover:translate-x-2 transition-transform duration-300"
                                            whileHover={{ rotate: 10 }}
                                        >
                                            {link.icon}
                                        </motion.span>
                                        <span className="relative overflow-hidden">
                                            {link.name}
                                            <span className="absolute bottom-0 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Locations - Takes 5 columns (adjusted for 20+ locations) */}
                    <motion.div
                        className="lg:col-span-4"
                        variants={fadeInUp}
                    >
                        <motion.h3
                            className="text-2xl font-bold mb-6 pb-2 relative inline-block"
                            variants={fadeInUp}
                        >
                            Our Locations
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-pink-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                        </motion.h3>

                        {/* Desktop: Show all locations in grid */}
                        <div className="hidden lg:grid lg:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                            {locations.map((location, index) => (
                                <motion.div
                                    key={index}
                                    className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer"
                                    onMouseEnter={() => setHoveredLocation(index)}
                                    onMouseLeave={() => setHoveredLocation(null)}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-start space-x-3">
                                        <motion.div
                                            animate={{
                                                scale: hoveredLocation === index ? 1.2 : 1,
                                                rotate: hoveredLocation === index ? 360 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                                        </motion.div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-white truncate">{location.city}</p>
                                            <p className="text-sm text-gray-300 truncate">{location.address}</p>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {hoveredLocation === index && (
                                            <motion.div
                                                className="mt-2 pt-2 border-t border-gray-700"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <p className="text-xs text-gray-400">
                                                    Visit our amazing indoor park
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile: Compact list view */}
                        <div className="lg:hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                                {locations.map((location, index) => (
                                    <div
                                        key={index}
                                        className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold text-white text-sm">{location.city}</p>
                                                <p className="text-xs text-gray-300 truncate">{location.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-400">
                            <p>Total {locations.length} locations across India</p>
                        </div>
                    </motion.div>

                    {/* Contact Info - Takes 3 columns */}
                    <motion.div
                        className="lg:col-span-3"
                        variants={fadeInUp}
                    >
                        <motion.h3
                            className="text-2xl font-bold mb-6 pb-2 relative inline-block"
                            variants={fadeInUp}
                        >
                            Contact Info
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-pink-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                        </motion.h3>
                        <div className="space-y-4">
                            <motion.div
                                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
                                whileHover={{ x: 5 }}
                                variants={fadeInUp}
                            >
                                <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        PS Qube, Street No. 1111, Action Area IID,<br />
                                        Rajarhat, Newtown, West Bengal 700156
                                    </p>
                                </div>
                            </motion.div>

                            <div className="space-y-3">
                                <motion.a
                                    href="mailto:info@jusjumpin.com"
                                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
                                    whileHover={{ x: 5 }}
                                    variants={fadeInUp}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                                    >
                                        <FaEnvelope className="text-yellow-500" />
                                    </motion.div>
                                    <span className="font-medium">info@jusjumpin.com</span>
                                </motion.a>

                                <motion.div
                                    className="space-y-2 pl-3 border-l-2 border-yellow-500/30"
                                    variants={fadeInUp}
                                >
                                    <p className="text-sm font-semibold text-white">For Booking & Birthday:</p>
                                    {['+91 9830359999', '+91 9874206206'].map((phone, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={`tel:${phone.replace(/\s/g, '')}`}
                                            className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 group pl-2"
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="flex items-center space-x-2">
                                                <FaPhone className="text-yellow-500/70 text-sm" />
                                                <span>{phone}</span>
                                            </span>
                                        </motion.a>
                                    ))}
                                </motion.div>

                                <motion.div
                                    className="space-y-2 pl-3 border-l-2 border-yellow-500/30"
                                    variants={fadeInUp}
                                >
                                    <p className="text-sm font-semibold text-white">Marketing Queries:</p>
                                    <motion.a
                                        href="tel:+919230967166"
                                        className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 pl-2"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <FaPhone className="text-yellow-500/70 text-sm" />
                                            <span>+91 9230967166</span>
                                        </span>
                                    </motion.a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Divider with animation */}
                <motion.div
                    className="my-8 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    <motion.div
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full" />
                    </motion.div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center md:text-left">
                        <p className="text-gray-400 font-medium">
                            © Jus Jumpin&apos; {currentYear} | All rights reserved
                        </p>
                        <motion.p
                            className="text-sm text-gray-500 mt-1"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Making every jump count since 2017
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-gray-400">Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-xl text-pink-500"
                        >
                            💖
                        </motion.span>
                        <span className="text-gray-400">in Jus Jumpin&apos;</span>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                        {['Privacy Policy', 'Terms & Conditions', 'Safety Guidelines'].map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Enhanced Back to Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white shadow-2xl z-50 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300"
                        aria-label="Back to top"
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)"
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.span
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="inline-block"
                        >
                            <FaChevronUp className="text-xl text-yellow-400" />
                        </motion.span>
                    </motion.button>
                )}
            </AnimatePresence>


        </footer>
    );
};

export default Footer;