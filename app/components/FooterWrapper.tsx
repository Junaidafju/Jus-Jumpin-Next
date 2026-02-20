'use client';

import { Suspense } from 'react';
import Footer from './Footer';

const FooterWrapper = () => {
    return (
        <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" />}>
            <Footer />
        </Suspense>
    );
};

export default FooterWrapper;