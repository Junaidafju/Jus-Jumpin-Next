"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
interface BirthdayBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    parentName: string;
    email: string;
    phone: string;
    childName: string;
    childAge: string;
    partyDate: string;
    partyTime: string;
    guestCount: string;
    package: string;
    message: string;
}

const INITIAL: FormData = {
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    partyDate: "",
    partyTime: "",
    guestCount: "",
    package: "",
    message: "",
};

const PACKAGES = [
    { id: "mini", label: "Mini Party 🎈", desc: "Up to 15 kids · 2 hrs", price: "₹4,999" },
    { id: "classic", label: "Classic Party 🎉", desc: "Up to 30 kids · 3 hrs", price: "₹7,999" },
    { id: "mega", label: "Mega Party 🚀", desc: "Up to 50 kids · 4 hrs", price: "₹12,999" },
    { id: "royal", label: "Royal Party 👑", desc: "Unlimited · Full day", price: "₹19,999" },
];

const TIME_SLOTS = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

/* ─────────────────────────────────────────
   CSS
   ───────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap');

/* ── backdrop ── */
.bbm-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 20, 40, 0.72);
  backdrop-filter: blur(6px);
  z-index: 99990;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.32s ease, visibility 0.32s ease;
}
.bbm-backdrop.open {
  opacity: 1;
  visibility: visible;
}

/* ── modal shell ── */
.bbm-modal {
  position: relative;
  width: 100%;
  max-width: 660px;
  max-height: 92vh;
  background: #e7f4ff;
  border: 4px solid #1b3a5c;
  border-radius: 28px;
  box-shadow: 10px 10px 0 #1b3a5c, 0 30px 80px rgba(10,20,40,0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.88) translateY(30px);
  transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: 'Nunito', sans-serif;
}
.bbm-backdrop.open .bbm-modal {
  transform: scale(1) translateY(0);
}

/* confetti strip top */
.bbm-confetti-strip {
  height: 10px;
  background: repeating-linear-gradient(
    90deg,
    #FE5000 0px, #FE5000 24px,
    #3080c0 24px, #3080c0 48px,
    #f0a500 48px, #f0a500 72px,
    #2eb85c 72px, #2eb85c 96px,
    #e040b0 96px, #e040b0 120px
  );
  flex-shrink: 0;
}

