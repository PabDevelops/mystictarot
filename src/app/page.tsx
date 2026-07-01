"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Image from "next/image";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const CardBackSVG = () => (
  <svg viewBox="0 0 400 600" className="absolute inset-0 w-full h-full object-cover">
    <defs>
      <radialGradient id="bgGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
      <linearGradient id="silver" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>

    <rect width="400" height="600" fill="url(#bgGradient)" />

    <rect x="20" y="20" width="360" height="560" rx="16" fill="none" stroke="url(#gold)" strokeWidth="2" opacity="0.8" />
    <rect x="30" y="30" width="340" height="540" rx="8" fill="none" stroke="url(#silver)" strokeWidth="1" opacity="0.6" strokeDasharray="4 4" />

    <g stroke="url(#silver)" strokeWidth="0.5" opacity="0.3">
      <line x1="20" y1="20" x2="380" y2="580" />
      <line x1="380" y1="20" x2="20" y2="580" />
      <line x1="200" y1="20" x2="200" y2="580" />
      <line x1="20" y1="300" x2="380" y2="300" />
      <circle cx="200" cy="300" r="140" fill="none" />
      <circle cx="200" cy="300" r="100" fill="none" />
    </g>

    <g transform="translate(200, 300)">
      <g stroke="url(#gold)" strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="0" y1="-50" x2="0" y2="-75" transform={`rotate(${i * 30})`} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={'s' + i} x1="0" y1="-50" x2="0" y2="-65" transform={`rotate(${i * 30 + 15})`} strokeWidth="1" />
        ))}
      </g>

      <path d="M-20,-30 A 40 40 0 1 0 20,-30 A 30 30 0 1 1 -20,-30" fill="none" stroke="url(#silver)" strokeWidth="3" transform="rotate(-30)" />

      <g stroke="url(#gold)" fill="none" strokeWidth="2">
        <path d="M-35,0 Q0,-25 35,0 Q0,25 -35,0" />
        <circle cx="0" cy="0" r="12" />
        <circle cx="0" cy="0" r="4" fill="url(#gold)" />
      </g>
    </g>
  </svg>
);

type DeckCard = {
  id: string;
  nameEN: string;
  nameES: string;
  image: string;
  randomRotate: number;
  randomX: number;
  randomY: number;
  zIndex: number;
  isFlipped: boolean;
};

const majorArcana = [
  { id: "00", nameEN: "The Fool", nameES: "El Loco", image: "/cards/00-TheFool.png" },
  { id: "01", nameEN: "The Magician", nameES: "El Mago", image: "/cards/01-TheMagician.png" },
  { id: "02", nameEN: "The High Priestess", nameES: "La Suma Sacerdotisa", image: "/cards/02-TheHighPriestess.png" },
  { id: "03", nameEN: "The Empress", nameES: "La Emperatriz", image: "/cards/03-TheEmpress.png" },
  { id: "04", nameEN: "The Emperor", nameES: "El Emperador", image: "/cards/04-TheEmperor.png" },
  { id: "05", nameEN: "The Hierophant", nameES: "El Sumo Sacerdote", image: "/cards/05-TheHierophant.png" },
  { id: "06", nameEN: "The Lovers", nameES: "Los Enamorados", image: "/cards/06-TheLovers.png" },
  { id: "07", nameEN: "The Chariot", nameES: "El Carro", image: "/cards/07-TheChariot.png" },
  { id: "08", nameEN: "Strength", nameES: "La Fuerza", image: "/cards/08-Strength.png" },
  { id: "09", nameEN: "The Hermit", nameES: "El Ermitaño", image: "/cards/09-TheHermit.png" },
  { id: "10", nameEN: "Wheel Of Fortune", nameES: "La Rueda de la Fortuna", image: "/cards/10-WheelOfFortune.png" },
  { id: "11", nameEN: "Justice", nameES: "La Justicia", image: "/cards/11-Justice.png" },
  { id: "12", nameEN: "The Hanged Man", nameES: "El Colgado", image: "/cards/12-TheHangedMan.png" },
  { id: "13", nameEN: "Death", nameES: "La Muerte", image: "/cards/13-Death.png" },
  { id: "14", nameEN: "Temperance", nameES: "La Templanza", image: "/cards/14-Temperance.png" },
  { id: "15", nameEN: "The Devil", nameES: "El Diablo", image: "/cards/15-TheDevil.png" },
  { id: "16", nameEN: "The Tower", nameES: "La Torre", image: "/cards/16-TheTower.png" },
  { id: "17", nameEN: "The Star", nameES: "La Estrella", image: "/cards/17-TheStar.png" },
  { id: "18", nameEN: "The Moon", nameES: "La Luna", image: "/cards/18-TheMoon.png" },
  { id: "19", nameEN: "The Sun", nameES: "El Sol", image: "/cards/19-TheSun.png" },
  { id: "20", nameEN: "Judgement", nameES: "El Juicio", image: "/cards/20-Judgement.png" },
  { id: "21", nameEN: "The World", nameES: "El Mundo", image: "/cards/21-TheWorld.png" },
];

