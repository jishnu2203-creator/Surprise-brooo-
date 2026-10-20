/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Heart,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Skull,
  Sparkles,
  TriangleAlert,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';

/* =========================================================================
   BACKGROUND AMBIENT ORBS & GRAIN
   ========================================================================= */

function BackgroundDecoration({ currentScreen }: { currentScreen: number }) {
  const theme = (() => {
    switch (currentScreen) {
      case 1:
        return {
          bg: 'bg-[#0a0612]',
          orb1: 'from-purple-900/35 via-indigo-900/20 to-transparent',
          orb2: 'from-pink-900/25 via-violet-950/20 to-transparent',
          orb3: 'from-amber-600/15 via-rose-950/10 to-transparent',
        };
      case 2:
        return {
          bg: 'bg-[#0c0814]',
          orb1: 'from-fuchsia-800/30 via-purple-900/20 to-transparent',
          orb2: 'from-orange-600/20 via-rose-800/15 to-transparent',
          orb3: 'from-violet-700/25 via-indigo-950/20 to-transparent',
        };
      case 3:
        return {
          bg: 'bg-[#0e0717]',
          orb1: 'from-pink-600/40 via-purple-700/25 to-transparent',
          orb2: 'from-amber-500/35 via-rose-600/20 to-transparent',
          orb3: 'from-fuchsia-600/35 via-indigo-900/25 to-transparent',
        };
      case 4:
        return {
          bg: 'bg-[#08070d]',
          orb1: 'from-purple-950/40 via-neutral-900/40 to-transparent',
          orb2: 'from-amber-600/20 via-orange-950/15 to-transparent',
          orb3: 'from-indigo-900/25 via-neutral-950/20 to-transparent',
        };
      case 5:
        return {
          bg: 'bg-[#0a0714]',
          orb1: 'from-rose-700/30 via-pink-900/20 to-transparent',
          orb2: 'from-orange-500/25 via-amber-900/15 to-transparent',
          orb3: 'from-purple-800/25 via-violet-950/20 to-transparent',
        };
      case 6:
        return {
          bg: 'bg-[#0d050a]',
          orb1: 'from-red-900/35 via-rose-950/25 to-transparent',
          orb2: 'from-purple-900/30 via-neutral-950/20 to-transparent',
          orb3: 'from-orange-700/20 via-red-950/15 to-transparent',
        };
      case 7:
        return {
          bg: 'bg-[#090514]',
          orb1: 'from-purple-600/40 via-pink-700/30 to-transparent',
          orb2: 'from-amber-500/35 via-rose-600/25 to-transparent',
          orb3: 'from-indigo-700/35 via-violet-900/25 to-transparent',
        };
      default:
        return {
          bg: 'bg-[#09060f]',
          orb1: 'from-purple-900/30 to-transparent',
          orb2: 'from-pink-900/20 to-transparent',
          orb3: 'from-amber-700/15 to-transparent',
        };
    }
  })();

  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-colors duration-1000 ${theme.bg} z-0 overflow-hidden`}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br ${theme.orb1} blur-3xl`}
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -bottom-40 -right-40 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-tl ${theme.orb2} blur-3xl`}
      />
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          x: [0, 25, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-1/3 left-1/4 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-r ${theme.orb3} blur-3xl`}
      />
      <div className="absolute inset-0 grain-overlay opacity-60 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 opacity-25">
        <div
          className="absolute top-[18%] left-[12%] w-1 h-1 bg-white rounded-full animate-ping"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute top-[42%] right-[16%] w-1.5 h-1.5 bg-amber-200 rounded-full animate-ping"
          style={{ animationDuration: '5.5s' }}
        />
        <div
          className="absolute bottom-[28%] left-[22%] w-1 h-1 bg-pink-300 rounded-full animate-ping"
          style={{ animationDuration: '6s' }}
        />
        <div
          className="absolute top-[68%] right-[28%] w-1 h-1 bg-purple-200 rounded-full animate-ping"
          style={{ animationDuration: '4.8s' }}
        />
      </div>
    </div>
  );
}

