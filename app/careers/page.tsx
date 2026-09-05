// app/careers/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Star, Target, Compass, Award, Users,
  Briefcase, Send, ChevronRight, CheckCircle2,
  X, Phone, Mail, MapPin, FileText, Upload, ArrowDown
} from "lucide-react";
import confetti from "canvas-confetti";

// Job type definitions
interface Job {
  title: string;
  desc: string;
  skills: string[];
}

export default function CareersPage() {
  // Department Tab State
  const [activeDept, setActiveDept] = useState<"marketing" | "operations" | "surveillance" | "talent">("marketing");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isInternship, setIsInternship] = useState(false);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [formType, setFormType] = useState<"modal" | "general">("modal");

  // Form Submission Status
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Job Openings Database
  const marketingJobs: Job[] = [
    { title: "Digital Marketing Executive", desc: "Drive our digital presence to new heights. Manage campaigns, optimize SEO, and create engaging online content.", skills: ["SEO", "Google Ads", "Analytics", "Content Strategy"] },
    { title: "Social Media Manager", desc: "Own our social voice and grow our community. Plan content, engage audiences, and build brand love across platforms.", skills: ["Instagram", "Reels Strategy", "Content Planning"] },
    { title: "Graphics Designer", desc: "Bring ideas to life visually. Design creatives, campaigns, and marketing materials that captivate and convert.", skills: ["Photoshop", "Illustrator", "Branding"] },
    { title: "Motion Graphics Designer", desc: "Create dynamic visuals and animations that capture attention and bring our brand story to life on every screen.", skills: ["After Effects", "Animation", "Video Editing"] },
    { title: "Videographer", desc: "Shoot, edit, and tell compelling stories through video. Capture the magic of Jus Jumpin for the world to see.", skills: ["Cinematography", "Editing", "Storytelling"] },
  ];

  const operationsJobs: Job[] = [
    { title: "Accounts & Finance", desc: "Oversee financial operations, ensure compliance, and support business decision-making.", skills: ["Leadership", "Finance", "Accounts"] },
    { title: "Store Manager", desc: "Oversee daily operations, manage staff, ensure customer satisfaction, and drive sales performance.", skills: ["Leadership", "Operations", "Customer Service"] },
    { title: "Security Guards", desc: "Ensure safety of all visitors, monitor premises, and maintain security protocols at all times.", skills: ["Security", "Vigilance", "Safety Protocols"] },
    { title: "Cash Counter Manager", desc: "Manage cash transactions, handle billing, and maintain accurate financial records with precision.", skills: ["Cash Handling", "Billing", "Finance"] },
    { title: "Play Area Attendant", desc: "Supervise play areas, ensure child safety, and assist visitors with activities for a magical experience.", skills: ["Child Safety", "Supervision", "Guest Service"] },
    { title: "Vendor Manager", desc: "Manage vendor relationships, negotiate contracts, and ensure supply chain efficiency for smooth operations.", skills: ["Procurement", "Negotiation", "Supply Chain"] },
    { title: "MIS Executive", desc: "Manage data systems, generate reports, and maintain information databases that power smart decisions.", skills: ["Data Management", "Excel", "Reporting"] },
    { title: "Learning & Development Specialist", desc: "We are looking for a dynamic Learning & Development Specialist who will play a key role in designing, delivering, and enhancing training initiatives across the organization.", skills: ["Learning & Development", "Training", "Team Coaching"] },
    { title: "Back Office Executive", desc: "Handle administrative tasks, data entry, and support office operations to keep everything running smoothly.", skills: ["Administration", "Data Entry", "MS Office"] },
    { title: "Admin Executive", desc: "Manage office operations, coordinate events, and handle administrative duties with efficiency and flair.", skills: ["Office Management", "Coordination", "Communication"] },
  ];

  const surveillanceJobs: Job[] = [
    { title: "CCTV Surveillance Operator", desc: "Monitor CCTV cameras, identify security threats, maintain surveillance logs, and ensure a secure environment for all guests.", skills: ["CCTV Monitoring", "Security Systems", "Vigilance"] },
  ];

  const talentJobs: Job[] = [
    { title: "Human Resource Manager", desc: "Manage recruitment, employee relations, performance management, and HR policies that keep our team thriving and growing.", skills: ["Recruitment", "Employee Relations", "HR Policies"] },
  ];

  // Open Modal Handler
  const handleOpenModal = (roleTitle: string, isIntern = false) => {
    setSelectedRole(roleTitle);
    setIsInternship(isIntern);
    setFormType("modal");
    clearForm();
    setIsModalOpen(true);
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitStatus("idle");
  };

  // Clear Inputs
  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setExperience("");
    setMessage("");
    setFileName("");
    setErrorMsg("");
  };

  // File Upload Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  // Validate form
  const validateForm = () => {
    if (!fullName || !email || !phone || !experience) {
      setErrorMsg("Please fill out all required fields.");
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    if (phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  // Action: Submit via Email (Simulated dynamic mailing flow)
  const handleEmailSubmit = async (e: React.FormEvent, type: "modal" | "general") => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) return;

    setSubmitStatus("loading");

    try {
      // Simulate serverless function execution
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      triggerConfetti();
    } catch (err) {
      setErrorMsg("Failed to submit. Please try again or email us at hiring@jusjumpin.com");
      setSubmitStatus("error");
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="bg-black text-slate-100 min-h-screen font-sans overflow-x-hidden">

      {/* ═════════ 1. HERO SECTION ═════════ */}
      <section className="relative min-h-[85vh] md:min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 flex items-center justify-center border-b border-zinc-900 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center select-none pointer-events-none opacity-70"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/cartoon-3d-trampoline-jumping-illustration_76599-20764.jpg')" }}
        />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] select-none pointer-events-none opacity-20" />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black pointer-events-none" />

        {/* Floating shape accents */}
        <div className="absolute inset-0 select-none pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-3xl animate-bounce duration-1000">⭐</div>
          <div className="absolute top-1/4 right-20 text-3xl animate-pulse">🎉</div>
          <div className="absolute bottom-20 left-1/4 text-4xl animate-bounce duration-700">🚀</div>
          <div className="absolute top-2/3 left-10 text-3xl animate-spin duration-1000">✨</div>
          <div className="absolute bottom-10 right-1/4 text-3xl animate-bounce">🎈</div>
          <div className="absolute top-20 right-1/3 text-3xl">🏆</div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Careers at Jus Jumpin
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Join Our <span className="bg-gradient-to-r from-pink-400 via-rose-500 to-orange-400 bg-clip-text text-transparent">Amazing Team</span> 🚀
          </h1>

          <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
            Be part of a fast-moving, creative environment where you learn, grow, and make a massive impact from day one.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="#jj-roles"
              className="inline-flex items-center gap-2 bg-white hover:bg-white/95 text-black font-extrabold px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_4px_30px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              Explore Openings <ArrowDown size={16} className="stroke-[3]" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t border-zinc-900 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-white mb-1">500+</div>
              <div className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-wider">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-pink-400 mb-1">9+</div>
              <div className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-wider">Years of Fun</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-orange-400 mb-1">15</div>
              <div className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-wider">Open Roles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-emerald-400 mb-1">∞</div>
              <div className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-wider">Good Vibes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ 2. WHY JOIN US ═════════ */}
      <section className="py-20 border-b border-zinc-900 bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c612a127919515.5636cc305faee.gif"
                  alt="Kids having fun at Jus Jumpin"
                  className="w-full h-full object-cover"
                />

                {/* Embedded Badge overlay */}
                <div className="absolute bottom-5 left-5 p-4 bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-xl rounded-2xl flex items-center gap-3 shadow-2xl">
                  <span className="text-2xl">🏅</span>
                  <div>
                    <div className="text-base font-black text-white">500+</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Happy Team</div>
                  </div>
                </div>

                <div className="absolute top-5 right-5 bg-pink-500 text-white text-[10px] md:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                  🎉 Best Place to Work!
                </div>
              </div>
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-orange-400">
                <Star size={12} fill="currentColor" /> Why Join Us
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Why Work at <span className="bg-gradient-to-r from-pink-400 via-rose-500 to-orange-400 bg-clip-text text-transparent">Jus Jumpin?</span>
              </h2>

              <div className="grid grid-cols-1 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-xl shrink-0">💥</div>
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1">Work That Feels Like Play</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Be part of an environment filled with energy, creativity, and excitement every single day.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl shrink-0">🚀</div>
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1">Growth Opportunities</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Learn, grow, and level up your career with real hands-on experience that truly matters.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl shrink-0">🤝</div>
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1">Supportive Team Culture</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Work with a passionate team that values collaboration, innovation, and each other.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl shrink-0">🎯</div>
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1">Make an Impact</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Create unforgettable experiences for thousands of families and kids across the city.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════ 3. PERKS GRID ═════════ */}
      <section className="py-20 bg-zinc-950/40 border-b border-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between group hover:-translate-y-1">
              <span className="text-3xl mb-4 block">🎉</span>
              <h3 className="text-base font-black text-white mb-2">Fun Work Culture</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Every day feels like a celebration — energy, laughter, and good vibes all around.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between group hover:-translate-y-1">
              <span className="text-3xl mb-4 block">🚀</span>
              <h3 className="text-base font-black text-white mb-2">Fast Career Growth</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Move fast, learn faster. Real responsibilities from day one fuel your career growth.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between group hover:-translate-y-1">
              <span className="text-3xl mb-4 block">🎨</span>
              <h3 className="text-base font-black text-white mb-2">Creative Freedom</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Bring your boldest ideas to the table — creativity is always welcomed and supported.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between group hover:-translate-y-1">
              <span className="text-3xl mb-4 block">🤝</span>
              <h3 className="text-base font-black text-white mb-2">Supportive Team</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">A team that lifts you up, backs your design ideas, and celebrates every win together.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between group hover:-translate-y-1">
              <span className="text-3xl mb-4 block">💼</span>
              <h3 className="text-base font-black text-white mb-2">Real Responsibilities</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">No busywork. You will own actual key projects with real impact on our on-ground parks.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between group hover:-translate-y-1">
              <span className="text-3xl mb-4 block">🏆</span>
              <h3 className="text-base font-black text-white mb-2">Recognition & Rewards</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Great work never goes unnoticed — your efforts are valued, appreciated, and rewarded.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ 4. OPEN ROLES ═════════ */}
      <section className="py-20 border-b border-zinc-900" id="jj-roles">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-pink-400">
              <Target size={12} /> Open Positions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4">
              Explore Opportunities 🚀
            </h2>
            <p className="text-zinc-400 text-sm font-semibold">
              Find your perfect role in our fun, energetic, and highly dynamic environment
            </p>
          </div>

          {/* Department Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { id: "marketing", label: "Marketing", emoji: "🎨", count: 5 },
              { id: "operations", label: "Operations", emoji: "🏪", count: 10 },
              { id: "surveillance", label: "Surveillance", emoji: "📹", count: 1 },
              { id: "talent", label: "Talent / HR", emoji: "👥", count: 1 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDept(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${activeDept === tab.id
                  ? "bg-white text-black border-white"
                  : "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                  }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-black ${activeDept === tab.id ? "bg-black text-white" : "bg-zinc-800 text-zinc-400"
                  }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Jobs Listing Container */}
          <div className="space-y-8">
            {/* Tab Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 h-48 flex items-center">
              {/* Banner background gifs/pics */}
              {activeDept === "marketing" && (
                <img
                  src="https://cdn.dribbble.com/userupload/42012439/file/original-c2ab69f018094baa7d6aede55b288245.gif"
                  alt="Marketing banner animation"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 select-none pointer-events-none"
                />
              )}
              {activeDept === "operations" && (
                <img
                  src="https://cdn.dribbble.com/userupload/41805026/file/original-aa6753751db19425872eaa9688b9c9b8.gif"
                  alt="Operations banner animation"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 select-none pointer-events-none"
                />
              )}
              {activeDept === "surveillance" && (
                <img
                  src="https://www.asisonline.org/globalassets/security-management/latest-news/web-exclusives/2022/0622-gates-after-a-cyber-defense-breach.gif"
                  alt="Surveillance banner animation"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 select-none pointer-events-none" />
              )}
              {activeDept === "talent" && (
                <img
                  src="https://cdn.dribbble.com/userupload/22304736/file/original-6dbedc6556eb45ee9213fa5bfabca078.gif"
                  alt="Talent Acquisition banner animation"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 select-none pointer-events-none"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="relative px-8 md:px-12 py-6">
                <span className="bg-pink-500/20 text-pink-400 border border-pink-500/30 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-2 inline-block">
                  {activeDept === "marketing" && "5 Openings"}
                  {activeDept === "operations" && "10 Openings"}
                  {activeDept === "surveillance" && "1 Opening"}
                  {activeDept === "talent" && "1 Opening"}
                </span>
                <h3 className="text-xl md:text-3xl font-black text-white">
                  {activeDept === "marketing" && "Marketing Department"}
                  {activeDept === "operations" && "Operations Department"}
                  {activeDept === "surveillance" && "Surveillance Department"}
                  {activeDept === "talent" && "Talent Acquisition"}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm font-semibold mt-1 max-w-sm leading-relaxed">
                  {activeDept === "marketing" && "Shape how families and play-lovers across India discover and connect with Jus Jumpin."}
                  {activeDept === "operations" && "Be the backbone of our active play structures and operational on-ground customer experiences."}
                  {activeDept === "surveillance" && "Review feeds, enforce park safety codes, and monitor operations for secure jumping."}
                  {activeDept === "talent" && "Recruit high-energy talent, shape policies, and build the dream crew at Jus Jumpin."}
                </p>
              </div>
            </div>

            {/* Jobs Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDept === "marketing" && marketingJobs.map((job) => (
                <div key={job.title} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between hover:border-pink-500/30 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-400 text-[9px] font-black tracking-wider uppercase border border-pink-500/20">Marketing</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Full Time</span>
                    </div>
                    <h4 className="text-lg font-black text-white leading-snug">{job.title}</h4>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
                      <MapPin size={13} /> <span>Jus Jumpin, Newtown</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">{job.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold">{skill}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleOpenModal(job.title)}
                      className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white font-extrabold text-white text-xs py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      🚀 Apply Now
                    </button>
                  </div>
                </div>
              ))}

              {activeDept === "operations" && operationsJobs.map((job) => (
                <div key={job.title} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between hover:border-orange-500/30 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[9px] font-black tracking-wider uppercase border border-orange-500/20">Operations</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Full Time</span>
                    </div>
                    <h4 className="text-lg font-black text-white leading-snug">{job.title}</h4>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
                      <MapPin size={13} /> <span>Jus Jumpin, Newtown</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">{job.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold">{skill}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleOpenModal(job.title)}
                      className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white font-extrabold text-white text-xs py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      🚀 Apply Now
                    </button>
                  </div>
                </div>
              ))}

              {activeDept === "surveillance" && surveillanceJobs.map((job) => (
                <div key={job.title} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between hover:border-emerald-500/30 transition-colors mx-auto w-full max-w-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[9px] font-black tracking-wider uppercase border border-emerald-500/20">Surveillance</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Full Time</span>
                    </div>
                    <h4 className="text-lg font-black text-white leading-snug">{job.title}</h4>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
                      <MapPin size={13} /> <span>Jus Jumpin, Newtown</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">{job.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold">{skill}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleOpenModal(job.title)}
                      className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white font-extrabold text-white text-xs py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      🚀 Apply Now
                    </button>
                  </div>
                </div>
              ))}

              {activeDept === "talent" && talentJobs.map((job) => (
                <div key={job.title} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between hover:border-violet-500/30 transition-colors mx-auto w-full max-w-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 text-[9px] font-black tracking-wider uppercase border border-violet-500/20">Talent</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Full Time</span>
                    </div>
                    <h4 className="text-lg font-black text-white leading-snug">{job.title}</h4>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
                      <MapPin size={13} /> <span>Jus Jumpin, Newtown</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">{job.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold">{skill}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleOpenModal(job.title)}
                      className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white font-extrabold text-white text-xs py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      🚀 Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═════════ 5. INTERNSHIPS ═════════ */}
      <section className="relative py-24 bg-zinc-950 overflow-hidden border-b border-zinc-900" id="jj-internship">
        {/* Glow dots backgrounds */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Description Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
                ✨ Internship Program
              </span>

              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Kickstart Your Career with <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Jus Jumpin 🚀</span>
              </h2>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-semibold">
                Step into a world where creativity meets real-world experience. At Jus Jumpin, internships aren't about fetching coffee — they are about building actual skills, creating impact, and growing faster than you ever imagined.
              </p>

              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Whether you're passionate about marketing, graphic design, social media strategy, video editing, or operations — this is your chance to work on live campaigns, collaborate with a high-energy team, and get hands-on exposure.
              </p>

              <div className="pt-4 space-y-3">
                <p className="text-white text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  🔥 Available Internship Domains
                </p>
                <div className="flex flex-wrap gap-2">
                  {["🎨 Graphic Design", "📱 Social Media", "🎥 Video Editing", "📈 Digital Marketing", "🧑‍💼 Operations", "💻 Content Writing"].map((domain) => (
                    <span key={domain} className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold">{domain}</span>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => handleOpenModal("General Internship", true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-purple-500/20"
                >
                  Apply for Internship →
                </button>

                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider max-w-xs leading-snug">
                  ⚡ Limited slots available — Immediate onboarding for selected candidates
                </span>
              </div>
            </div>

            {/* Right Perks Grid Side */}
            <div className="lg:col-span-5 relative">
              <span className="absolute -top-3 -left-3 bg-pink-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-lg z-10">
                🔥 Now Open!
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xl mb-1 block">🎨</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Hands-on Experience</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">Work on live marketing campaigns and actual brand designs.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xl mb-1 block">📈</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Learn & Grow Fast</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">Get direct mentorship from seasoned industry professionals.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xl mb-1 block">🎥</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Creative Exposure</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">Be part of video shoots, social campaigns, and brainstorming.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xl mb-1 block">🤝</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Collaborative Team</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">Collaborate with a young team that values out-of-the-box ideas.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════ 6. GENERAL APPLICATION FORM ═════════ */}
      <section className="py-20 bg-black" id="jj-apply">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Info / Gif Side */}
            <div className="lg:col-span-5 relative flex flex-col justify-between">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  🎯 We're Hiring!
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Drop Your CV Anytime 📄
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed font-semibold">
                  No matching opening right now? Send us your profile anyway and we will reach out as soon as the perfect opportunity arises!
                </p>
              </div>

              {/* Decorative Gif Area */}
              <div className="relative mt-8 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[4/3] shadow-xl flex items-end">
                <img
                  src="https://www.jusjumpin.com/wp-content/uploads/2026/03/nLZui9BGjq.gif"
                  alt="Join the Jus Jumpin team animation"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative p-6">
                  <span className="text-xs text-orange-400 font-black uppercase tracking-wider mb-1 block">🚀 Grow With Us</span>
                  <h4 className="text-base font-extrabold text-white">We'd love to hear from you!</h4>
                </div>
              </div>
            </div>

            {/* Right Form Side */}
            <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 md:p-8 relative">
              <div className="absolute top-0 right-10 -translate-y-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

              <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider">General Profile Submission</h3>

              {submitStatus === "success" && formType === "general" ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-base font-extrabold text-white">Application Received!</h4>
                  <p className="text-zinc-400 text-xs max-w-sm mx-auto font-semibold leading-relaxed">
                    Thank you for applying. We've received your general submission and will reach out if a matching role opens up!
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold text-white rounded-lg hover:bg-zinc-800"
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => handleEmailSubmit(e, "general")} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        Full Name <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        Phone <span className="text-pink-500">*</span>
                      </label>
                      <div className="flex bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-pink-500">
                        <span className="px-3 bg-zinc-900 border-r border-zinc-800 text-xs text-zinc-400 flex items-center">🇮🇳 +91</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          required
                          className="w-full bg-transparent px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        Email <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        Experience <span className="text-pink-500">*</span>
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500 h-10 cursor-pointer"
                      >
                        <option value="">Select experience</option>
                        <option value="fresher">🎓 Fresher (0–1 years)</option>
                        <option value="experienced">💼 Experienced (1+ years)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      Attach CV / Resume <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative border border-dashed border-zinc-800 bg-zinc-900/30 rounded-xl p-6 text-center hover:border-pink-500/50 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="text-2xl mb-1.5 block">📄</span>
                      <p className="text-xs text-zinc-300 font-bold">{fileName || "Drag & drop your CV or browse files"}</p>
                      <small className="text-[10px] text-zinc-500 mt-1 block">PDF, DOC, DOCX · Max 5MB</small>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      Tell Us About Yourself
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Why would you be a great fit at Jus Jumpin? Share your passion! 🎯"
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {errorMsg && formType === "general" && (
                    <p className="text-xs text-rose-400 pl-1 font-bold">{errorMsg}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      onClick={() => setFormType("general")}
                      className="w-full bg-white hover:bg-white/95 text-black font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Send size={12} />
                      <span>Send via Email</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ═════════ 7. APPLY MODAL ═════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Decorative line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

              {/* Close Icon */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all z-20 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div data-lenis-prevent="true" className="p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar overscroll-contain">

                {/* Header */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-xl shrink-0">🚀</div>
                  <div>
                    <h2 className="text-lg md:text-xl font-black text-white leading-tight">Apply for This Role</h2>
                    <span className="text-xs text-pink-400 font-bold bg-pink-500/5 border border-pink-500/10 px-2.5 py-0.5 rounded mt-1.5 inline-block">
                      {isInternship ? `Internship: ${selectedRole}` : selectedRole}
                    </span>
                  </div>
                </div>

                {submitStatus === "success" && formType === "modal" ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="text-base font-extrabold text-white">Application Sent!</h4>
                    <p className="text-zinc-400 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
                      Thank you for your application. Our team will review your profile and get in touch with you within 5–7 working days if there is a match.
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 bg-white hover:bg-white/95 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleEmailSubmit(e, "modal")} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Full Name *</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Location / City *</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Kolkata, Newtown"
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Phone Number *</label>
                        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-pink-500">
                          <span className="px-3 bg-zinc-900 border-r border-zinc-800 text-xs text-zinc-400 flex items-center">🇮🇳 +91</span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9876543210"
                            required
                            className="w-full bg-transparent px-4.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Experience Level *</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500 h-10 cursor-pointer"
                      >
                        <option value="">Select experience level</option>
                        <option value="fresher">🎓 Fresher (0–1 years)</option>
                        <option value="experienced">💼 Experienced (1+ years)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Attach CV / Resume</label>
                      <div className="relative border border-dashed border-zinc-800 bg-zinc-900/30 rounded-xl p-5 text-center hover:border-pink-500/50 transition-colors">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-xl mb-1 block">📄</span>
                        <p className="text-xs text-zinc-300 font-bold">{fileName || "Drag & drop your CV or browse files"}</p>
                        <small className="text-[9px] text-zinc-500 mt-1 block">PDF, DOC, DOCX · Max 5MB</small>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Why Should We Hire You?</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        placeholder="Tell us what makes you a great fit for Jus Jumpin! 🎯"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    {errorMsg && formType === "modal" && (
                      <p className="text-xs text-rose-400 pl-1 font-bold">{errorMsg}</p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        onClick={() => setFormType("modal")}
                        className="w-full bg-white hover:bg-white/95 text-black font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                      >
                        <Send size={12} />
                        <span>Submit Application</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