/* ── header ── */
.bbm-header {
  background: #1b3a5c;
  padding: 20px 24px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.bbm-header-left { display: flex; flex-direction: column; gap: 4px; }
.bbm-header-tag {
  font-family: 'Fredoka One', cursive;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 2.5px;
  text-transform: uppercase;
}
.bbm-header-title {
  font-family: 'Fredoka One', cursive;
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  color: #fff;
  line-height: 1.1;
  letter-spacing: 0.3px;
}
.bbm-header-title span { color: #f0a500; }

.bbm-close {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2.5px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s;
  flex-shrink: 0;
  line-height: 1;
}
.bbm-close:hover {
  background: #FE5000;
  border-color: #FE5000;
  transform: rotate(90deg) scale(1.1);
}

/* ── step tabs ── */
.bbm-steps {
  display: flex;
  background: #d4ecff;
  border-bottom: 3px solid #b4d4f0;
  flex-shrink: 0;
}
.bbm-step-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 13px 8px;
  font-family: 'Fredoka One', cursive;
  font-size: 0.82rem;
  color: #7aaccf;
  letter-spacing: 0.3px;
  border: none;
  background: transparent;
  cursor: default;
  position: relative;
  transition: color 0.2s ease;
}
.bbm-step-tab.done { color: #2eb85c; cursor: pointer; }
.bbm-step-tab.active { color: #1b3a5c; }
.bbm-step-tab.active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0; right: 0;
  height: 3px;
  background: #FE5000;
  border-radius: 2px 2px 0 0;
}
.bbm-step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: currentColor;
  color: #fff;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'Fredoka One', cursive;
  transition: background 0.2s;
}
.bbm-step-tab.done .bbm-step-num  { background: #2eb85c; color: #fff; }
.bbm-step-tab.active .bbm-step-num { background: #FE5000; color: #fff; }

/* ── scrollable body ── */
.bbm-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding: 24px;
  scrollbar-width: thin;
  scrollbar-color: #b4d4f0 transparent;
}
.bbm-body::-webkit-scrollbar { width: 5px; }
.bbm-body::-webkit-scrollbar-thumb { background: #b4d4f0; border-radius: 10px; }

/* step panels */
.bbm-panel {
  display: none;
  flex-direction: column;
  gap: 18px;
  animation: bbm-slide-in 0.32s cubic-bezier(0.34,1.2,0.64,1);
}
.bbm-panel.active { display: flex; }
@keyframes bbm-slide-in {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── section label ── */
.bbm-section-label {
  font-family: 'Fredoka One', cursive;
  font-size: 0.78rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #5a80a0;
  margin-bottom: -8px;
}

/* ── field row / col ── */
.bbm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.bbm-row.triple { grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 520px) {
  .bbm-row { grid-template-columns: 1fr; }
  .bbm-row.triple { grid-template-columns: 1fr 1fr; }
}

/* ── field ── */
.bbm-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.bbm-label {
  font-family: 'Fredoka One', cursive;
  font-size: 0.88rem;
  color: #1b3a5c;
  letter-spacing: 0.2px;
}
.bbm-label .req { color: #FE5000; margin-left: 2px; }

.bbm-input,
.bbm-select,
.bbm-textarea {
  width: 100%;
  padding: 11px 16px;
  background: #fff;
  border: 2.5px solid #b4d4f0;
  border-radius: 14px;
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1b3a5c;
  outline: none;
  box-shadow: 3px 3px 0 #b4d4f0;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  -webkit-appearance: none;
  appearance: none;
}
.bbm-input:focus,
.bbm-select:focus,
.bbm-textarea:focus {
  border-color: #3080c0;
  box-shadow: 3px 3px 0 #3080c0, 0 0 0 4px rgba(48,128,192,0.10);
  transform: translateY(-1px);
}
.bbm-input::placeholder { color: #a0bcd0; font-weight: 600; }
.bbm-input.error,
.bbm-select.error {
  border-color: #FE5000;
  box-shadow: 3px 3px 0 #FE5000;
}
.bbm-error-msg {
  font-size: 0.74rem;
  color: #FE5000;
  font-weight: 700;
  margin-top: -2px;
}

.bbm-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231b3a5c' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 38px;
  cursor: pointer;
}
.bbm-select option { font-weight: 700; }

.bbm-textarea {
  resize: vertical;
  min-height: 90px;
  line-height: 1.5;
}

/* ── package cards ── */
.bbm-packages {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 520px) { .bbm-packages { grid-template-columns: 1fr; } }

.bbm-pkg {
  position: relative;
  border: 3px solid #b4d4f0;
  border-radius: 18px;
  padding: 14px 16px;
  background: #fff;
  cursor: pointer;
  box-shadow: 4px 4px 0 #b4d4f0;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.bbm-pkg:hover {
  border-color: #3080c0;
  box-shadow: 4px 4px 0 #3080c0;
  transform: translateY(-3px);
}
.bbm-pkg.selected {
  border-color: #FE5000;
  box-shadow: 4px 4px 0 #FE5000, 0 0 0 3px rgba(254,80,0,0.12);
  transform: translateY(-4px);
  background: #fff9f7;
}
.bbm-pkg-label {
  font-family: 'Fredoka One', cursive;
  font-size: 1rem;
  color: #1b3a5c;
  margin-bottom: 4px;
}
.bbm-pkg.selected .bbm-pkg-label { color: #FE5000; }
.bbm-pkg-desc {
  font-size: 0.78rem;
  color: #5a80a0;
  font-weight: 700;
}
.bbm-pkg-price {
  position: absolute;
  top: 12px; right: 14px;
  font-family: 'Fredoka One', cursive;
  font-size: 0.92rem;
  color: #2eb85c;
}
.bbm-pkg.selected .bbm-pkg-price { color: #FE5000; }
.bbm-pkg-check {
  position: absolute;
  bottom: 10px; right: 12px;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #FE5000;
  color: #fff;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.bbm-pkg.selected .bbm-pkg-check { opacity: 1; transform: scale(1); }

/* ── time slot chips ── */
.bbm-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.bbm-slot {
  font-family: 'Fredoka One', cursive;
  font-size: 0.88rem;
  color: #3080c0;
  background: #fff;
  border: 2.5px solid #b4d4f0;
  border-radius: 40px;
  padding: 8px 20px;
  cursor: pointer;
  box-shadow: 3px 3px 0 #b4d4f0;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
    box-shadow 0.2s ease,
    color 0.2s ease;
}
.bbm-slot:hover {
  border-color: #3080c0;
  box-shadow: 3px 3px 0 #3080c0;
  transform: translateY(-2px);
}
.bbm-slot.selected {
  background: #FE5000;
  border-color: #FE5000;
  color: #fff;
  box-shadow: 3px 3px 0 #c03a00;
  transform: translateY(-3px);
}

/* ── summary box ── */
.bbm-summary {
  background: #fff;
  border: 3px solid #b4d4f0;
  border-radius: 20px;
  box-shadow: 5px 5px 0 #b4d4f0;
  overflow: hidden;
}
.bbm-summary-head {
  background: #1b3a5c;
  padding: 12px 20px;
  font-family: 'Fredoka One', cursive;
  font-size: 0.95rem;
  color: #fff;
  letter-spacing: 0.3px;
}
.bbm-summary-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 10px; }
.bbm-summary-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;
  color: #1b3a5c;
  font-weight: 700;
}
.bbm-summary-icon { font-size: 1.1rem; flex-shrink: 0; width: 22px; text-align: center; }
.bbm-summary-val { flex: 1; color: #3080c0; }

/* ── footer ── */
.bbm-footer {
  background: #fff;
  border-top: 3px solid #d4ecff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
}
.bbm-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Fredoka One', cursive;
  font-size: 1rem;
  border-radius: 50px;
  padding: 12px 28px;
  border: 3px solid;
  cursor: pointer;
  transition:
    transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
    box-shadow 0.2s ease,
    background 0.2s ease;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.bbm-btn-back {
  background: #fff;
  border-color: #b4d4f0;
  color: #5a80a0;
  box-shadow: 3px 3px 0 #b4d4f0;
}
.bbm-btn-back:hover {
  border-color: #3080c0;
  color: #3080c0;
  box-shadow: 4px 4px 0 #3080c0;
  transform: translateY(-2px);
}
.bbm-btn-next {
  background: #3080c0;
  border-color: #1b3a5c;
  color: #fff;
  box-shadow: 4px 4px 0 #1b3a5c;
}
.bbm-btn-next:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 6px 6px 0 #1b3a5c;
}
.bbm-btn-submit {
  background: #FE5000;
  border-color: #1b3a5c;
  color: #fff;
  box-shadow: 4px 4px 0 #1b3a5c;
}
.bbm-btn-submit:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 6px 6px 0 #1b3a5c;
}
.bbm-step-dot-row {
  display: flex; gap: 6px; align-items: center;
}
.bbm-step-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #b4d4f0;
  border: 2px solid #b4d4f0;
  transition: background 0.2s ease, width 0.3s ease, border-radius 0.3s ease;
}
.bbm-step-dot.active {
  background: #FE5000;
  border-color: #FE5000;
  width: 22px;
  border-radius: 4px;
}
.bbm-step-dot.done {
  background: #2eb85c;
  border-color: #2eb85c;
}

/* ── success screen ── */
.bbm-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 24px;
  text-align: center;
  animation: bbm-slide-in 0.4s ease;
}
.bbm-success-icon {
  font-size: 5rem;
  animation: bbm-bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes bbm-bounce-in {
  0%   { transform: scale(0) rotate(-20deg); }
  60%  { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0); }
}
.bbm-success-title {
  font-family: 'Fredoka One', cursive;
  font-size: 2rem;
  color: #1b3a5c;
  line-height: 1.1;
}
.bbm-success-title span { color: #FE5000; }
.bbm-success-sub {
  font-size: 1rem;
  color: #5a80a0;
  font-weight: 700;
  max-width: 340px;
  line-height: 1.5;
}
.bbm-success-confetti {
  display: flex; gap: 14px; font-size: 2rem;
  animation: bbm-float 2s ease-in-out infinite;
}
@keyframes bbm-float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* ── responsive ── */
@media (max-width: 440px) {
  .bbm-body { padding: 16px; }
  .bbm-footer { padding: 12px 16px; flex-wrap: wrap; }
  .bbm-btn { padding: 10px 20px; font-size: 0.9rem; }
  .bbm-step-tab { font-size: 0.7rem; padding: 10px 4px; }
}
`;

/* ─────────────────────────────────────────
   Validation
   ───────────────────────────────────────── */
type Errors = Partial<Record<keyof FormData, string>>;

function validate(step: number, data: FormData): Errors {
    const e: Errors = {};
    if (step === 0) {
        if (!data.parentName.trim()) e.parentName = "Name is required";
        if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Valid email required";
        if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone required";
    }
    if (step === 1) {
        if (!data.childName.trim()) e.childName = "Child's name is required";
        if (!data.childAge) e.childAge = "Please select age";
        if (!data.package) e.package = "Please pick a package";
    }
    if (step === 2) {
        if (!data.partyDate) e.partyDate = "Date is required";
        if (!data.partyTime) e.partyTime = "Please pick a time slot";
        if (!data.guestCount) e.guestCount = "Guest count is required";
    }
    return e;
}

/* ─────────────────────────────────────────
   Modal component
   ───────────────────────────────────────── */
export default function BirthdayBookingModal({ isOpen, onClose }: BirthdayBookingModalProps) {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormData>(INITIAL);
    const [errors, setErrors] = useState<Errors>({});
    const [success, setSuccess] = useState(false);
    const [submitting, setSub] = useState(false);
    const backdropRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const TOTAL_STEPS = 3;

    /* inject CSS */
    useEffect(() => {
        if (document.getElementById("bbm-css")) return;
        const s = document.createElement("style");
        s.id = "bbm-css"; s.textContent = CSS;
        document.head.appendChild(s);
        return () => { document.getElementById("bbm-css")?.remove(); };
    }, []);

    /* lock body scroll when open */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            // reset after close animation
            const t = setTimeout(() => { setStep(0); setForm(INITIAL); setErrors({}); setSuccess(false); }, 400);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    /* escape key */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    /* scroll body to top on step change */
    useEffect(() => {
        bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    const set = (key: keyof FormData, val: string) => {
        setForm(p => ({ ...p, [key]: val }));
        setErrors(p => { const n = { ...p }; delete n[key]; return n; });
    };

    const next = () => {
        const e = validate(step, form);
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setStep(p => p + 1);
    };

    const back = () => { setErrors({}); setStep(p => p - 1); };

    const submit = async () => {
        const e = validate(step, form);
        if (Object.keys(e).length) { setErrors(e); return; }
        setSub(true);
        // simulate API call
        await new Promise(r => setTimeout(r, 1400));
        setSub(false);
        setSuccess(true);
    };

    /* close on backdrop click */
    const onBackdropClick = (e: React.MouseEvent) => {
        if (e.target === backdropRef.current) onClose();
    };

    const todayStr = new Date().toISOString().split("T")[0];

    const stepLabels = ["Your Info", "Party Details", "Date & Time"];
    const stepIcons = ["👤", "🎉", "📅"];

    return (
        <div
            ref={backdropRef}
            className={`bbm-backdrop${isOpen ? " open" : ""}`}
            onClick={onBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Birthday Booking Form"
        >
            <div className="bbm-modal">
                {/* confetti strip */}
                <div className="bbm-confetti-strip" aria-hidden="true" />

                {/* header */}
                <div className="bbm-header">
                    <div className="bbm-header-left">
                        <span className="bbm-header-tag">📸 Jus Jumpin'</span>
                        <span className="bbm-header-title">
                            Book Your <span>Birthday</span> Party 🎂
                        </span>
                    </div>
                    <button className="bbm-close" onClick={onClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* step tabs */}
                {!success && (
                    <div className="bbm-steps" role="tablist">
                        {stepLabels.map((label, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === step}
                                className={`bbm-step-tab${i === step ? " active" : ""}${i < step ? " done" : ""}`}
                                onClick={() => i < step && setStep(i)}
                            >
                                <span className="bbm-step-num">
                                    {i < step ? "✓" : stepIcons[i]}
                                </span>
                                {label}
                            </button>
                        ))}
                    </div>
                )}

                {/* body */}
                <div className="bbm-body" ref={bodyRef}>
                    {success ? (
                        /* ── success ── */
                        <div className="bbm-success">
                            <div className="bbm-success-confetti" aria-hidden="true">🎊 🎂 🎈</div>
                            <div className="bbm-success-icon">🎉</div>
                            <div className="bbm-success-title">
                                You&apos;re <span>Booked!</span>
                            </div>
                            <p className="bbm-success-sub">
                                Woohoo! We&apos;ve received your booking request for{" "}
                                <strong>{form.childName}&apos;s birthday party</strong>.
                                Our team will call you on <strong>{form.phone}</strong> within 24 hours to confirm!
                            </p>
                            <button className="bbm-btn bbm-btn-submit" onClick={onClose} style={{ marginTop: 8 }}>
                                🎈 Awesome, Close!
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* ── Step 0: Contact info ── */}
                            <div className={`bbm-panel${step === 0 ? " active" : ""}`} role="tabpanel">
                                <div className="bbm-section-label">Your Contact Info</div>
                                <div className="bbm-row">
                                    <Field label="Parent / Guardian Name" req>
                                        <input className={`bbm-input${errors.parentName ? " error" : ""}`}
                                            type="text" placeholder="e.g. Priya Sharma"
                                            value={form.parentName} onChange={e => set("parentName", e.target.value)} />
                                        {errors.parentName && <span className="bbm-error-msg">⚠ {errors.parentName}</span>}
                                    </Field>
                                    <Field label="Email Address" req>
                                        <input className={`bbm-input${errors.email ? " error" : ""}`}
                                            type="email" placeholder="you@email.com"
                                            value={form.email} onChange={e => set("email", e.target.value)} />
                                        {errors.email && <span className="bbm-error-msg">⚠ {errors.email}</span>}
                                    </Field>
                                </div>
                                <Field label="Phone Number" req>
                                    <input className={`bbm-input${errors.phone ? " error" : ""}`}
                                        type="tel" placeholder="e.g. 9876543210"
                                        value={form.phone} onChange={e => set("phone", e.target.value)} />
                                    {errors.phone && <span className="bbm-error-msg">⚠ {errors.phone}</span>}
                                </Field>
                            </div>

                            {/* ── Step 1: Party details ── */}
                            <div className={`bbm-panel${step === 1 ? " active" : ""}`} role="tabpanel">
                                <div className="bbm-section-label">Birthday Child</div>
                                <div className="bbm-row">
                                    <Field label="Child's Name" req>
                                        <input className={`bbm-input${errors.childName ? " error" : ""}`}
                                            type="text" placeholder="e.g. Arjun"
                                            value={form.childName} onChange={e => set("childName", e.target.value)} />
                                        {errors.childName && <span className="bbm-error-msg">⚠ {errors.childName}</span>}
                                    </Field>
                                    <Field label="Turning Age" req>
                                        <select className={`bbm-select${errors.childAge ? " error" : ""}`}
                                            value={form.childAge} onChange={e => set("childAge", e.target.value)}>
                                            <option value="">Select age</option>
                                            {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
                                                <option key={n} value={n}>{n} years old</option>
                                            ))}
                                        </select>
                                        {errors.childAge && <span className="bbm-error-msg">⚠ {errors.childAge}</span>}
                                    </Field>
                                </div>

                                <div className="bbm-section-label">Choose Package</div>
                                {errors.package && <span className="bbm-error-msg">⚠ {errors.package}</span>}
                                <div className="bbm-packages">
                                    {PACKAGES.map(pkg => (
                                        <div
                                            key={pkg.id}
                                            className={`bbm-pkg${form.package === pkg.id ? " selected" : ""}`}
                                            onClick={() => set("package", pkg.id)}
                                            role="radio"
                                            aria-checked={form.package === pkg.id}
                                            tabIndex={0}
                                            onKeyDown={e => e.key === "Enter" && set("package", pkg.id)}
                                        >
                                            <div className="bbm-pkg-label">{pkg.label}</div>
                                            <div className="bbm-pkg-desc">{pkg.desc}</div>
                                            <div className="bbm-pkg-price">{pkg.price}</div>
                                            <div className="bbm-pkg-check">✓</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Step 2: Date & time ── */}
                            <div className={`bbm-panel${step === 2 ? " active" : ""}`} role="tabpanel">
                                <div className="bbm-section-label">When's the Party?</div>
                                <div className="bbm-row">
                                    <Field label="Party Date" req>
                                        <input className={`bbm-input${errors.partyDate ? " error" : ""}`}
                                            type="date" min={todayStr}
                                            value={form.partyDate} onChange={e => set("partyDate", e.target.value)} />
                                        {errors.partyDate && <span className="bbm-error-msg">⚠ {errors.partyDate}</span>}
                                    </Field>
                                    <Field label="Number of Guests" req>
                                        <select className={`bbm-select${errors.guestCount ? " error" : ""}`}
                                            value={form.guestCount} onChange={e => set("guestCount", e.target.value)}>
                                            <option value="">Select guests</option>
                                            {["10–15", "15–25", "25–35", "35–50", "50+"].map(g => (
                                                <option key={g} value={g}>{g} guests</option>
                                            ))}
                                        </select>
                                        {errors.guestCount && <span className="bbm-error-msg">⚠ {errors.guestCount}</span>}
                                    </Field>
                                </div>

                                <div className="bbm-section-label">Preferred Time Slot</div>
                                {errors.partyTime && <span className="bbm-error-msg">⚠ {errors.partyTime}</span>}
                                <div className="bbm-slots" role="group" aria-label="Time slots">
                                    {TIME_SLOTS.map(t => (
                                        <button
                                            key={t}
                                            className={`bbm-slot${form.partyTime === t ? " selected" : ""}`}
                                            onClick={() => set("partyTime", t)}
                                            type="button"
                                        >
                                            🕐 {t}
                                        </button>
                                    ))}
                                </div>

                                <Field label="Special Requests / Theme Ideas 🎨" optional>
                                    <textarea className="bbm-textarea"
                                        placeholder="e.g. Superhero theme, nut-free cake, indoor seating..."
                                        value={form.message} onChange={e => set("message", e.target.value)} />
                                </Field>

                                {/* summary */}
                                <div className="bbm-summary">
                                    <div className="bbm-summary-head">📋 Your Booking Summary</div>
                                    <div className="bbm-summary-body">
                                        {[
                                            { icon: "👤", label: "Parent", val: form.parentName || "—" },
                                            { icon: "🎂", label: "Child", val: form.childName ? `${form.childName}, turning ${form.childAge}` : "—" },
                                            { icon: "🎊", label: "Package", val: PACKAGES.find(p => p.id === form.package)?.label || "—" },
                                            { icon: "📅", label: "Date", val: form.partyDate ? new Date(form.partyDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—" },
                                            { icon: "🕐", label: "Time", val: form.partyTime || "—" },
                                            { icon: "👥", label: "Guests", val: form.guestCount || "—" },
                                        ].map((r, i) => (
                                            <div key={i} className="bbm-summary-row">
                                                <span className="bbm-summary-icon">{r.icon}</span>
                                                <span style={{ color: "#5a80a0" }}>{r.label}:</span>
                                                <span className="bbm-summary-val">{r.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* footer */}
                {!success && (
                    <div className="bbm-footer">
                        <div className="bbm-step-dot-row" aria-hidden="true">
                            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                                <div key={i} className={`bbm-step-dot${i === step ? " active" : i < step ? " done" : ""}`} />
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                            {step > 0 && (
                                <button className="bbm-btn bbm-btn-back" onClick={back} type="button">
                                    ← Back
                                </button>
                            )}
                            {step < TOTAL_STEPS - 1 ? (
                                <button className="bbm-btn bbm-btn-next" onClick={next} type="button">
                                    Next Step →
                                </button>
                            ) : (
                                <button
                                    className="bbm-btn bbm-btn-submit"
                                    onClick={submit}
                                    type="button"
                                    disabled={submitting}
                                >
                                    {submitting ? "Booking... ⏳" : "🎉 Confirm Booking!"}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── tiny Field wrapper ─── */
function Field({
    label, req, optional, children,
}: {
    label: string; req?: boolean; optional?: boolean; children: React.ReactNode;
}) {
    return (
        <div className="bbm-field">
            <label className="bbm-label">
                {label}
                {req && <span className="req"> *</span>}
                {optional && <span style={{ color: "#a0bcd0", fontSize: "0.75rem", marginLeft: 4 }}>(optional)</span>}
            </label>
            {children}
        </div>
    );
}