/* =========================================================================
   STORY PROGRESS BAR
   ========================================================================= */

function StoryProgressBar({
  currentScreen,
  totalScreens = 7,
  onSelectScreen,
}: {
  currentScreen: number;
  totalScreens?: number;
  onSelectScreen?: (screen: number) => void;
}) {
  const screens = Array.from({ length: totalScreens }, (_, i) => i + 1);

  return (
    <div
      id="story-progress-bar"
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-3 pb-2 sm:px-6 sm:pt-4 max-w-xl mx-auto w-full pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 w-full">
        {screens.map((step) => {
          const isPassed = step < currentScreen;
          const isCurrent = step === currentScreen;

          return (
            <button
              key={step}
              type="button"
              onClick={() => onSelectScreen && onSelectScreen(step)}
              disabled={!onSelectScreen}
              aria-label={`Go to screen ${step}`}
              className="flex-1 h-1 sm:h-1.5 rounded-full overflow-hidden bg-white/15 transition-all duration-300 relative text-left focus:outline-none"
            >
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isPassed
                    ? 'w-full bg-white/90'
                    : isCurrent
                    ? 'w-full bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                    : 'w-0 bg-white/30'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-2 px-0.5 text-[11px] sm:text-xs font-mono font-medium tracking-wider text-white/50">
        <span>SHRUTHIII'S STORY</span>
        <span className="text-white/80 font-semibold">
          0{currentScreen} / 0{totalScreens}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   FLOATING MUSIC CONTROLLER
   ========================================================================= */

function FloatingMusicPlayer({
  isPlaying,
  onToggle,
  hasStarted,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  hasStarted: boolean;
}) {
  return (
    <div
      id="floating-music-container"
      className="fixed top-12 right-4 sm:top-14 sm:right-6 z-40 flex items-center gap-2"
    >
      {hasStarted && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] text-white/70 font-mono tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate max-w-[140px]">Pretty Little Baby</span>
        </motion.div>
      )}

      <button
        id="music-toggle-btn"
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className={`group relative p-2.5 sm:p-3 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
          isPlaying
            ? 'bg-purple-500/25 border-pink-400/40 text-pink-200 shadow-[0_0_20px_rgba(244,114,182,0.35)] scale-100'
            : 'bg-white/10 border-white/15 text-white/60 hover:text-white hover:bg-white/15'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
            <span
              className="w-1 bg-pink-300 rounded-full animate-pulse"
              style={{ height: '70%', animationDuration: '0.6s' }}
            />
            <span
              className="w-1 bg-pink-200 rounded-full animate-pulse"
              style={{ height: '100%', animationDuration: '0.4s' }}
            />
            <span
              className="w-1 bg-pink-400 rounded-full animate-pulse"
              style={{ height: '50%', animationDuration: '0.8s' }}
            />
          </div>
        ) : (
          <span className="text-sm">🎵</span>
        )}

        <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-neutral-900 border border-white/20 text-[9px]">
          {isPlaying ? (
            <Volume2 className="w-2.5 h-2.5 text-pink-300" />
          ) : (
            <VolumeX className="w-2.5 h-2.5 text-white/50" />
          )}
        </span>
      </button>
    </div>
  );
}

/* =========================================================================
   SCREEN 1: MYSTERY INTRO
   ========================================================================= */

function ScreenMystery({ onStart }: { onStart: () => void }) {
  return (
    <div
      id="screen-mystery"
      className="w-full h-full min-h-screen flex flex-col justify-between items-center px-6 py-16 sm:py-20 text-center relative select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono tracking-wider"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>CONFIDENTIAL SURPRISE</span>
      </motion.div>

      <div className="max-w-md w-full my-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/60 text-base sm:text-lg font-medium tracking-wide"
        >
          hey shruthiii...
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
        >
          I made something <br />
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            for you.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-white/70 text-lg sm:text-xl font-medium"
        >
          but there's a small problem...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.3 }}
          className="text-amber-200 font-semibold text-lg sm:text-xl flex items-center justify-center gap-1.5"
        >
          <span>you have to press the button.</span>
          <span className="text-2xl animate-bounce">😂</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="w-full max-w-xs"
      >
        <button
          id="start-chaos-btn"
          type="button"
          onClick={onStart}
          className="group relative w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-display font-bold text-lg sm:text-xl shadow-[0_10px_35px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_45px_rgba(236,72,153,0.6)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <span className="tracking-wide">START THE CHAOS</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>
        <p className="mt-3 text-[11px] font-mono text-white/40 tracking-wider">
          TURN UP SOUND FOR FULL EXPERIENCE 🔊
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   SCREEN 2: FUNNY DIAGNOSTIC PROTOCOL
   ========================================================================= */

function ScreenFunnyIntro({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1400),
      setTimeout(() => setStep(4), 1900),
      setTimeout(() => setStep(5), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const diagnosticItems = [
    { label: 'checking age...', status: 'passed', note: '+1 Year Elder' },
    { label: 'checking attitude...', status: 'passed', note: '100% Sassy' },
    { label: 'checking drama...', status: 'passed', note: 'High Definition' },
    { label: 'checking common sense...', status: 'failed', note: 'Searching...' },
  ];

  return (
    <div
      id="screen-funny-intro"
      className="w-full h-full min-h-screen flex flex-col justify-between items-center px-6 py-16 sm:py-20 text-center relative select-none"
    >
      <div className="max-w-md w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/25 text-pink-300 text-xs font-mono mb-3"
        >
          DIAGNOSTIC PROTOCOL
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
        >
          Loading Shruthiii's birthday...
        </motion.h2>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-3.5 my-auto">
        {diagnosticItems.map((item, index) =>
          step > index ? (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 280 }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 shadow-lg text-left"
            >
              <div className="flex items-center gap-3">
                {item.status === 'passed' ? (
                  <CircleCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <CircleAlert className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <span className="text-white/90 font-medium text-sm sm:text-base font-sans">
                  {item.label}
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {item.note}
              </span>
            </motion.div>
          ) : null
        )}

        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              className="w-full mt-2 p-4 rounded-2xl bg-gradient-to-r from-rose-900/60 via-red-900/50 to-purple-900/60 border border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.3)] text-center"
            >
              <div className="text-xl sm:text-2xl font-display font-extrabold text-rose-200 tracking-wide flex items-center justify-center gap-2">
                <span>common sense not found</span>
                <span className="text-3xl animate-pulse">💀</span>
              </div>
              <p className="text-xs text-rose-300/80 font-mono mt-1">
                ERROR 404: WILL RETRY NEXT YEAR
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs"
      >
        <button
          id="continue-funny-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white font-display font-bold text-lg shadow-[0_10px_35px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_45px_rgba(168,85,247,0.6)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>OKAY CONTINUE</span>
          <span className="text-xl">😂</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   SCREEN 3: BIRTHDAY REVEAL & COUNTDOWN
   ========================================================================= */

function ScreenBirthdayReveal({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<number | string>(3);

  const triggerDualCannons = () => {
    try {
      const end = Date.now() + 1800;
      const colors = ['#f472b6', '#c084fc', '#fbbf24', '#38bdf8', '#fb7185'];
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 700);
    const t2 = setTimeout(() => setPhase(1), 1400);
    const t3 = setTimeout(() => {
      setPhase('BOOM');
      triggerDualCannons();
    }, 2100);
    const t4 = setTimeout(() => {
      setPhase('REVEALED');
      triggerDualCannons();
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      id="screen-birthday-reveal"
      className="w-full h-full min-h-screen flex flex-col justify-between items-center px-6 py-16 sm:py-20 text-center relative select-none overflow-hidden"
    >
      <div className="pt-2">
        <span className="text-xs font-mono tracking-widest text-pink-300/80 px-3 py-1 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          LEVEL UNLOCKED
        </span>
      </div>

      <div className="my-auto w-full max-w-lg flex flex-col items-center justify-center min-h-[320px]">
        <AnimatePresence mode="wait">
          {typeof phase === 'number' && (
            <motion.div
              key={phase}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-display font-black text-8xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-300 to-amber-300 filter drop-shadow-[0_10px_30px_rgba(244,114,182,0.5)]"
            >
              {phase}
            </motion.div>
          )}

          {phase === 'BOOM' && (
            <motion.div
              key="boom"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display font-black text-6xl sm:text-7xl text-amber-300 tracking-wider"
            >
              BOOM! 💥
            </motion.div>
          )}

          {phase === 'REVEALED' && (
            <motion.div
              key="revealed"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring', damping: 18 }}
              className="flex flex-col items-center space-y-4"
            >
              <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] uppercase">
                <span className="block text-pink-300 drop-shadow-[0_0_25px_rgba(244,114,182,0.4)]">
                  HAPPY
                </span>
                <span className="block text-purple-200">BIRTHDAY</span>
                <span className="block bg-gradient-to-r from-amber-200 via-pink-300 to-rose-400 bg-clip-text text-transparent">
                  SHRUTHIII! 🎂
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg sm:text-xl font-medium text-amber-200/90 font-sans tracking-wide pt-2"
              >
                Another year unlocked. 😂
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-xs">
        <button
          id="reveal-next-btn"
          type="button"
          onClick={() => {
            triggerDualCannons();
            onNext();
          }}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-display font-bold text-lg shadow-[0_10px_35px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_45px_rgba(236,72,153,0.6)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>VIEW SHRUTHIII DOSSIER</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   SCREEN 4: SHRUTHIII DOSSIER // PERSONALITY FILE
   ========================================================================= */

function ScreenShruthiiiFile({ onNext }: { onNext: () => void }) {
  const [showStamps, setShowStamps] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStamps(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const traits = [
    { label: 'CHAOS', value: '97%', width: '97%', color: 'from-pink-500 to-rose-500' },
    { label: 'TALKING', value: '100%', width: '100%', color: 'from-purple-500 to-indigo-500' },
    {
      label: 'RANDOMNESS',
      value: '∞',
      width: '100%',
      color: 'from-amber-400 to-orange-500',
      isInfinity: true,
    },
    { label: 'DRAMA', value: '94%', width: '94%', color: 'from-fuchsia-500 to-pink-500' },
  ];

  return (
    <div
      id="screen-shruthiii-file"
      className="w-full h-full min-h-screen flex flex-col justify-between items-center px-5 py-14 sm:py-18 relative select-none overflow-y-auto"
    >
      <div className="w-full max-w-md pt-2 text-left">
        <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs text-amber-300 tracking-widest uppercase">
              TOP SECRET // DOSSIER #0917
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/50 tracking-wider">
            SECURITY LEVEL: OVERLOAD
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono font-bold text-xl sm:text-2xl text-white tracking-wider"
        >
          SHRUTHIII // PERSONALITY FILE
        </motion.h2>
        <p className="text-white/60 text-xs font-mono mt-0.5">
          SUBJECT IDENTIFIER: HIGHLY VOLATILE SWEETHEART
        </p>
      </div>

      <div className="w-full max-w-md my-auto space-y-4 sm:space-y-5 relative py-2">
        {traits.map((trait, idx) => (
          <motion.div
            key={trait.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * idx }}
            className="space-y-1.5"
          >
            <div className="flex justify-between items-baseline font-mono text-xs sm:text-sm">
              <span className="font-bold tracking-wider text-white/90">{trait.label}</span>
              <span className="text-amber-300 font-extrabold">{trait.value}</span>
            </div>
            <div className="h-4 sm:h-5 w-full bg-white/5 rounded-md p-0.5 border border-white/10 flex items-center overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: trait.width }}
                transition={{ duration: 0.8, delay: 0.2 + 0.15 * idx, ease: 'easeOut' }}
                className={`h-full rounded-sm bg-gradient-to-r ${trait.color} flex items-center justify-end px-1`}
              >
                {trait.isInfinity && (
                  <span className="text-[10px] font-mono text-white font-black tracking-widest">
                    MAXIMUM OVERDRIVE
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-1.5 pt-1"
        >
          <div className="flex justify-between items-baseline font-mono text-xs sm:text-sm">
            <span className="font-bold tracking-wider text-rose-300">COMMON SENSE</span>
            <span className="text-rose-400 font-mono text-[11px] animate-pulse">
              STATUS: SEARCHING...
            </span>
          </div>
          <div className="h-4 sm:h-5 w-full bg-rose-950/20 rounded-md border border-rose-500/30 flex items-center px-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-2" />
            <span className="text-[10px] font-mono text-rose-300/80 tracking-widest truncate">
              [SYSTEM ERROR: NO DATA LOCATED IN ARCHIVES]
            </span>
          </div>
        </motion.div>

        {showStamps && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pointer-events-none">
            <div
              className="animate-stamp px-3 py-1 sm:px-3.5 sm:py-1.5 border-2 border-emerald-400 text-emerald-300 rounded font-mono font-black text-xs sm:text-sm tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.3)] bg-emerald-950/40"
              style={{ transform: 'rotate(-8deg)' }}
            >
              ✓ VERIFIED
            </div>
            <div
              className="animate-stamp px-3 py-1 sm:px-3.5 sm:py-1.5 border-2 border-rose-500 text-rose-300 rounded font-mono font-black text-xs sm:text-sm tracking-widest shadow-[0_0_15px_rgba(244,63,94,0.3)] bg-rose-950/40"
              style={{ animationDelay: '0.15s', transform: 'rotate(6deg)' }}
            >
              ★ SLIGHTLY CHAOTIC
            </div>
            <div
              className="animate-stamp px-3 py-1 sm:px-3.5 sm:py-1.5 border-2 border-amber-400 text-amber-300 rounded font-mono font-black text-xs sm:text-sm tracking-widest shadow-[0_0_15px_rgba(251,191,36,0.3)] bg-amber-950/40"
              style={{ animationDelay: '0.3s', transform: 'rotate(-4deg)' }}
            >
              ♥ FRIEND APPROVED
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-xs pt-2">
        <button
          id="dossier-next-btn"
          type="button"
          onClick={onNext}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-display font-bold text-lg shadow-[0_10px_35px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>FRIENDSHIP UPDATE</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   SCREEN 5: FRIENDSHIP UPDATE CHANGELOG
   ========================================================================= */

function ScreenFriendshipUpdate({ onNext }: { onNext: () => void }) {
  const changelog = [
    { label: 'Duration', value: 'Still Loading...', icon: RefreshCw, color: 'text-amber-300' },
    { label: 'Comfort', value: 'Unexpectedly High', icon: ShieldCheck, color: 'text-pink-300' },
    { label: 'Annoyance', value: 'Already Unlocked 😂', icon: Zap, color: 'text-rose-400' },
  ];

  return (
    <div
      id="screen-friendship-update"
      className="w-full h-full min-h-screen flex flex-col justify-between items-center px-6 py-14 sm:py-18 text-center relative select-none"
    >
      <div className="pt-2 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-pink-300 text-xs font-mono mb-2"
        >
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <span>CHANGELOG // V1.0</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight"
        >
          FRIENDSHIP UPDATE
        </motion.h2>

        <div className="flex items-center justify-center gap-2 mt-1 text-xs font-mono text-white/50">
          <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-bold">
            VERSION 1.0
          </span>
          <span>•</span>
          <span className="text-amber-300">Recently Added</span>
        </div>
      </div>

      <div className="w-full max-w-sm my-auto space-y-4">
        <div className="space-y-3">
          {changelog.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * idx, duration: 0.5 }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10 text-white/80">
                    <Icon className="w-4 h-4 text-white/80" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-white/50 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className={`text-base font-bold ${item.color}`}>{item.value}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-2 px-2"
        >
          <p className="text-white/85 text-base sm:text-lg font-medium leading-relaxed italic">
            "We haven't been friends for that long,
            <br />
            but somehow you're already part of
            <br />
            <span className="text-amber-200 font-bold not-italic">the daily nonsense. 😂</span>"
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-xs pt-2">
        <button
          id="friendship-next-btn"
          type="button"
          onClick={onNext}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-display font-bold text-lg shadow-[0_10px_35px_rgba(219,39,119,0.35)] hover:shadow-[0_15px_45px_rgba(219,39,119,0.5)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>WAIT... THERE'S MORE</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   SCREEN 6: THE TRAP (DO NOT PRESS)
   ========================================================================= */

function ScreenTheTrap({ onNext }: { onNext: () => void }) {
  const [isShaking, setIsShaking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTrapClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setShowModal(true);
    }, 600);
  };

  return (
    <div
      id="screen-the-trap"
      className={`w-full h-full min-h-screen flex flex-col justify-between items-center px-6 py-16 sm:py-20 text-center relative select-none ${
        isShaking ? 'animate-shake' : ''
      }`}
    >
      <div className="pt-4 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono mb-4"
        >
          <TriangleAlert className="w-3.5 h-3.5 text-red-400" />
          <span>CRITICAL PROTOCOL HAZARD</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display font-black text-6xl sm:text-7xl text-white tracking-tighter"
        >
          WAIT.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-white/70 font-medium mt-3"
        >
          There's one more thing.
        </motion.p>
      </div>

      <div className="my-auto flex flex-col items-center justify-center w-full max-w-xs">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="relative flex flex-col items-center"
        >
          <div className="absolute -inset-4 rounded-full bg-red-600/20 blur-xl animate-pulse" />
          <button
            id="trap-do-not-press-btn"
            type="button"
            onClick={handleTrapClick}
            className="group relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-red-600 via-rose-700 to-red-950 border-4 border-red-400/60 shadow-[0_0_50px_rgba(239,68,68,0.5)] active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-white cursor-pointer select-none"
          >
            <Skull className="w-10 h-10 text-red-200 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display font-black text-2xl sm:text-3xl tracking-wider text-red-100 drop-shadow-md">
              DO NOT
              <br />
              PRESS
            </span>
            <span className="text-[10px] font-mono text-red-300/80 tracking-widest uppercase">
              HIGH VOLTAGE DANGER
            </span>
          </button>
        </motion.div>

        <p className="text-white/40 text-xs font-mono mt-6 tracking-wide">
          (Seriously, do not tap it Shruthiii...)
        </p>
      </div>

      <div className="w-full max-w-xs h-10" />

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/20 text-center shadow-2xl flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center text-3xl">
                😭
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-black text-3xl text-rose-300 tracking-tight">
                  SHRUTHIII 😭
                </h3>
                <p className="font-sans font-bold text-lg text-white">
                  WHY WOULD YOU PRESS THAT?!
                </p>
                <p className="text-white/50 text-sm font-mono pt-1">
                  Literally said "DO NOT PRESS" in size 48 font!
                </p>
              </div>

              <div className="py-2 text-white/70 font-mono text-sm">...anyway.</div>

              <button
                id="show-actual-surprise-btn"
                type="button"
                onClick={onNext}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-display font-bold text-base shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SHOW ME THE ACTUAL SURPRISE</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   SCREEN 7: FINAL SURPRISE & SPECIAL DEDICATION
   ========================================================================= */

function ScreenFinalSurprise({ onReplay }: { onReplay: () => void }) {
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fbbf24', '#c084fc', '#60a5fa', '#f43f5e'],
      });
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="screen-final-surprise"
      className="w-full h-full min-h-screen flex flex-col justify-between items-center px-6 py-14 sm:py-16 text-center relative select-none overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-2"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-400/30 text-amber-200 text-xs sm:text-sm font-mono tracking-wider shadow-[0_0_20px_rgba(244,114,182,0.2)]">
          <Sparkles
            className="w-3.5 h-3.5 text-amber-300 animate-spin"
            style={{ animationDuration: '6s' }}
          />
          <span>SPECIAL DEDICATION</span>
          <Sparkles
            className="w-3.5 h-3.5 text-pink-300 animate-spin"
            style={{ animationDuration: '6s' }}
          />
        </span>
      </motion.div>

      <div className="w-full max-w-lg my-auto space-y-6 sm:space-y-7 py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 tracking-tight">
            SHRUTHIII,
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
        >
          THIS YEAR IS YOURS.{' '}
          <span className="inline-block text-amber-300 animate-bounce">✨</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="space-y-1.5 text-lg sm:text-xl md:text-2xl font-medium text-white/90 leading-relaxed font-sans"
        >
          <p className="text-pink-200/90">More laughs.</p>
          <p className="text-purple-200/90">More memories.</p>
          <p className="text-amber-200/90">More random nonsense.</p>
          <p className="text-rose-200 font-semibold">More reasons to smile.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 2.1 }}
          className="pt-2"
        >
          <div className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 tracking-wider">
            HAPPY BIRTHDAY! 🎂
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-sm sm:text-base font-mono text-white/60 tracking-wide"
        >
          — from your recently upgraded friend 😂
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9 }}
        className="w-full max-w-sm flex flex-col sm:flex-row gap-3 pt-2"
      >
        <button
          id="blast-confetti-btn"
          type="button"
          onClick={fireConfetti}
          className="flex-1 py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          <span>Send Confetti 🎉</span>
        </button>

        <button
          id="replay-experience-btn"
          type="button"
          onClick={onReplay}
          className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Story</span>
        </button>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   MAIN APP COMPONENT
   ========================================================================= */

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio('/audio/pretty-little-baby.mp3');
      audio.loop = true;
      audio.volume = 0.4;
      audio.preload = 'auto';
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = (e) => {
        console.warn('Audio playback error (handled gracefully):', e);
      };
      audioRef.current = audio;
    } catch (e) {
      console.warn('Audio initialization not supported or blocked:', e);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStartMusic = useCallback(() => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio autoplay failed or was blocked by browser:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  const handleToggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn('Playback resume failed:', err);
        });
    }
  }, [isPlaying]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#09060f] flex flex-col items-center justify-center">
      <BackgroundDecoration currentScreen={currentScreen} />
      <StoryProgressBar
        currentScreen={currentScreen}
        totalScreens={7}
        onSelectScreen={hasStarted ? setCurrentScreen : undefined}
      />
      <FloatingMusicPlayer
        isPlaying={isPlaying}
        onToggle={handleToggleMusic}
        hasStarted={hasStarted}
      />

      <div className="relative w-full h-full max-w-xl mx-auto flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenMystery
                onStart={() => {
                  handleStartMusic();
                  setCurrentScreen(2);
                }}
              />
            </motion.div>
          )}

          {currentScreen === 2 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenFunnyIntro onContinue={() => setCurrentScreen(3)} />
            </motion.div>
          )}

          {currentScreen === 3 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenBirthdayReveal onNext={() => setCurrentScreen(4)} />
            </motion.div>
          )}

          {currentScreen === 4 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenShruthiiiFile onNext={() => setCurrentScreen(5)} />
            </motion.div>
          )}

          {currentScreen === 5 && (
            <motion.div
              key="screen-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenFriendshipUpdate onNext={() => setCurrentScreen(6)} />
            </motion.div>
          )}

          {currentScreen === 6 && (
            <motion.div
              key="screen-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenTheTrap onNext={() => setCurrentScreen(7)} />
            </motion.div>
          )}

          {currentScreen === 7 && (
            <motion.div
              key="screen-7"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ScreenFinalSurprise onReplay={() => setCurrentScreen(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
