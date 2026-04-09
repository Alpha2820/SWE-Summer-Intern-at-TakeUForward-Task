import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  CheckCircle2,
  Trash2,
  Upload,
  Palette,
  Type,
  LayoutGrid,
  Sparkles,
  BarChart2,
  Smile,
  Zap,
  Calendar,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
  isBefore,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";

const THEMES = {
  light: {
    name: "Light", bg: "#F0F2F5", card: "#ffffff", text: "#0f172a",
    sub: "#94a3b8", border: "#e2e8f0", input: "#f8fafc", accent: "#2196f3",
    heroOverlay: "#2196f3", rangeBg: "#bfdbfe", sundayBg: "#fff1f2",
    mutedText: "#cbd5e1", savedBg: "#f8fafc", icon: "#2196f3",
  },
  dark: {
    name: "Dark", bg: "#020617", card: "#0f172a", text: "#f1f5f9",
    sub: "#64748b", border: "#1e293b", input: "#020617", accent: "#3b82f6",
    heroOverlay: "#1d4ed8", rangeBg: "#1d4ed8", sundayBg: "#1c0a0a",
    mutedText: "#334155", savedBg: "#1e293b", icon: "#60a5fa",
  },
  forest: {
    name: "Forest", bg: "#f0fdf4", card: "#ffffff", text: "#14532d",
    sub: "#6b7280", border: "#bbf7d0", input: "#f0fdf4", accent: "#16a34a",
    heroOverlay: "#15803d", rangeBg: "#86efac", sundayBg: "#fef9c3",
    mutedText: "#d1fae5", savedBg: "#f0fdf4", icon: "#16a34a",
  },
  ocean: {
    name: "Ocean", bg: "#f0f9ff", card: "#ffffff", text: "#0c4a6e",
    sub: "#64748b", border: "#bae6fd", input: "#f0f9ff", accent: "#0284c7",
    heroOverlay: "#0369a1", rangeBg: "#7dd3fc", sundayBg: "#fdf4ff",
    mutedText: "#e0f2fe", savedBg: "#f0f9ff", icon: "#0284c7",
  },
  sunset: {
    name: "Sunset", bg: "#fff7ed", card: "#ffffff", text: "#7c2d12",
    sub: "#a8a29e", border: "#fed7aa", input: "#fff7ed", accent: "#ea580c",
    heroOverlay: "#c2410c", rangeBg: "#fdba74", sundayBg: "#fdf2f8",
    mutedText: "#fed7aa", savedBg: "#fff7ed", icon: "#ea580c",
  },
  lavender: {
    name: "Lavender", bg: "#faf5ff", card: "#ffffff", text: "#4c1d95",
    sub: "#a78bfa", border: "#ddd6fe", input: "#faf5ff", accent: "#7c3aed",
    heroOverlay: "#6d28d9", rangeBg: "#c4b5fd", sundayBg: "#fdf2f8",
    mutedText: "#ddd6fe", savedBg: "#faf5ff", icon: "#7c3aed",
  },
};

