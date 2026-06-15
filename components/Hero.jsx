"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ── Typing animation config ──────────────────────────────────────────────────
const TYPED_WORDS = [ "parliamentary affairs", "clarity", "elections", "digital innovation"];
const TYPE_SPEED   = 80;   // ms per character typed
const DELETE_SPEED = 45;   // ms per character deleted
const PAUSE_AFTER  = 1800; // ms to hold the completed word
const PAUSE_BEFORE = 400;  // ms to pause before typing next word

function useTypingAnimation(words) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex]     = useState(0);
  const [phase, setPhase]             = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const timeoutRef = useRef();

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (phase === "typing") {
      if (displayText.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, TYPE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), PAUSE_AFTER);
      }
    }

    if (phase === "pausing") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 0);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((t) => t.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("waiting");
        }, PAUSE_BEFORE);
      }
    }

    if (phase === "waiting") {
      timeoutRef.current = setTimeout(() => setPhase("typing"), 0);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, phase, wordIndex, words]);

  return { displayText, isTyping: phase === "typing" };
}

const NAV_LINKS = ["Programs", "Treatments", "Specialists", "Products", "About"];

const DOCTORS = [
  {
    id: 1,
    name: "Jonathan Reed",
    specialty: "Naturopathic Doctor",
    initials: "JR",
    color: "bg-amber-200 text-amber-900",
  },
  {
    id: 2,
    name: "Olivia Bennett",
    specialty: "Dermatologist",
    initials: "OB",
    color: "bg-emerald-200 text-emerald-900",
  },
  {
    id: 3,
    name: "Marcus Lee",
    specialty: "Psychotherapist",
    initials: "ML",
    color: "bg-sky-200 text-sky-900",
  },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const { displayText, isTyping } = useTypingAnimation(TYPED_WORDS);

  const filtered = DOCTORS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0e1a0f] font-sans">
      {/* ── Background hero image (gradient placeholder + overlay) ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./mbi.jpg')`,
        }}
      />
      {/* Dark green vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a0e]/90 via-[#0d1a0e]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a150b]/80 via-transparent to-[#0a150b]/30" />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-screen flex-col">

        {/* ── Navbar ── */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between px-8 pt-7 pb-0"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-white">
              <path
                d="M11 2 L11 20 M2 11 L20 11 M5 5 L17 17 M17 5 L5 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white text-[17px] font-semibold tracking-wide">Mbi Aziseh</span>
          </div>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-white/70 text-sm hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="flex items-center gap-2 rounded-full bg-[#1e3a20] border border-white/10 px-4 py-2 text-white text-sm font-medium hover:bg-[#2a4e2c] transition-colors duration-200">
            Contact us
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </motion.nav>

        {/* ── Hero body ── */}
        <div className="flex flex-1 flex-col justify-end gap-4 px-8 py-8">

          {/* Top area: tagline + session badge */}
          <div className="mt-4 ">
            {/* Tagline */}

            {/* Available for Session badge */}
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/10 bg-black/30 backdrop-blur-md px-4 py-2"
            >
              <span className="relative flex h-2 w-2 max-md:hidden">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-white/80 text-xs text-center lg:text-sm p-1">Advancing Electoral Integrity, Civic Innovation, and Accountable Governance in Africa
</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="max-w-[530px] lg:max-w-[600px]"
            >
              <p className="text-white/75 text-[0.8rem] md:text-lg lg:text-xl leading-relaxed">
                Designing evidence-driven solutions that strengthen democratic systems, enhance parliamentary accountability, and empower citizens specially youth to actively shape governance and public policy.

              </p>

              
            </motion.div>

            
          </div>

          {/* Bottom area: headline + doctor search card */}
          <div className="flex items-end justify-between">
            {/* Big headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-white leading-[1.5] font-semibold w-full lg:w-190 md:w-150" style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.5rem)" }}>
                I am Mbi Aziseh, a civic innovation leader and policy entrepreneur, and the Executive Director of POLITICOS (Policy Lab for Civic Innovation and Community Solutions). 
                My work sits at the intersection of 
                {" "}
                <span className="relative inline-block">
                  <em
                    className="not-italic  text-emerald-400"
                    style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 400 }}
                  >
                    {displayText}
                  </em>
                  {/* Blinking cursor */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: isTyping ? 1 : [1, 0] }}
                    transition={
                      isTyping
                        ? { duration: 0 }
                        : { duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }
                    }
                    className="ml-[2px] inline-block w-[3px] rounded-sm bg-emerald-400 align-middle"
                    style={{ height: "0.85em", verticalAlign: "middle", position: "relative", top: "-0.05em" }}
                  />
                </span>
                <br />
              </h1>
            </motion.div>

            {/* Doctor search card */}
           
          </div>
        </div>

      </div>
    </div>
  );
}