const TRANSLATIONS = {
  EN: {
    chooseLang: "Choose your preferred language to begin.",
    next: "Next",
    intentTitle: "What is your intention?",
    intentSub: "Focus your mind on a single path.",
    intentions: {
      "Love": "Love",
      "Career": "Career",
      "Personal Growth": "Personal Growth",
      "Uncertainty": "Uncertainty"
    },
    continue: "Continue",
    readyMsg1: "Your intentions are set.",
    readyMsg2: "The cards await.",
    drawDestiny: "Draw Your Destiny",
    selectCards: "Select 5 cards",
    cardPlaceholder: "Card",
    readDestiny: "Read My Destiny",
    reading: "Reading...",
    summoning: "Summoning Your Destiny...",
    revealed: "Your Destiny Revealed",
    gazing: "Gazing into the cosmic threads...",
    readAgain: "Read Again",
    changeFocus: "Change Focus",
    error: "The cosmos are currently clouded",
    subtitle: "Seek guidance from the cards. Unveil the past, understand the present, and glimpse the future."
  },
  ES: {
    chooseLang: "Elige tu idioma preferido para comenzar.",
    next: "Siguiente",
    intentTitle: "¿Cuál es tu intención?",
    intentSub: "Enfoca tu mente en un solo camino.",
    intentions: {
      "Love": "Amor",
      "Career": "Trabajo",
      "Personal Growth": "Crecimiento Personal",
      "Uncertainty": "Incertidumbre"
    },
    continue: "Continuar",
    readyMsg1: "Tus intenciones están claras.",
    readyMsg2: "Las cartas aguardan.",
    drawDestiny: "Descubre tu Destino",
    selectCards: "Selecciona 5 cartas",
    cardPlaceholder: "Carta",
    readDestiny: "Leer mi Destino",
    reading: "Leyendo...",
    summoning: "Invocando tu Destino...",
    revealed: "Tu Destino Revelado",
    gazing: "Observando los hilos cósmicos...",
    readAgain: "Leer de Nuevo",
    changeFocus: "Cambiar Enfoque",
    error: "El cosmos está nublado en este momento",
    subtitle: "Busca la guía de las cartas. Desvela el pasado, comprende el presente y vislumbra el futuro."
  }
};

const INTENTS = ["Love", "Career", "Personal Growth", "Uncertainty"] as const;

