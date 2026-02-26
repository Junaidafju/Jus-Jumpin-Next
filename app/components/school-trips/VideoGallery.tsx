"use client";

import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

const videos = [
    {
        id: "kpGvSi05UXY",
        title: "Students jumping and exploring activities at Jus Jumpin",
    },
    {
        id: "z876WIsNd9Y",
        title: "School trip highlights and active play moments",
    },
    {
        id: "X0cpODhIfTY",
        title: "Children enjoying educational adventure activities",
    },
    {
        id: "UWt2J4e94p8",
        title: "Group school visit with joyful learning experiences",
    },
    {
        id: "eFyYeGLfDow",
        title: "Real school moments at Jus Jumpin video short",
    },
];

const bgIcons = ["🎓", "🧪", "📚", "⭐", "🧠", "🧩"];

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

const gridVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

function VideoCard({ id, title, index }: { id: string; title: string; index: number }) {
    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="group relative"
            aria-label={`Video card ${index + 1}`}
        >
            <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-md transition-shadow duration-300 md:group-hover:shadow-lg md:group-hover:shadow-sky-100/70 md:group-hover:border-sky-200">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 bg-gradient-to-t from-sky-500/10 to-transparent" />

                <div className="relative aspect-[9/16] w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        title={title}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full"
                    />
                </div>

                <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 p-2 text-sky-600 shadow-sm">
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                </div>
            </div>
        </motion.article>
    );
}

export default function VideoGallery() {
    return (
        <section
            aria-label="School trip video gallery"
            className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0f7ff_40%,#ffffff_100%)] px-4 py-14 sm:px-6 sm:py-16 md:py-20"
        >
            <div className="pointer-events-none absolute inset-0">
                {bgIcons.map((icon, index) => (
                    <motion.span
                        key={icon + index}
                        className="absolute text-2xl sm:text-3xl"
                        style={{
                            left: `${8 + (index % 3) * 33}%`,
                            top: `${10 + Math.floor(index / 3) * 44}%`,
                            opacity: 0.05,
                        }}
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 7 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3,
                        }}
                        aria-hidden="true"
                    >
                        {icon}
                    </motion.span>
                ))}
            </div>

            <div className="relative mx-auto max-w-7xl">
                <motion.header
                    className="mx-auto max-w-3xl text-center"
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Real School Moments
                    </div>

                    <h2 className="font-['Fredoka_One'] text-4xl text-[#172B44] sm:text-5xl">
                        School Trip{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                            Highlights
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
                        Watch how students experience joy, adventure, and active learning at Jus Jumpin.
                    </p>
                </motion.header>

                <motion.div
                    className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {videos.map((video, index) => (
                        <VideoCard key={video.id} {...video} index={index} />
                    ))}
                </motion.div>

                <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45 }}
                >
                    <motion.button
                        type="button"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-7 py-3 font-bold text-white shadow-md transition-shadow duration-200 hover:shadow-sky-200"
                        aria-label="Plan your school visit"
                    >
                        Plan Your School Visit
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}