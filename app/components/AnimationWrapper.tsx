'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface AnimationWrapperProps {
    sectionRef: React.RefObject<HTMLElement>;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ sectionRef }) => {
    useGSAP(() => {
        if (!sectionRef.current) return;

        // Gentle floating animation for background blobs
        // Targeting the blurred background elements
        const blobs = sectionRef.current.querySelectorAll('.blur-3xl');

        if (blobs.length > 0) {
            gsap.to(blobs, {
                x: 'random(-20, 20)',
                y: 'random(-20, 20)',
                rotation: 'random(-10, 10)',
                duration: 'random(10, 20)',
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 2,
            });
        }

    }, { scope: sectionRef });

    return null;
};

export default AnimationWrapper;