export default function TarotApp() {
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [drawn, setDrawn] = useState<DeckCard[]>([]);
  const [readingResult, setReadingResult] = useState<string>("");
  const [displayedResult, setDisplayedResult] = useState<string>("");
  const [isReading, setIsReading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Credits & Paywall
  const [credits, setCredits] = useState(3);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // Onboarding Wizard State
  const [onboardingStep, setOnboardingStep] = useState(0); // 0: Welcome, 1: Intent, 2: Ready, 3: Main App
  const [intent, setIntent] = useState<string>("");
  const [language, setLanguage] = useState<string>("EN");
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.EN;

  useEffect(() => {
    const savedLang = localStorage.getItem("tarotLanguage");
    if (savedLang) setLanguage(savedLang);

    // Initialize credits with daily reset
    const stored = JSON.parse(localStorage.getItem('tarotCredits') || '{}');
    const today = new Date().toDateString();
    if (stored.date !== today) {
      const fresh = { credits: 3, date: today };
      localStorage.setItem('tarotCredits', JSON.stringify(fresh));
      setCredits(3);
    } else {
      setCredits(stored.credits ?? 3);
    }

    // Verify Stripe payment on redirect back
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success') === 'true') {
      const sessionId = params.get('session_id');
      if (sessionId) {
        fetch(`/api/verify-payment?session_id=${sessionId}`)
          .then(r => r.json())
          .then(data => {
            if (data.success) {
              const current = JSON.parse(localStorage.getItem('tarotCredits') || '{}');
              const newCredits = (current.credits ?? 0) + (data.credits ?? 5);
              const updated = { ...current, credits: newCredits };
              localStorage.setItem('tarotCredits', JSON.stringify(updated));
              setCredits(newCredits);
            }
          })
          .catch(() => {});
      }
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("tarotLanguage", lang);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (displayedResult.length < readingResult.length) {
      const diff = readingResult.length - displayedResult.length;
      const step = diff > 120 ? 6 : diff > 60 ? 4 : diff > 25 ? 2 : 1;
      const timeout = setTimeout(() => {
        setDisplayedResult(readingResult.slice(0, displayedResult.length + step));
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [readingResult, displayedResult]);

  const resetReading = () => {
    setDrawn([]);
    setReadingResult("");
    setDisplayedResult("");
    setIsReading(false);

    // Initialize 22 cards with messy pile transforms
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 768;

    const spreadX = Math.min(vw * 0.7, 1000);
    const spreadY = Math.min(vh * 0.45, 500);

    const shuffled = [...majorArcana].sort(() => 0.5 - Math.random());
    const initialDeck = shuffled.map((card) => ({
      ...card,
      randomRotate: mobile ? (Math.random() * 10 - 5) : Math.random() * 360 - 180,
      randomX: mobile ? 0 : Math.random() * spreadX - (spreadX / 2),
      randomY: mobile ? 0 : Math.random() * spreadY - (spreadY / 2),
      zIndex: Math.floor(Math.random() * 100),
      isFlipped: false,
    }));
    setDeck(initialDeck);
  };

  const handleShuffle = () => {
    if (isShuffling) return;
    
    setIsShuffling(true);
    // Put drawn cards back visually first by resetting the array to full (centered)
    setDrawn([]);
    setReadingResult("");
    setDisplayedResult("");
    setIsReading(false);
    setDeck([...majorArcana].map(c => ({...c, randomRotate:0, randomX:0, randomY:0, zIndex: Math.random()*100, isFlipped:false})));

    setTimeout(() => {
      resetReading();
      setIsShuffling(false);
    }, 1200);
  };

  useEffect(() => {
    if (onboardingStep === 3) {
      resetReading();
    }
  }, [onboardingStep]);

  const drawCard = (card: DeckCard) => {
    if (drawn.length >= 5) return;
    setDeck(prev => prev.filter(c => c.id !== card.id));
    setDrawn(prev => [...prev, card]);
    setTimeout(() => {
      setDrawn(prev => prev.map(c => c.id === card.id ? { ...c, isFlipped: true } : c));
    }, 700);
  };

  const spendCredit = (): boolean => {
    const stored = JSON.parse(localStorage.getItem('tarotCredits') || '{}');
    if ((stored.credits ?? 0) <= 0) return false;
    const updated = { ...stored, credits: stored.credits - 1 };
    localStorage.setItem('tarotCredits', JSON.stringify(updated));
    setCredits(updated.credits);
    return true;
  };

  const handleBuyCredits = async () => {
    setIsPurchasing(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: language === 'ES' ? 'es' : 'en' }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert('Error al conectar con el sistema de pago.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const getReading = async () => {
    if (!spendCredit()) {
      setShowPaywall(true);
      return;
    }
    setIsReading(true);
    setReadingResult("");
    setDisplayedResult("");
    try {
      const cardNames = drawn.map(c => language === 'ES' ? c.nameES : c.nameEN);
      const res = await fetch('/api/read-tirada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: cardNames, intent, language }),
      });
      if (!res.ok || !res.body) {
        throw new Error("Failed to connect to the cosmos.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setReadingResult(prev => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err: any) {
      setReadingResult(t.error);
    } finally {
      setIsReading(false);
    }
  };

  const handleResetToWizard = () => {
    setOnboardingStep(0);
  };

  const AFFILIATE_BOOKS = [
    { titleEN: "The Classic Tarot Deck", titleES: "El Mazo Clásico de Tarot", url: "https://www.amazon.com/s?k=tarot+deck&tag=mystictarot-21", emoji: "🃏" },
    { titleEN: "Tarot: The Complete Guide", titleES: "Tarot: La Guía Completa", url: "https://www.amazon.com/s?k=tarot+guide+book&tag=mystictarot-21", emoji: "📖" },
    { titleEN: "The Mystic Journal", titleES: "El Diario Místico", url: "https://www.amazon.com/s?k=mystic+journal+spiritual&tag=mystictarot-21", emoji: "📓" },
  ];

  return (
    <div className="h-[100dvh] md:h-screen bg-[#0a0a0f] text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-mystic-900/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <AnimatePresence mode="wait">
        {onboardingStep < 3 && (
          <motion.div 
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-slate-900/60 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              {/* Back button logic */}
              {onboardingStep > 0 && (
                <button 
                  onClick={() => setOnboardingStep(prev => prev - 1)} 
                  className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium touch-manipulation min-h-[44px]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
              )}
              
              <AnimatePresence mode="wait">
                {onboardingStep === 0 && (
                  <motion.div key="step0" initial={{opacity:0, x: 20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="w-full flex flex-col items-center pt-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-500 to-neon-accent mb-4 tracking-tight">Mystic Tarot</h1>
                    <p className="text-slate-400 mb-8 text-sm">{t.chooseLang}</p>
                    <div className="flex gap-4 mb-8 w-full">
                       <button onClick={() => handleLanguageChange('EN')} className={cn("flex-1 py-4 rounded-xl border transition-all text-sm font-bold tracking-widest touch-manipulation", language === 'EN' ? "bg-mystic-600 border-mystic-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" : "border-slate-700 hover:bg-slate-800 text-slate-400")}>ENGLISH</button>
                       <button onClick={() => handleLanguageChange('ES')} className={cn("flex-1 py-4 rounded-xl border transition-all text-sm font-bold tracking-widest touch-manipulation", language === 'ES' ? "bg-mystic-600 border-mystic-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" : "border-slate-700 hover:bg-slate-800 text-slate-400")}>ESPAÑOL</button>
                    </div>
                    <button onClick={() => setOnboardingStep(1)} className="w-full py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-xl text-white font-bold tracking-widest uppercase transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] min-h-[44px] touch-manipulation">{t.next}</button>
                  </motion.div>
                )}

                {onboardingStep === 1 && (
                  <motion.div key="step1" initial={{opacity:0, x: 20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="w-full flex flex-col items-center pt-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">{t.intentTitle}</h2>
                    <p className="text-slate-400 mb-8 text-sm">{t.intentSub}</p>
                    <div className="flex flex-col gap-3 w-full mb-8">
                      {INTENTS.map(opt => (
                        <button 
                           key={opt} 
                           onClick={() => setIntent(opt)} 
                           className={cn("px-6 py-4 rounded-xl border transition-all text-left font-medium touch-manipulation min-h-[44px]", intent === opt ? "bg-mystic-600/50 border-mystic-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" : "border-slate-700 hover:bg-slate-800 text-slate-300")}
                        >
                           {t.intentions[opt]}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setOnboardingStep(2)} disabled={!intent} className="w-full py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 hover:from-mystic-500 hover:to-neon-accent rounded-xl text-white font-bold tracking-widest uppercase transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation">{t.continue}</button>
                  </motion.div>
                )}

                {onboardingStep === 2 && (
                  <motion.div key="step2" initial={{opacity:0, x: 20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="w-full flex flex-col items-center pt-8">
                     <div className="w-24 h-24 mb-6 border-4 border-dashed border-mystic-500/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        <span className="text-4xl animate-none">🔮</span>
                     </div>
                     <p className="text-xl font-serif italic text-mystic-300 mb-10 leading-relaxed">"{t.readyMsg1}<br/>{t.readyMsg2}"</p>
                     <button onClick={() => setOnboardingStep(3)} className="w-full py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 hover:from-mystic-500 hover:to-neon-accent rounded-xl text-white font-bold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 min-h-[44px] touch-manipulation">{t.drawDestiny}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
      {onboardingStep === 3 && (
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.6 }}
         className="flex-1 flex flex-col md:flex-row w-full h-full relative z-10"
      >
        {/* Top Right Controls */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3">
          {/* Credits Badge */}
          <div className={`px-3 py-2 rounded-full text-xs font-bold border backdrop-blur-md flex items-center gap-1 min-h-[44px] ${credits <= 1 ? 'bg-red-900/50 border-red-500/50 text-red-300' : 'bg-slate-900/50 border-slate-700/50 text-slate-300'}`}>
            <span>✨</span>
            <span>{credits}</span>
          </div>
          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="p-2 sm:p-3 rounded-full bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-neon-accent transition-all backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center min-w-[44px] min-h-[44px] touch-manipulation disabled:opacity-50 disabled:pointer-events-none"
            title={language === 'ES' ? "Barajar cartas" : "Shuffle Cards"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          
          {/* Settings / Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 sm:p-3 rounded-full bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white transition-all backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center min-w-[44px] min-h-[44px] touch-manipulation relative z-50"
              title={language === 'ES' ? "Menú" : "Menu"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-slate-900/90 border border-slate-700/50 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col py-2 z-40"
                >
                 <div className="px-4 py-3 pb-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {language === 'ES' ? "Cambiar Enfoque" : "Change Focus"}
                 </div>
                 {INTENTS.map(opt => (
                    <button key={opt} onClick={() => { setIntent(opt); handleShuffle(); setIsMenuOpen(false); }} className={cn("px-4 py-2 text-sm text-left hover:bg-slate-800 transition-colors", intent === opt ? "text-neon-accent font-medium" : "text-slate-300")}>
                       {t.intentions[opt]}
                    </button>
                 ))}
                 <div className="px-4 py-3 pb-1 mt-1 border-t border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {language === 'ES' ? "Opciones" : "Options"}
                 </div>
                 <div className="px-4 py-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{language === 'ES' ? "Idioma" : "Language"}</span>
                    <div className="flex gap-1 bg-slate-950 p-1 rounded-md border border-white/5">
                       <button onClick={() => handleLanguageChange('EN')} className={cn("px-2 py-1 rounded text-[10px] font-bold transition-all", language === 'EN' ? "bg-mystic-600 text-white" : "text-slate-500 hover:text-slate-300")}>EN</button>
                       <button onClick={() => handleLanguageChange('ES')} className={cn("px-2 py-1 rounded text-[10px] font-bold transition-all", language === 'ES' ? "bg-mystic-600 text-white" : "text-slate-500 hover:text-slate-300")}>ES</button>
                    </div>
                 </div>
                 <button onClick={() => { handleResetToWizard(); setIsMenuOpen(false); }} className="px-4 py-2 text-sm text-left hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                    {language === 'ES' ? "Reiniciar Todo" : "Restart Wizard"}
                 </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Drawn Cards Slots (Sidebar) */}
        <section className="w-full md:w-[245px] h-auto md:h-full bg-slate-900/60 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/5 py-4 px-2 sm:px-4 flex flex-col items-center shrink-0 z-20 overflow-visible md:overflow-hidden order-last md:order-first pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] md:pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none">
        <h2 className="hidden md:block text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-2 sm:mb-4 text-center leading-relaxed shrink-0">
          {t.selectCards}<br />({drawn.length}/5)
        </h2>

        <div className="flex flex-row md:flex-col items-center justify-center md:justify-evenly gap-2 md:gap-2 w-full flex-1 min-h-0 md:pb-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const drawnCard = drawn[index];

            return (
              <div key={`slot-${index}`} className="flex flex-col items-center flex-1 min-h-0 w-[18vw] max-w-[80px] md:w-full md:max-w-none justify-center relative shrink-0">
                <div
                  className={cn(
                    "aspect-[2/3] max-w-full max-h-[160px] w-full h-auto md:w-auto md:h-full border-2 border-dashed border-slate-700/50 rounded-xl flex items-center justify-center relative perspective-1000 shadow-[0_0_20px_rgba(139,92,246,0.05)] transition-all touch-manipulation",
                    isReading ? "animate-pulse border-mystic-500/50 bg-mystic-900/20" : "bg-slate-800/20"
                  )}
                >
                  {!drawnCard && (
                    <span className="hidden md:inline text-slate-600 text-xs sm:text-sm font-medium tracking-widest uppercase">
                      {t.cardPlaceholder} {index + 1}
                    </span>
                  )}

                  {drawnCard && (
                    <motion.div
                      layoutId={`card-${drawnCard.id}`}
                      className="absolute inset-0 z-10 perspective-1000"
                      animate={{ rotate: 0, x: 0, y: 0 }}
                    >
                      <motion.div
                        className="w-full h-full relative transform-style-3d transition-all duration-700 ease-out"
                        animate={{ rotateY: drawnCard.isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
                      >
                        {/* Face Down (Back) */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-slate-900 shadow-xl">
                          <CardBackSVG />
                          <div className="absolute inset-0 border border-mystic-500/30 rounded-xl pointer-events-none" />
                        </div>

                        {/* Face Up (Front) */}
                        <div
                          className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-black shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col overflow-hidden"
                          style={{ transform: "rotateY(180deg)" }}
                        >
                          <div className="relative flex-1 w-full bg-slate-950">
                            <Image src={drawnCard.image} alt={language === 'ES' ? drawnCard.nameES : drawnCard.nameEN} fill className="object-contain p-1" />
                          </div>
                          <div className="min-h-[2rem] sm:min-h-[2.5rem] py-1 w-full flex items-center justify-center bg-slate-950 border-t border-neon-accent/20 z-10 shrink-0">
                            <h3 className="text-[8px] sm:text-[10px] font-bold text-white tracking-widest uppercase text-center px-1 leading-tight">{language === 'ES' ? drawnCard.nameES : drawnCard.nameEN}</h3>
                          </div>
                          <div className="absolute inset-0 border border-neon-accent/30 rounded-xl pointer-events-none z-20" />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}

          <AnimatePresence>
            {drawn.length === 5 && drawn.every(c => c.isFlipped) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute md:relative bottom-[calc(100%+1rem)] md:bottom-auto left-4 right-4 md:left-auto md:right-auto md:w-full mt-2 shrink-0 z-50"
              >
                <button
                  onClick={getReading}
                  disabled={isReading}
                  className="w-full py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 hover:from-mystic-500 hover:to-neon-accent text-white text-[12px] sm:text-xs font-bold tracking-widest uppercase rounded-xl shadow-[0_10px_30px_rgba(139,92,246,0.6)] transition-all transform hover:scale-105 active:scale-95 border border-white/10 disabled:opacity-50 disabled:cursor-wait text-center leading-tight min-h-[44px] touch-manipulation"
                >
                  {isReading ? t.reading : t.readDestiny}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Main Content Area (Header + Pile) */}
      <div className="flex-1 h-full flex flex-col relative z-10 overflow-hidden">
        {/* Header */}
        <header className="pt-8 sm:pt-12 pb-2 sm:pb-4 text-center z-10 shrink-0 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-mystic-500 to-neon-accent mb-2 md:mb-4 px-4"
          >
            Mystic Tarot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-md mx-auto px-4 text-sm md:text-base hidden md:block"
          >
            {t.subtitle}
          </motion.p>
        </header>

        {/* Messy Pile Area */}
        <main className="flex-1 w-full relative flex md:items-center justify-center z-10 overflow-y-auto md:overflow-hidden">
          <div className={cn(
            "w-full max-w-[500px] md:max-w-none mx-auto",
            isMobile ? "grid grid-cols-3 gap-3 p-4 pb-[80px]" : "relative flex items-center justify-center h-full w-full"
          )}>
            <AnimatePresence>
              {deck.map((card) => (
                <motion.div
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  className={cn(
                    "cursor-pointer perspective-1000 shadow-xl touch-manipulation min-w-[44px] min-h-[44px]",
                    isMobile ? "relative w-full aspect-[2/3] h-auto" : "absolute w-24 h-36 sm:w-32 sm:h-48"
                  )}
                  animate={isShuffling ? {
                    rotate: [null, (Math.random() * 60 - 30), (Math.random() * -60 + 30), (Math.random() * 20 - 10)],
                    x: isMobile ? [null, (Math.random() * 20 - 10), (Math.random() * -20 + 10), 0] : [null, (Math.random() * 140 - 70), (Math.random() * -140 + 70), 0],
                    y: isMobile ? [null, (Math.random() * 20 - 10), (Math.random() * -20 + 10), 0] : [null, (Math.random() * 60 - 30), (Math.random() * -60 + 30), 0],
                    scale: 1,
                    zIndex: card.zIndex,
                  } : {
                    rotate: isMobile ? 0 : card.randomRotate,
                    x: isMobile ? 0 : card.randomX,
                    y: isMobile ? 0 : card.randomY,
                    scale: isMobile ? 1 : 0.8,
                    zIndex: card.zIndex,
                  }}
                  transition={isShuffling 
                    ? { duration: 1.0, times: [0, 0.4, 0.7, 1], ease: "easeInOut" } 
                    : { duration: 0.6, type: "spring", bounce: 0.3 }
                  }
                  whileHover={{ scale: isMobile ? 1.05 : 0.9, zIndex: 100 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => drawCard(card)}
                >
                  {/* Card Back for Pile */}
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-slate-900 border border-white/5">
                    <CardBackSVG />
                    <div className="absolute inset-0 border border-mystic-500/30 rounded-xl pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
      </motion.div>
      )}
      </AnimatePresence>

      {/* Modal Overlay for Reading Result */}
      <AnimatePresence>
        {(isReading || readingResult) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          >
            {/* Magical background glowing portal orb */}
            <div className="absolute w-[500px] h-[500px] bg-mystic-600/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />

            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 40, rotateX: 15, filter: "blur(12px)" }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.8, opacity: 0, y: 20, filter: "blur(12px)" }}
              transition={{ duration: 0.7, type: "spring", damping: 22, stiffness: 100 }}
              className="bg-gradient-to-b from-[#13111C]/95 to-[#08080c]/95 border border-mystic-500/40 p-8 sm:p-12 rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] max-w-3xl w-full max-h-[85vh] overflow-y-auto relative z-10"
            >
              {!isReading && (
                <button
                  onClick={handleShuffle}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-500 hover:text-white transition-colors p-3 rounded-full hover:bg-white/5 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Close reading"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}

              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-400 via-purple-300 to-neon-accent mb-8 text-center tracking-tight"
              >
                {isReading && displayedResult.length === 0 ? t.summoning : t.revealed}
              </motion.h2>

              {/* Mystical Loading / Summoning State */}
              {isReading && displayedResult.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-mystic-500/50 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-3 rounded-full border border-neon-accent/40"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      🔮
                    </motion.div>
                  </div>
                  <p className="text-mystic-300 font-serif tracking-widest text-xs sm:text-sm uppercase animate-pulse text-center">
                    {t.gazing}
                  </p>
                </div>
              )}

              {/* Typewriter Text Display */}
              {displayedResult && (
                <div className="space-y-6 text-slate-200 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-serif min-h-[150px]">
                  <span>{displayedResult}</span>
                  {(isReading || displayedResult.length < readingResult.length) && (
                    <span className="inline-block w-2 h-4 ml-1 bg-neon-accent align-middle animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                  )}
                </div>
              )}

              {!isReading && displayedResult.length === readingResult.length && readingResult.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex flex-col sm:flex-row justify-center gap-4 border-t border-mystic-500/20 pt-6"
                >
                  <button
                    onClick={handleShuffle}
                    className="px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 hover:from-mystic-500 hover:to-neon-accent text-white font-bold tracking-widest uppercase rounded-full transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 border border-white/10 text-xs sm:text-sm min-h-[44px] touch-manipulation w-full md:w-auto"
                  >
                    {t.readAgain}
                  </button>
                  <div className="relative w-full md:w-auto">
                    <select
                      value={intent}
                      onChange={(e) => {
                         setIntent(e.target.value);
                         handleShuffle();
                      }}
                      className="appearance-none px-8 py-4 w-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-bold tracking-widest uppercase rounded-full transition-all border border-slate-700/50 hover:border-slate-500 text-xs sm:text-sm min-h-[44px] touch-manipulation outline-none cursor-pointer text-center md:text-left pr-12"
                    >
                      {INTENTS.map(opt => (
                        <option key={opt} value={opt} className="bg-slate-900 normal-case font-sans tracking-normal">
                          {language === 'ES' ? "Cambiar a: " : "Switch to: "} {t.intentions[opt]}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Affiliate Links */}
              {!isReading && displayedResult.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center mb-3">
                    {language === 'ES' ? 'Profundiza tu camino' : 'Deepen your path'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {AFFILIATE_BOOKS.map((book, i) => (
                      <a
                        key={i}
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-white/5 hover:border-mystic-500/30 hover:bg-slate-800 transition-all text-xs text-slate-400 hover:text-white group"
                      >
                        <span className="text-lg">{book.emoji}</span>
                        <span className="leading-tight group-hover:text-mystic-300 transition-colors">
                          {language === 'ES' ? book.titleES : book.titleEN}
                        </span>
                        <svg className="ml-auto w-3 h-3 opacity-40 group-hover:opacity-100 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setShowPaywall(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-[#13111C] to-[#08080c] border border-mystic-500/50 p-8 sm:p-12 rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.4)] max-w-md w-full text-center relative"
            >
              <div className="text-6xl mb-4 animate-bounce">✨</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-400 to-neon-accent mb-3">
                {language === 'ES' ? 'Has agotado tus tiradas' : 'You\'ve used all your readings'}
              </h2>
              <p className="text-slate-400 text-sm mb-2">
                {language === 'ES'
                  ? 'Las fuerzas cósmicas se renuevan cada día. Vuelve mañana para 3 tiradas gratuitas, o desbloquea 5 lecturas ahora.'
                  : 'The cosmic forces renew each day. Come back tomorrow for 3 free readings, or unlock 5 now.'}
              </p>
              <p className="text-mystic-400 font-bold text-lg mb-8">
                {language === 'ES' ? '5 tiradas por solo €0.99' : '5 readings for just €0.99'}
              </p>
              <button
                onClick={handleBuyCredits}
                disabled={isPurchasing}
                className="w-full py-4 bg-gradient-to-r from-mystic-600 to-neon-accent text-white font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(139,92,246,0.5)] disabled:opacity-60 disabled:pointer-events-none mb-3 min-h-[44px]"
              >
                {isPurchasing
                  ? (language === 'ES' ? 'Redirigiendo...' : 'Redirecting...')
                  : (language === 'ES' ? '🔮 Desbloquear 5 Tiradas — €0.99' : '🔮 Unlock 5 Readings — €0.99')}
              </button>
              <button
                onClick={() => setShowPaywall(false)}
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                {language === 'ES' ? 'Volver mañana' : 'Come back tomorrow'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