const FONTS = [
  { name: "Default", value: "Inter, sans-serif" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Mono", value: "'Courier New', monospace" },
  { name: "Rounded", value: "'Trebuchet MS', sans-serif" },
  { name: "Elegant", value: "'Palatino Linotype', serif" },
];

const BACKGROUNDS = [
  { name: "Photo", value: "photo" },
  { name: "Gradient 1", value: "gradient1" },
  { name: "Gradient 2", value: "gradient2" },
  { name: "Gradient 3", value: "gradient3" },
  { name: "Pattern", value: "pattern" },
  { name: "Mesh", value: "mesh" },
];

const getBgStyle = (bg) => {
  switch (bg) {
    case "gradient1": return { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" };
    case "gradient2": return { background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fda085 100%)" };
    case "gradient3": return { background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" };
    case "mesh": return {
      background: `radial-gradient(at 40% 20%, #ff6b6b 0px, transparent 50%),
        radial-gradient(at 80% 0%, #feca57 0px, transparent 50%),
        radial-gradient(at 0% 50%, #48dbfb 0px, transparent 50%),
        radial-gradient(at 80% 50%, #ff9ff3 0px, transparent 50%),
        radial-gradient(at 0% 100%, #54a0ff 0px, transparent 50%)`,
      backgroundColor: "#1a1a2e",
    };
    case "pattern": return {
      backgroundColor: "#667eea",
      backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
      backgroundSize: "24px 24px",
    };
    default: return {};
  }
};

const MOODS = [
  { emoji: "😊", label: "Happy", color: "#facc15" },
  { emoji: "😔", label: "Sad", color: "#60a5fa" },
  { emoji: "😤", label: "Stressed", color: "#f87171" },
  { emoji: "🔥", label: "Motivated", color: "#fb923c" },
  { emoji: "😴", label: "Tired", color: "#a78bfa" },
  { emoji: "😌", label: "Calm", color: "#34d399" },
];

const TEMPLATES = [
  { label: "📋 Daily Standup", text: "Yesterday: \nToday: \nBlockers: " },
  { label: "💪 Workout Log", text: "Exercise: \nSets/Reps: \nNotes: " },
  { label: "🍽️ Meal Plan", text: "Breakfast: \nLunch: \nDinner: \nSnacks: " },
  { label: "📓 Journal", text: "Grateful for: \nHighlight: \nTomorrow: " },
  { label: "📚 Study Plan", text: "Topic: \nGoal: \nResources: \nProgress: " },
];

function ConfettiPiece({ color, x, delay }) {
  return (
    <motion.div
      style={{
        position: "fixed", top: -10, left: `${x}%`,
        width: 10, height: 10,
        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
        backgroundColor: color, zIndex: 9999, pointerEvents: "none",
      }}
      initial={{ y: -10, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: window.innerHeight + 20, opacity: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
        x: Math.random() * 200 - 100, scale: [1, 1.2, 0.8],
      }}
      transition={{ duration: 2.5, delay, ease: "easeIn" }}
    />
  );
}

function Confetti({ active }) {
  const pieces = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: ["#2196f3","#f59e0b","#10b981","#ef4444","#8b5cf6","#ec4899","#facc15"][i % 7],
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
    })), []);
  if (!active) return null;
  return <>{pieces.map((p) => <ConfettiPiece key={p.id} {...p} />)}</>;
}

