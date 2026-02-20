"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottieIconProps {
    src: string;
    alt?: string;
    className?: string;
}

const LottieIcon: React.FC<LottieIconProps> = ({ src, alt = "icon", className }) => {
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

    if (!animationData) {
        return <div className={className} aria-label={alt} />; // Placeholder or loading state
    }

    return (
        <div className={className} aria-label={alt}>
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
};

export default LottieIcon;
