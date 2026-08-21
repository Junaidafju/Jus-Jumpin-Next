"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottieIconProps {
    src: string;
    alt?: string;
    className?: string;
    fallbackSrc?: string;
}

const LottieIcon: React.FC<LottieIconProps> = ({ src, alt = "icon", className, fallbackSrc }) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        const fetchAnimation = async () => {
            try {
                const response = await fetch(src);
                if (response.ok) {
                    const data = await response.json();
                    setAnimationData(data);
                } else {
                    console.error(`Failed to load Lottie animation from ${src}`);
                }
            } catch (error) {
                console.error(`Error loading Lottie animation from ${src}:`, error);
            }
        };

        fetchAnimation();
    }, [src]);

    const isValidLottie = animationData && typeof animationData === "object" && !Array.isArray(animationData) && Array.isArray(animationData.layers);

    if (!isValidLottie) {
        if (animationData) {
            console.error(`Invalid Lottie animation data from ${src}. Missing 'layers' property.`);
            if (fallbackSrc) {
                return (
                    <div className={className} aria-label={alt}>
                        <img src={fallbackSrc} alt={alt} className="w-full h-full object-cover" />
                    </div>
                );
            }
        }
        return <div className={className} aria-label={alt} />; // Placeholder or loading state
    }

    return (
        <div className={className} aria-label={alt}>
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
};

export default LottieIcon;
