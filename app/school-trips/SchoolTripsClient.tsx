"use client";

import SchoolTripsHero from "../components/school-trips/SchoolTripsHero";
import WhyChooseUs from "../components/school-trips/WhyChooseUs";
import WhatsIncluded from "../components/school-trips/WhatsIncluded";
import EducationalBenefits from "../components/school-trips/EducationalBenefits";
import VideoGallery from "../components/school-trips/VideoGallery";
import Schooltestimonialssection from "../components/school-trips/Schooltestimonialssection";
import SchoolFAQ from "../components/school-trips/SchoolFAQ";
// import SchoolCTA from "@/components/school-trips/SchoolCTA";

export default function SchoolTripsClient() {
    return (
        <>
            <SchoolTripsHero />
            <WhyChooseUs />
            <WhatsIncluded />
            <EducationalBenefits />
            <VideoGallery />
            <Schooltestimonialssection />
            <SchoolFAQ />
            {/* 
            
            <SchoolCTA /> */}
        </>
    );
}