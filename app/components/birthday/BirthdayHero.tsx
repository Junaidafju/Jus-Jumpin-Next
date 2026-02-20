// jusjumpin-next/components/BirthdayShowcase.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const BirthdayShowcase = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const celebrationImages = [
        {
            url: "/image/Birthday Party.webp",
            alt: "Kids celebrating with birthday cake",
            emoji: "🎂",
            color: "#FF6B35"
        },
        {
            url: "/image/Birthday Party2.webp",
            alt: "Kids jumping in bouncy castle",
            emoji: "🏰",
            color: "#0066CC"
        },
        {
            url: "/image/Birthday Party3.webp",
            alt: "Children wearing party hats",
            emoji: "🎉",
            color: "#FF6B35"
        },
        {
            url: "/image/Birthday Party4.webp",
            alt: "Kids opening presents",
            emoji: "🎁",
            color: "#0066CC"
        },
        {
            url: "/image/Birthday Party5.webp",
            alt: "Children playing with balloons",
            emoji: "🎈",
            color: "#FF6B35"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % celebrationImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        gsap.fromTo(".birthday-tagline",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
        gsap.fromTo(".birthday-title",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
        );
        gsap.fromTo(".birthday-description",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 }
        );
        gsap.fromTo(".birthday-features",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.8 }
        );
        gsap.fromTo(".birthday-buttons",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1 }
        );
    }, []);

    // Cloud data for Framer Motion animation
    const foregroundClouds = [
        { id: 1, top: '5%', delay: 0, duration: 25, scale: 1.2 },
        { id: 2, top: '12%', delay: 5, duration: 28, scale: 1.1 },
        { id: 3, top: '20%', delay: 2, duration: 32, scale: 1.3 },
        { id: 4, top: '8%', delay: 8, duration: 26, scale: 1.0 },
    ];

    const backgroundClouds = [
        { id: 5, top: '25%', delay: 1, duration: 45, scale: 0.8, opacity: 0.5 },
        { id: 6, top: '35%', delay: 4, duration: 52, scale: 0.7, opacity: 0.5 },
        { id: 7, top: '45%', delay: 7, duration: 48, scale: 0.9, opacity: 0.5 },
        { id: 8, top: '55%', delay: 2, duration: 55, scale: 0.6, opacity: 0.5 },
        { id: 9, top: '65%', delay: 5, duration: 50, scale: 0.8, opacity: 0.5 },
        { id: 10, top: '75%', delay: 9, duration: 60, scale: 0.7, opacity: 0.5 },
    ];

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#FD940A] to-[#FB6C1F]">

            {/* 🎨 CLOUD ANIMATION SYSTEM - Framer Motion */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">

                {/* Foreground Clouds - Faster, larger, higher opacity */}
                {foregroundClouds.map((cloud) => (
                    <motion.div
                        key={cloud.id}
                        className="absolute"
                        style={{
                            top: cloud.top,
                            left: '-10%',
                            width: '180px',
                            height: 'auto',
                            zIndex: 10,
                        }}
                        animate={{
                            x: ['0vw', '120vw'],
                        }}
                        transition={{
                            duration: cloud.duration,
                            delay: cloud.delay,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 0,
                        }}
                    >
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABgCAYAAACTzNnjAAAFCklEQVR42u3d34uVRRjA8YMsEi0iSwhdRBGhSJgZiNRFIkWhQVEXBipKUVBBLCF6k0h4UxFkBLq4QT/Qiyi80EgxCjXMWqOMtqy0bBNja92yXatN3c3pGc9sHU/v+X3emWfe93vx+QN23u+e95x5Z94pmNWFQo5NEytErzgoBsSIOCf+FqbEBTEhzophcVTsFxvFEjE152PZHGMukbcB6BAPij0uqgtl0bXCBvyjeFPcS2wEWc0y0ec++Ywnf7rwbyc8grQ6RY8Y9RhhJT+Jde4TmghzFuR08bo4ryDEpE/N58QUYsx+kFPcD4yzCkMsZz+1uwkyu0HeKYYiCLHcN2I2QWYnSPudbHubfy37NuFu4wQZeZD2k2Uw4hDLHRZdBBnnH3K/5ykcX86IeQQZl6civ0XXYv/RlhJkHLZkOMTypz7dBKnbyzmJsfTZeTdB6vRszmIsjXI5QeryWMa/M9ZinzjdTJA63CLGcxzjpD/ElQQZfq3iKDFe8lSHIAPqI8L/6SHIMJ4nvorTQQsI0v+teoz4KjpBkH7tIrqaNhCkH9cnbK5C8q/uywiSHzKabCLIdM3K+QR4o8YysfVWcZDvElnD1hNkOi5XuilLu5MlOyzni3vESnGfWCRuIMjm1zgSWPM7GWvNXdonXkdM8Q0dCwmytu8Iy/vK9B3iRoJMnghnqifc8jb7yXkXQf5nLWGo2WR2HUGuLrxPDKq25D6d9yBPE4I6/e6rVO6CnMpkuFq/eLmFKwtyMRde/dOg2XkKkvlH/X5P9ZNSWZBvcMGjMJza6iJlQe7nYkfjozwE+TkXOiprsx7kES5yVOzLYK/IcpA/cJGj806Wg/yaCxzlzsersxpkPxc4SruzGuQBLm603yU7DPOQUOSJWIK0E6j2lcvPm+JJVp+674oDbiFuv5t/fEXs5cJG65DmIO3KY3vG3yCLbXO1N1xVkB3uWfQQFye3rtUS5DN1bC5C9j0cOki7XOwUFwJOb6gg7TmCW1lMizI7QwQ5nW2qqGCv7yDtwsxfGXhU0OczyKvECIOOKvb5CnKa2+TDoKOat3wFyaIH1ONFH0H2MNCo00NpBzmXR39owIy0gzzOIKNOv6X9LHsZg4wGp3xsM/ZMoUfF3aaZ4++qBDnIIKMNzrsHKb11Lb6oEORtDCRSYB81f+vWxzYUJBv2kTYb5vx6gzzHgMHTjsUXagV5BwMFzz78d5NYQpDbGCAEcOzissaEIL9kcBDIx0lBsrwMIW0uD3KcQUHgqaEFpUGyLQGhnSgNkgGBBg8QJDQ5Phkky82g5bvkNQXDscDQY6MNcpiBgBL9NsjDDAS0LPq1Qb7EQECJicLFSUkGAkpMLgMaYzCgKci3GQxomPqZDPImBgMa9uOULifnDWcI7VRpkIsYEAR2sHwX2GcMCgJak/QKPh4lIsgcpOhM2iv7JIODAPqqvY7vPQYInlf6zKsWpN2iOMBAwZMD9bzSudPwvh+kr3gofJ0vve/ikxIp36pXNHosiD2j5gMGD2ksyG3lJK917qc5A4l2eNW04Wi5OaZ41DADilZu0xtMmw/fXCV+ZnDRoFFTfBdpaudlLxVfsXMRNYy7W3SH8XSAu/01bo8s/kL8xQWAM+JC7DIeDnCvZqZ4RGxxi3/3iUPOJ+5TtRXfG/v6jeadNMVjlqsZquG0uwU164ybg2vFuPuh2ax23tkm3N91VLwmbjVNvPT+H7Ro4730ITNPAAAAAElFTkSuQmCC"
                            alt="cloud"
                            style={{
                                width: '100%',
                                height: 'auto',
                                opacity: 0.9,
                                filter: 'brightness(1.1) contrast(0.9)',
                            }}
                        />
                    </motion.div>
                ))}

                {/* Background Clouds - Slower, smaller, lower opacity */}
                {backgroundClouds.map((cloud) => (
                    <motion.div
                        key={cloud.id}
                        className="absolute"
                        style={{
                            top: cloud.top,
                            left: '-15%',
                            width: '120px',
                            height: 'auto',
                            zIndex: 5,
                        }}
                        animate={{
                            x: ['0vw', '130vw'],
                        }}
                        transition={{
                            duration: cloud.duration,
                            delay: cloud.delay,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 0,
                        }}
                    >
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAqCAYAAAAUJM0rAAACFUlEQVRo3u3aPSwDYRzH8UZEbAYiYrDYjLZGpIPBJLGwSKwi0k1iYBKDdFJsEiMxSZgsFZJGiGjqJWEhSKuaNKRUG8r5PfI8SXOud72+PH2eu2f47Ndv7+V5/nee/G6bh5MWmIV9iEMWvkGjfiADD7AHk9BU6+PSNK0kPAINwwXkC6KU6gvC4HVyKB/clhHHCDnbTqHbSaEaYIv+OK3KyBk274RQrXBXg0B6B/QPkTIUiZTiEIm5gkbZQjXTJ5nG2ZFsocJ1iMQEZQk1VcdIGl2L9Yoeitwj3uocirgRPVRAgEjMoMihkgKFStIzK063QVHYhKF6h/IKFMlKGpaNlhM8Qq1JFIp5gQHeoSIShmJPST/PUElJQ7FN9hivUGmJQxE56OQRKiN5qL/NNY9QKQeEIpdgR7VC9cEqHeGeUyEHXHrMUiWhyKx6BV4dEsNMtNxQI4Ls33h5LidUoEYjXKEXoXZDLbgsEBOzE8qne8fmJhE7oWIujUQcwhyMmy0VSKRRF0cyWlclYMYo1LEKZOgRugpDpVWUot5ZLI8LlwN23bNQKoY1vwpVmmsS6kOFsPRJQl2qENZIqGkVwnp9xb5nUksEcxm2hZlQMcy3OYXTgx0VpOi2pl8/jwqpMP9sF5twBl08ctE7I/dws5l5D5y4OBj51HvdzluYdlik0RL06cjkKpSlB1Span5x/AQb5Hfrxyy/oU5ISeVw53AAAAAASUVORK5CYII="
                            alt="cloud"
                            style={{
                                width: '100%',
                                height: 'auto',
                                opacity: 0.5,
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">

                    {/* LEFT SIDE - Tilted Image Carousel */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[500px] aspect-[4/5]">
                            {/* Main tilted frame */}
                            <motion.div
                                initial={{ rotate: -8, scale: 0.95, opacity: 0 }}
                                animate={{ rotate: -5, scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-full h-full"
                                style={{
                                    transform: 'rotate(-5deg)',
                                    boxShadow: '25px 30px 45px -15px rgba(0,0,0,0.25)',
                                }}
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImage}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.7, ease: "easeInOut" }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <img
                                                src={celebrationImages[currentImage].url}
                                                alt={celebrationImages[currentImage].alt}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                            {/* Emoji badge with brand color */}
                                            <div
                                                className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                                style={{
                                                    backgroundColor: celebrationImages[currentImage].color,
                                                    boxShadow: `0 10px 25px -5px ${celebrationImages[currentImage].color}80`
                                                }}
                                            >
                                                <span className="text-3xl">{celebrationImages[currentImage].emoji}</span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Polaroid-style floating thumbnails */}
                            <motion.div
                                initial={{ rotate: 12, x: -20, y: 20, opacity: 0 }}
                                animate={{ rotate: -12, x: 0, y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="absolute -bottom-8 -left-8 w-28 h-28 rounded-lg overflow-hidden "
                            >
                                <img src="/image/smiley-birthday.png" alt="Bouncy castle" className="w-full h-full object-cover" />
                            </motion.div>

                            <motion.div
                                initial={{ rotate: -15, x: 20, y: -20, opacity: 0 }}
                                animate={{ rotate: 15, x: 0, y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute -top-2 -right-8 w-24 h-24 rounded-lg overflow-hidden"
                            >
                                <img src="/image/birthday-cone-cap-vector.jpg" alt="Balloons" className="w-full h-full object-cover" />
                            </motion.div>

                            <motion.div
                                initial={{ rotate: 6, x: -10, y: -10, opacity: 0 }}
                                animate={{ rotate: 6, x: 0, y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="absolute bottom-12 -right-12 w-20 h-20 rounded-lg overflow-hidden shadow-xl"
                            >
                                <img src="/image/cake-thumb.jpg" alt="Birthday cake" className="w-full h-full object-cover" />
                            </motion.div>

                            {/* Carousel indicators */}
                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3">
                                {celebrationImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`transition-all duration-300 ${index === currentImage
                                            ? 'w-10 h-3 bg-[#FF6B35] rounded-full shadow-lg shadow-[#FF6B35]/50'
                                            : 'w-3 h-3 bg-white/80 hover:bg-white rounded-full'
                                            }`}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/80">

                            {/* Overline/Hashtags */}
                            <div className="birthday-tagline flex flex-wrap gap-2 mb-4">
                                <span className="text-sm font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-4 py-2 rounded-full">
                                    #BirthdayMagic
                                </span>
                                <span className="text-sm font-medium text-[#0066CC] bg-[#0066CC]/10 px-4 py-2 rounded-full">
                                    #PartyTime
                                </span>
                                <span className="text-sm font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-4 py-2 rounded-full">
                                    #KidsCelebration
                                </span>
                            </div>

                            {/* Main Title */}
                            <h2 className="birthday-title text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                                <span className="block text-[#0066CC]">Birthday</span>
                                <span className="block text-[#FF6B35]">Celebrations</span>
                            </h2>

                            {/* Description */}
                            <p className="birthday-description text-lg md:text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
                                A magical venue where every birthday becomes an unforgettable adventure.
                                From themed decorations to exciting activities, we create joy-filled
                                moments for kids and adults alike.
                            </p>

                            {/* Features Grid */}
                            <div className="birthday-features grid grid-cols-2 gap-4 mb-10">
                                <div className="flex items-center gap-3 bg-gradient-to-br from-orange-50 to-white rounded-xl p-3 shadow-sm border border-orange-100">
                                    <span className="text-2xl">🎈</span>
                                    <span className="font-medium text-gray-700">Balloon Decor</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 shadow-sm border border-blue-100">
                                    <span className="text-2xl">🎂</span>
                                    <span className="font-medium text-gray-700">Cake Table</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gradient-to-br from-orange-50 to-white rounded-xl p-3 shadow-sm border border-orange-100">
                                    <span className="text-2xl">🏰</span>
                                    <span className="font-medium text-gray-700">Bouncy Castle</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 shadow-sm border border-blue-100">
                                    <span className="text-2xl">🎮</span>
                                    <span className="font-medium text-gray-700">Games Zone</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gradient-to-br from-orange-50 to-white rounded-xl p-3 shadow-sm border border-orange-100">
                                    <span className="text-2xl">🍕</span>
                                    <span className="font-medium text-gray-700">Party Food</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 shadow-sm border border-blue-100">
                                    <span className="text-2xl">🎁</span>
                                    <span className="font-medium text-gray-700">Goodie Bags</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="birthday-buttons flex flex-col sm:flex-row gap-4">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8655] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                    Book Your Party
                                    <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                                </button>
                                <button className="px-8 py-4 bg-white hover:bg-gray-50 text-[#0066CC] font-bold text-lg rounded-full border-2 border-[#0066CC] transition-all duration-300 shadow-lg hover:shadow-xl">
                                    View Packages
                                </button>
                            </div>

                            {/* Trust badge */}
                            <div className="mt-8 flex items-center gap-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    500+ Parties Hosted
                                </span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    4.9 ★ Rating
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BirthdayShowcase;