function Heatmap({ savedNotes, theme }) {
  const t = THEMES[theme];
  const months = useMemo(() => {
    const result = [];
    for (let m = 0; m < 12; m++) {
      const start = new Date(2022, m, 1);
      const days = eachDayOfInterval({ start, end: endOfMonth(start) });
      result.push({ label: format(start, "MMM"), days });
    }
    return result;
  }, []);
  return (
    <div style={{ background: t.savedBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: "12px 14px", marginTop: 16 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.sub, marginBottom: 8 }}>
        Note Density — 2022
      </p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {months.map((month) => (
          <div key={month.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 8, color: t.sub, textAlign: "center" }}>{month.label}</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 8px)", gap: 2 }}>
              {month.days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const has = savedNotes[key]?.text?.trim().length > 0;
                return (
                  <div key={day.toString()} title={format(day, "dd MMM")}
                    style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: has ? "#1d4ed8" : "#e2e8f0", transition: "background 0.3s" }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function StatsCard({ savedNotes, moodData, theme, currentDate, onClose }) {
  const t = THEMES[theme];
  const monthKey = format(currentDate, "yyyy-MM");
  const monthNotes = Object.entries(savedNotes).filter(([k]) => k.startsWith(monthKey));
  const totalNotes = monthNotes.length;
  const dayCounts = {};
  monthNotes.forEach(([k]) => {
    const d = new Date(k + "T00:00:00").getDay();
    const name = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d];
    dayCounts[name] = (dayCounts[name] || 0) + 1;
  });
  const busiestDay = Object.entries(dayCounts).sort((a,b) => b[1]-a[1])[0]?.[0] || "—";
  const monthMoods = Object.entries(moodData).filter(([k]) => k.startsWith(monthKey));
  const moodCounts = {};
  monthMoods.forEach(([,v]) => { moodCounts[v] = (moodCounts[v]||0)+1; });
  const topMood = MOODS.find(m => m.emoji === Object.entries(moodCounts).sort((a,b)=>b[1]-a[1])[0]?.[0]);
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = format(d, "yyyy-MM-dd");
    if (savedNotes[k]?.text?.trim()) streak++;
    else break;
  }
  const stats = [
    { label: "Notes This Month", value: totalNotes, icon: "📝" },
    { label: "Busiest Day", value: busiestDay, icon: "📅" },
    { label: "Top Mood", value: topMood ? `${topMood.emoji} ${topMood.label}` : "—", icon: "💭" },
    { label: "Current Streak", value: `${streak} day${streak !== 1 ? "s" : ""} 🔥`, icon: "⚡" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: 16 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ background: t.card, borderRadius: 24, padding: 28, width: "100%", maxWidth: 380, boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: t.text, margin: 0 }}>📊 {format(currentDate, "MMMM")} Stats</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: t.sub }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: t.savedBg, borderRadius: 16, padding: "14px 16px", border: `1px solid ${t.border}` }}>
              <p style={{ fontSize: 20, margin: "0 0 6px" }}>{s.icon}</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: t.accent, margin: "0 0 2px" }}>{s.value}</p>
              <p style={{ fontSize: 10, color: t.sub, margin: 0, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
        {monthMoods.length > 0 && (
          <div style={{ marginTop: 16, background: t.savedBg, borderRadius: 16, padding: "14px 16px", border: `1px solid ${t.border}` }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: t.sub, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Mood Distribution</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MOODS.map(m => {
                const count = moodCounts[m.emoji] || 0;
                if (!count) return null;
                return (
                  <div key={m.emoji} style={{ display: "flex", alignItems: "center", gap: 4, background: `${m.color}22`, borderRadius: 99, padding: "4px 10px" }}>
                    <span style={{ fontSize: 14 }}>{m.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function AIPlannerModal({ date, theme, font, onApply, onClose }) {
  const t = THEMES[theme];
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a daily planner assistant. The user wants to plan their day on ${format(date, "EEEE, MMMM d yyyy")}.

Their description: "${prompt}"

Create a structured, practical daily plan with Morning, Afternoon, and Evening sections. Keep it concise, actionable, and realistic. Format it cleanly with line breaks. Maximum 200 words. No markdown symbols like ** or ##, just plain text with section labels.`,
          }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "Could not generate plan.";
      setResult(text);
    } catch {
      setResult("Failed to generate. Please try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: 16 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ background: t.card, borderRadius: 24, padding: 28, width: "100%", maxWidth: 420, boxShadow: "0 25px 60px rgba(0,0,0,0.3)", fontFamily: font }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: t.text, margin: 0 }}>✨ AI Daily Planner</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: t.sub }}>×</button>
        </div>
        <p style={{ fontSize: 12, color: t.sub, marginBottom: 16 }}>{format(date, "EEEE, MMMM d yyyy")}</p>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your day in one line... e.g. 'DSA revision, gym, project meeting at 3pm'"
          style={{ width: "100%", minHeight: 80, borderRadius: 14, border: `1px solid ${t.border}`, padding: 12, fontSize: 13, resize: "none", outline: "none", background: t.input, color: t.text, fontFamily: font, boxSizing: "border-box" }}
        />
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          style={{
            width: "100%", marginTop: 10, borderRadius: 999, padding: "11px 0",
            fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            border: "none", cursor: loading || !prompt.trim() ? "not-allowed" : "pointer",
            background: loading || !prompt.trim() ? "#e2e8f0" : t.accent,
            color: loading || !prompt.trim() ? "#94a3b8" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Sparkles size={14} /> {loading ? "Generating..." : "Generate Plan"}
        </button>
        {result && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
            <div style={{ background: t.savedBg, borderRadius: 14, padding: "14px 16px", border: `1px solid ${t.border}`, fontSize: 12, color: t.text, lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>
              {result}
            </div>
            <button
              onClick={() => { onApply(result); onClose(); }}
              style={{ width: "100%", marginTop: 10, borderRadius: 999, padding: "11px 0", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", border: "none", cursor: "pointer", background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <CheckCircle2 size={14} /> Use This Plan
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function PerfectWallCalendar() {
  const [savedNotes, setSavedNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("calendarNotes") || "{}"); }
    catch { return {}; }
  });
  const [moodData, setMoodData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("calendarMoods") || "{}"); }
    catch { return {}; }
  });

  const [currentDate, setCurrentDate] = useState(new Date(2022, 0, 1));
  const [range, setRange] = useState({ start: null, end: null });
  const [noteText, setNoteText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState("light");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [noteHistory, setNoteHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [font, setFont] = useState(FONTS[0].value);
  const [heroBg, setHeroBg] = useState("photo");
  const [slideDir, setSlideDir] = useState(1);

  const t = THEMES[theme];
  const width = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 900;

  useEffect(() => {
    try { localStorage.setItem("calendarNotes", JSON.stringify(savedNotes)); } catch {}
  }, [savedNotes]);

  useEffect(() => {
    try { localStorage.setItem("calendarMoods", JSON.stringify(moodData)); } catch {}
  }, [moodData]);

  const holidays = useMemo(() => {
    const year = format(currentDate, "yyyy");
    return [`${year}-01-01`, `${year}-01-26`, `${year}-02-14`];
  }, [currentDate]);

  const { calendarDays, monthStart, monthEnd } = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return {
      calendarDays: eachDayOfInterval({
        start: startOfWeek(start, { weekStartsOn: 1 }),
        end: endOfWeek(end, { weekStartsOn: 1 }),
      }),
      monthStart: start,
      monthEnd: end,
    };
  }, [currentDate]);

  const selectedDateKey = range.start ? format(range.start, "yyyy-MM-dd") : null;

  const handleDateClick = (date) => {
    const key = format(date, "yyyy-MM-dd");
    if (!isWithinInterval(date, { start: monthStart, end: monthEnd }))
      setCurrentDate(startOfMonth(date));
    const startHasSavedNote =
      range.start && savedNotes[format(range.start, "yyyy-MM-dd")]?.text?.trim().length > 0;
    if (!range.start || (range.start && range.end) || startHasSavedNote) {
      setRange({ start: date, end: null });
      setNoteText(savedNotes[key]?.text || "");
      setIsRecurring(savedNotes[key]?.recurring || false);
      setNoteHistory([savedNotes[key]?.text || ""]);
      return;
    }
    if (isBefore(date, range.start)) {
      setRange({ start: date, end: null });
      setNoteText(savedNotes[key]?.text || "");
      setIsRecurring(savedNotes[key]?.recurring || false);
      setNoteHistory([savedNotes[key]?.text || ""]);
      return;
    }
    setRange({ ...range, end: date });
  };

  const handleHeroUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setHeroImageUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return nextUrl; });
    setHeroBg("photo");
  };

  const saveNote = () => {
    if (!selectedDateKey) return;
    setIsSaving(true);
    setTimeout(() => {
      setSavedNotes((prev) => ({ ...prev, [selectedDateKey]: { text: noteText, recurring: isRecurring } }));
      setIsSaving(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setRange({ start: null, end: null });
      setNoteText("");
      setIsRecurring(false);
    }, 500);
  };

  const deleteNote = () => {
    if (!selectedDateKey) return;
    setSavedNotes((prev) => { const { [selectedDateKey]: _, ...rest } = prev; return rest; });
    setRange({ start: null, end: null });
    setNoteText("");
    setIsRecurring(false);
  };

  const goToPrev = () => { setSlideDir(-1); setCurrentDate(subMonths(currentDate, 1)); };
  const goToNext = () => { setSlideDir(1); setCurrentDate(addMonths(currentDate, 1)); };
  const goToToday = () => { setSlideDir(1); setCurrentDate(startOfMonth(new Date())); };

  const heroStyle = heroBg !== "photo" ? getBgStyle(heroBg) : {};

  const heroHeight = isMobile ? 200 : isTablet ? 260 : 320;
  const bodyPadding = isMobile ? "16px 14px 24px" : isTablet ? "20px 20px 28px" : "28px 28px 32px";
  const bodyGap = isMobile ? 20 : 24;
  const btnSize = isMobile ? 30 : 36;
  const btnIconSize = isMobile ? 13 : 16;
  const yearFontSize = isMobile ? 11 : isTablet ? 14 : 18;
  const monthFontSize = isMobile ? 26 : isTablet ? 38 : 52;
  const dayHeight = isMobile ? 34 : 40;
  const dayFontSize = isMobile ? 11 : 13;
  const textareaHeight = isMobile ? 120 : isTablet ? 160 : 200;
  const dropdownRight = isMobile ? -60 : 0;

  const streak = useMemo(() => {
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const k = format(d, "yyyy-MM-dd");
      if (savedNotes[k]?.text?.trim()) s++;
      else break;
    }
    return s;
  }, [savedNotes]);

  const controlBtn = (onClick, icon, extraStyle = {}) => (
    <button onClick={onClick} style={{
      width: btnSize, height: btnSize, borderRadius: "50%",
      background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
      border: "none", cursor: "pointer", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, ...extraStyle,
    }}>
      {icon}
    </button>
  );

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: isMobile ? 8 : 16,
      background: t.bg, transition: "background 0.5s", fontFamily: font,
    }}>
      <Confetti active={showConfetti} />

      <AnimatePresence>
        {showStats && (
          <StatsCard savedNotes={savedNotes} moodData={moodData} theme={theme} currentDate={currentDate} onClose={() => setShowStats(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAI && range.start && (
          <AIPlannerModal date={range.start} theme={theme} font={font} onApply={(text) => setNoteText(text)} onClose={() => setShowAI(false)} />
        )}
      </AnimatePresence>

      <div style={{
        width: "100%", maxWidth: 700, borderRadius: isMobile ? 16 : 24,
        overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
        background: t.card, color: t.text, transition: "background 0.5s, color 0.5s",
      }}>

        {/* ── HERO ── */}
        <div style={{ position: "relative", height: heroHeight, overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={slideDir}>
            <motion.div
              key={format(currentDate, "yyyy-MM")}
              custom={slideDir}
              variants={{
                enter: (d) => ({ rotateY: d > 0 ? 90 : -90, opacity: 0, transformOrigin: d > 0 ? "left center" : "right center" }),
                center: { rotateY: 0, opacity: 1 },
                exit: (d) => ({ rotateY: d > 0 ? -90 : 90, opacity: 0, transformOrigin: d > 0 ? "right center" : "left center" }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0, perspective: 1200 }}
            >
              {heroBg === "photo" ? (
                <img
                  src={heroImageUrl || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="hero"
                />
              ) : (
                <div style={{ width: "100%", height: "100%", ...heroStyle }} />
              )}
              {!heroImageUrl && heroBg === "photo" && (
                <div style={{
                  position: "absolute", bottom: 0, width: "100%",
                  height: isMobile ? 90 : 160,
                  background: t.heroOverlay,
                  clipPath: "polygon(0 60%, 15% 72%, 30% 82%, 45% 72%, 60% 65%, 75% 78%, 90% 68%, 100% 75%, 100% 100%, 0 100%)",
                  zIndex: 10,
                }} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Month/Year label */}
          <div style={{
            position: "absolute", bottom: isMobile ? 12 : 20, right: isMobile ? 14 : 24,
            textAlign: "right", color: "#fff", zIndex: 20,
          }}>
            <p style={{ fontSize: yearFontSize, fontWeight: 300, letterSpacing: isMobile ? 3 : 6, textTransform: "uppercase", opacity: 0.9 }}>
              {format(currentDate, "yyyy")}
            </p>
            <h1 style={{ fontSize: monthFontSize, fontWeight: 900, textTransform: "uppercase", letterSpacing: -2, marginTop: -2, lineHeight: 1 }}>
              {format(currentDate, "MMMM")}
            </h1>
          </div>

          {/* Streak badge */}
          {streak > 0 && (
            <div style={{
              position: "absolute", top: isMobile ? 10 : 16, left: isMobile ? 10 : 16,
              background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
              borderRadius: 99, padding: "5px 12px",
              display: "flex", alignItems: "center", gap: 5,
              color: "#fff", fontSize: 12, fontWeight: 700, zIndex: 20,
            }}>
              🔥 {streak} day streak
            </div>
          )}

          {/* Controls */}
          <div style={{
            position: "absolute", top: isMobile ? 10 : 16, right: isMobile ? 10 : 16,
            display: "flex", gap: isMobile ? 5 : 8, zIndex: 20,
            flexWrap: "nowrap", alignItems: "center",
          }}>
            {controlBtn(goToPrev, <ChevronLeft size={btnIconSize} />)}
            {controlBtn(goToNext, <ChevronRight size={btnIconSize} />)}
            {controlBtn(goToToday, <Calendar size={btnIconSize} />)}
            {controlBtn(() => setShowStats(true), <BarChart2 size={btnIconSize} />)}

            <label style={{
              width: btnSize, height: btnSize, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
              cursor: "pointer", color: "#fff", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Upload size={btnIconSize} />
              <input type="file" accept="image/*" onChange={handleHeroUpload} style={{ display: "none" }} />
            </label>

            {/* Theme picker */}
            <div style={{ position: "relative" }}>
              {controlBtn(() => { setShowThemePicker(!showThemePicker); setShowFontPicker(false); setShowBgPicker(false); }, <Palette size={btnIconSize} />)}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    style={{ position: "absolute", top: btnSize + 8, right: dropdownRight, background: "#fff", borderRadius: 14, padding: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", gap: 4, minWidth: 130, zIndex: 100 }}>
                    {Object.entries(THEMES).map(([key, val]) => (
                      <button key={key} onClick={() => { setTheme(key); setShowThemePicker(false); }}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, border: "none", background: theme === key ? "#f0f9ff" : "transparent", cursor: "pointer", fontSize: 13, color: "#0f172a", fontWeight: theme === key ? 700 : 400 }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: val.accent }} />
                        {val.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Font picker */}
            <div style={{ position: "relative" }}>
              {controlBtn(() => { setShowFontPicker(!showFontPicker); setShowThemePicker(false); setShowBgPicker(false); }, <Type size={btnIconSize} />)}
              <AnimatePresence>
                {showFontPicker && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    style={{ position: "absolute", top: btnSize + 8, right: dropdownRight, background: "#fff", borderRadius: 14, padding: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", gap: 4, minWidth: 150, zIndex: 100 }}>
                    {FONTS.map((f) => (
                      <button key={f.name} onClick={() => { setFont(f.value); setShowFontPicker(false); }}
                        style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: font === f.value ? "#f0f9ff" : "transparent", cursor: "pointer", fontSize: 13, fontFamily: f.value, color: "#0f172a", fontWeight: font === f.value ? 700 : 400, textAlign: "left" }}>
                        {f.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BG picker */}
            <div style={{ position: "relative" }}>
              {controlBtn(() => { setShowBgPicker(!showBgPicker); setShowThemePicker(false); setShowFontPicker(false); }, <LayoutGrid size={btnIconSize} />)}
              <AnimatePresence>
                {showBgPicker && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    style={{ position: "absolute", top: btnSize + 8, right: dropdownRight, background: "#fff", borderRadius: 14, padding: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, minWidth: 180, zIndex: 100 }}>
                    {BACKGROUNDS.map((bg) => {
                      const s = bg.value === "photo" ? { background: "#94a3b8" } : getBgStyle(bg.value);
                      return (
                        <button key={bg.value} onClick={() => { setHeroBg(bg.value); setShowBgPicker(false); }}
                          style={{ height: 44, borderRadius: 8, border: heroBg === bg.value ? "2px solid #2196f3" : "2px solid transparent", cursor: "pointer", fontSize: 10, fontWeight: 600, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.5)", ...s }}>
                          {bg.name}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
          padding: bodyPadding, gap: bodyGap,
          background: t.card, transition: "background 0.5s",
        }}>

          {/* Notes panel */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ padding: 8, borderRadius: 10, background: t.savedBg, flexShrink: 0 }}>
                <PenLine size={15} color={t.icon} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: t.text }}>Notes</p>
                <p style={{ fontSize: 11, color: t.sub }}>Pick a date and write.</p>
              </div>
            </div>

            {selectedDateKey && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ fontSize: 12, color: t.accent, fontWeight: 600, margin: 0 }}>
                  📅 {format(range.start, "dd MMMM yyyy")}
                </p>
                {/* Mood picker */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowMoodPicker(!showMoodPicker)}
                    style={{ background: t.savedBg, border: `1px solid ${t.border}`, borderRadius: 99, padding: "3px 10px", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {moodData[selectedDateKey] || <Smile size={13} color={t.sub} />}
                    <span style={{ fontSize: 10, color: t.sub }}>mood</span>
                  </button>
                  <AnimatePresence>
                    {showMoodPicker && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        style={{ position: "absolute", top: 34, right: 0, zIndex: 50, background: t.card, borderRadius: 14, padding: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", border: `1px solid ${t.border}`, display: "flex", gap: 6, flexWrap: "wrap", minWidth: 180 }}
                      >
                        {MOODS.map(m => (
                          <button key={m.emoji}
                            onClick={() => { setMoodData(prev => ({ ...prev, [selectedDateKey]: m.emoji })); setShowMoodPicker(false); }}
                            title={m.label}
                            style={{ fontSize: 20, background: moodData[selectedDateKey] === m.emoji ? `${m.color}33` : "transparent", border: moodData[selectedDateKey] === m.emoji ? `2px solid ${m.color}` : "2px solid transparent", borderRadius: 8, padding: 4, cursor: "pointer", transition: "all 0.15s" }}
                          >
                            {m.emoji}
                          </button>
                        ))}
                        {moodData[selectedDateKey] && (
                          <button onClick={() => { setMoodData(prev => { const {[selectedDateKey]:_, ...r} = prev; return r; }); setShowMoodPicker(false); }}
                            style={{ fontSize: 10, color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "center" }}>
                            Clear mood
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* AI + Templates toolbar */}
            {selectedDateKey && (
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <button onClick={() => setShowAI(true)}
                  style={{ flex: 1, borderRadius: 99, padding: "6px 0", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", border: "none", cursor: "pointer", background: `${t.accent}18`, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <Sparkles size={11} /> AI Plan
                </button>
                <div style={{ position: "relative", flex: 1 }}>
                  <button onClick={() => setShowTemplates(!showTemplates)}
                    style={{ width: "100%", borderRadius: 99, padding: "6px 0", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", border: "none", cursor: "pointer", background: `${t.accent}18`, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Zap size={11} /> Templates
                  </button>
                  <AnimatePresence>
                    {showTemplates && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        style={{ position: "absolute", top: 34, left: 0, right: 0, zIndex: 50, background: t.card, borderRadius: 14, padding: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", border: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 2, minWidth: 180 }}
                      >
                        {TEMPLATES.map(tmpl => (
                          <button key={tmpl.label}
                            onClick={() => { setNoteText(tmpl.text); setShowTemplates(false); }}
                            style={{ textAlign: "left", padding: "7px 10px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 12, color: t.text, transition: "background 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.background = t.savedBg}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            {tmpl.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              disabled={!selectedDateKey}
              placeholder={selectedDateKey ? "Write your plan here..." : "Select a date to enable notes"}
              maxLength={300}
              style={{
                width: "100%", minHeight: textareaHeight, borderRadius: 18,
                border: `1px solid ${t.border}`, padding: "14px",
                fontSize: isMobile ? 12 : 13, resize: "none", outline: "none",
                background: t.input, color: t.text, fontFamily: font,
                boxSizing: "border-box", transition: "border 0.3s",
              }}
            />
            <p style={{ fontSize: 10, textAlign: "right", color: t.sub, marginTop: 4 }}>
              {noteText.length} / 300
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              <button onClick={saveNote} disabled={!selectedDateKey || isSaving}
                style={{
                  borderRadius: 999, padding: isMobile ? "10px 0" : "11px 0",
                  fontSize: isMobile ? 10 : 11, fontWeight: 700, letterSpacing: 1.5,
                  textTransform: "uppercase", border: "none",
                  cursor: !selectedDateKey || isSaving ? "not-allowed" : "pointer",
                  background: !selectedDateKey || isSaving ? "#e2e8f0" : t.accent,
                  color: !selectedDateKey || isSaving ? "#94a3b8" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  transition: "background 0.3s",
                }}>
                <CheckCircle2 size={13} /> {isSaving ? "Saving..." : "Save"}
              </button>
              <button onClick={deleteNote} disabled={!selectedDateKey || !savedNotes[selectedDateKey]}
                style={{
                  borderRadius: 999, padding: isMobile ? "10px 0" : "11px 0",
                  fontSize: isMobile ? 10 : 11, fontWeight: 700, letterSpacing: 1.5,
                  textTransform: "uppercase", border: "none",
                  cursor: !selectedDateKey || !savedNotes[selectedDateKey] ? "not-allowed" : "pointer",
                  background: !selectedDateKey || !savedNotes[selectedDateKey] ? "#e2e8f0" : "#ef4444",
                  color: !selectedDateKey || !savedNotes[selectedDateKey] ? "#94a3b8" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  transition: "background 0.3s",
                }}>
                <Trash2 size={13} /> Delete
              </button>
            </div>

            <button onClick={() => setShowHeatmap(!showHeatmap)}
              style={{
                marginTop: 14, width: "100%", borderRadius: 999, padding: "8px 0",
                fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                border: `1px solid ${t.border}`, cursor: "pointer",
                background: "transparent", color: t.sub,
              }}>
              {showHeatmap ? "Hide" : "Show"} Heatmap
            </button>
          </div>

          {/* Calendar grid */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 12 }}>
              {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d) => (
                <span key={d} style={{ fontSize: isMobile ? 8 : 9, fontWeight: 700, textAlign: "center", color: t.sub, letterSpacing: 1 }}>
                  {d}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px 0" }}>
              {calendarDays.map((day, i) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const isHol = holidays.includes(dateKey);
                const isSunday = day.getDay() === 0;
                const isSel = range.start && isSameDay(day, range.start);
                const isEnd = range.end && isSameDay(day, range.end);
                const hasNote = savedNotes[dateKey]?.text?.trim().length > 0;
                const mood = moodData[dateKey];
                const inRange = range.start && range.end &&
                  isWithinInterval(day, { start: range.start, end: range.end });
                const isCurrMonth = isWithinInterval(day, { start: monthStart, end: monthEnd });
                const isTodayDate = isToday(day);

                return (
                  <button key={i} onClick={() => handleDateClick(day)}
                    style={{
                      position: "relative", height: dayHeight,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: dayFontSize,
                      fontWeight: isSel || isEnd || isHol || isTodayDate ? 700 : 500,
                      border: isTodayDate && !isSel && !isEnd ? `2px solid ${t.accent}` : "none",
                      cursor: "pointer", borderRadius: 8,
                      background: isSel || isEnd ? t.accent : inRange ? t.rangeBg : isSunday && isCurrMonth ? t.sundayBg : "transparent",
                      color: isSel || isEnd ? "#fff" : !isCurrMonth ? t.mutedText : isSunday ? "#ef4444" : t.text,
                      transform: isSel || isEnd ? "scale(1.1)" : "scale(1)",
                      boxShadow: isSel || isEnd ? `0 4px 14px ${t.accent}55` : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {isHol && isCurrMonth && !isSel && !isEnd && (
                      <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: "#fca5a555", zIndex: 0 }} />
                    )}
                    {mood && isCurrMonth && !isSel && !isEnd && (
                      <div style={{ position: "absolute", inset: 1, borderRadius: 7, border: `2px solid ${MOODS.find(m => m.emoji === mood)?.color || t.accent}`, pointerEvents: "none", zIndex: 0 }} />
                    )}
                    <span style={{ position: "relative", zIndex: 1 }}>{format(day, "d")}</span>
                    {mood && isCurrMonth && (
                      <span style={{ position: "absolute", top: 1, right: 2, fontSize: 7, lineHeight: 1, zIndex: 2 }}>{mood}</span>
                    )}
                    {hasNote && isCurrMonth && (
                      <div style={{
                        position: "absolute", bottom: 3, left: "50%",
                        transform: "translateX(-50%)",
                        width: 4, height: 4, borderRadius: "50%",
                        background: isSel || isEnd ? "#fff" : t.accent,
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Saved notes list */}
            {Object.keys(savedNotes).length > 0 && (
              <div style={{ marginTop: 16, background: t.savedBg, borderRadius: 14, padding: "10px 12px" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.sub, marginBottom: 6 }}>
                  Saved Notes
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 90, overflowY: "auto" }}>
                  {Object.entries(savedNotes)
                    .filter(([, v]) => v?.text?.trim())
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([key, val]) => (
                      <button key={key}
                        onClick={() => {
                          const d = new Date(key + "T00:00:00");
                          setCurrentDate(startOfMonth(d));
                          setRange({ start: d, end: null });
                          setNoteText(val.text);
                          setIsRecurring(val.recurring || false);
                          setNoteHistory([val.text]);
                        }}
                        style={{ textAlign: "left", fontSize: 11, padding: "4px 8px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        <span style={{ fontWeight: 700, color: t.accent, marginRight: 8 }}>{key}</span>
                        {moodData[key] && <span style={{ marginRight: 4 }}>{moodData[key]}</span>}
                        {val.text}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Heatmap */}
        <AnimatePresence>
          {showHeatmap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              style={{ padding: `0 ${isMobile ? 14 : 28}px ${isMobile ? 16 : 24}px`, overflow: "hidden" }}
            >
              <Heatmap savedNotes={savedNotes} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}