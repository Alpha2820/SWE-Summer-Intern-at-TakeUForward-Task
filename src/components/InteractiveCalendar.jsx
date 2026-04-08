import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  CheckCircle2,
  Trash2,
  Moon,
  Sun,
  Upload,
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
} from "date-fns";

export default function PerfectWallCalendar() {
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      const stored = localStorage.getItem("calendarNotes");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [currentDate, setCurrentDate] = useState(new Date(2022, 0, 1));
  const [range, setRange] = useState({ start: null, end: null });
  const [noteText, setNoteText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState("light");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [noteHistory, setNoteHistory] = useState([]);
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      localStorage.setItem("calendarNotes", JSON.stringify(savedNotes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  }, [savedNotes]);

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

  const selectedDateKey = range.start
    ? format(range.start, "yyyy-MM-dd")
    : null;

  const handleDateClick = (date) => {
    const key = format(date, "yyyy-MM-dd");
    if (!isWithinInterval(date, { start: monthStart, end: monthEnd })) {
      setCurrentDate(startOfMonth(date));
    }

    const startHasSavedNote =
      range.start &&
      savedNotes[format(range.start, "yyyy-MM-dd")]?.text?.trim().length > 0;

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
    setHeroImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return nextUrl;
    });
  };

  useEffect(() => {
    return () => {
      if (heroImageUrl) URL.revokeObjectURL(heroImageUrl);
    };
  }, [heroImageUrl]);

  const saveNote = () => {
    if (!selectedDateKey) return;
    setIsSaving(true);
    setTimeout(() => {
      setSavedNotes((prev) => ({
        ...prev,
        [selectedDateKey]: { text: noteText, recurring: isRecurring },
      }));
      setIsSaving(false);
      setRange({ start: null, end: null });
      setNoteText("");
      setIsRecurring(false);
    }, 500);
  };

  const deleteNote = () => {
    if (!selectedDateKey) return;
    setSavedNotes((prev) => {
      const { [selectedDateKey]: _, ...rest } = prev;
      return rest;
    });
    setRange({ start: null, end: null });
    setNoteText("");
    setIsRecurring(false);
  };

  return (
    <div
      className={`calendar-container min-h-screen flex items-center justify-center p-2 md:p-4 transition-colors duration-500 ${isDark ? "bg-slate-950" : "bg-[#F0F2F5]"}`}
    >
      <motion.div
        className={`w-full max-w-[700px] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ${isDark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* HERO SECTION */}
        <div className="relative h-[250px] md:h-[420px] w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={`${heroImageUrl || "default"}-${format(currentDate, "yyyy-MM")}`}
              src={
                heroImageUrl ||
                `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200&v=${currentDate.getMonth()}`
              }
              className={`absolute inset-0 w-full h-full object-cover ${isDark ? "brightness-75" : ""}`}
              initial={{ opacity: 0, x: 30, scale: 1.1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>

          {!heroImageUrl && (
            <div
              className="absolute bottom-0 w-full h-[120px] md:h-[240px] bg-[#2196f3] z-10"
              style={{
                clipPath:
                  "polygon(0 55%, 35% 85%, 50% 55%, 100% 90%, 100% 100%, 0 100%)",
              }}
            />
          )}

          <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 text-right text-white z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={format(currentDate, "MMMM-yyyy")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-lg md:text-3xl font-light tracking-widest uppercase">
                  {format(currentDate, "yyyy")}
                </p>
                <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter -mt-1 md:-mt-2">
                  {format(currentDate, "MMMM")}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-1 md:gap-2 z-20 items-center scale-90 md:scale-100">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all"
            >
              <ChevronRight size={18} />
            </button>
            <label className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-white/30">
              <Upload size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleHeroUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* CALENDAR BODY */}
        <div
          className={`flex flex-col md:grid md:grid-cols-12 pt-6 pb-8 md:pb-12 px-4 md:px-8 transition-colors duration-500 ${isDark ? "bg-slate-900" : "bg-white"}`}
        >
          {/* Notes Section */}
          <div className="w-full md:col-span-5 md:pr-8 mb-8 md:mb-0">
            <div className="flex items-start justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg ${isDark ? "bg-blue-900/50 text-blue-400" : "bg-blue-50 text-blue-600"}`}
                >
                  <PenLine size={16} />
                </div>
                <div>
                  <h3
                    className={`text-sm font-bold ${isDark ? "text-slate-100" : "text-gray-800"}`}
                  >
                    Notes
                  </h3>
                  <p
                    className={`text-[10px] md:text-[11px] ${isDark ? "text-slate-400" : "text-gray-400"}`}
                  >
                    Pick a date and write.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected date label */}
            {selectedDateKey && (
              <p
                className={`text-xs mb-2 px-1 font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                📅 {format(range.start, "dd MMMM yyyy")}
              </p>
            )}

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              disabled={!selectedDateKey}
              placeholder={
                selectedDateKey
                  ? "Write your plan here..."
                  : "Select a date to enable notes"
              }
              className={`w-full min-h-[120px] md:min-h-[220px] rounded-2xl md:rounded-3xl border px-4 py-4 text-sm resize-none outline-none transition-all ${
                isDark
                  ? "border-slate-700 bg-slate-950 text-slate-100 focus:border-blue-500"
                  : "border-gray-200 bg-gray-50 text-gray-700 focus:border-blue-400"
              }`}
            />

            {/* Character counter */}
            {selectedDateKey && (
              <p
                className={`text-[10px] text-right mt-1 px-1 ${isDark ? "text-slate-500" : "text-gray-400"}`}
              >
                {noteText.length} / 300
              </p>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2 md:gap-3">
              <button
                onClick={saveNote}
                disabled={!selectedDateKey || isSaving}
                className={`rounded-full py-2.5 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isSaving || !selectedDateKey ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20"}`}
              >
                <CheckCircle2 size={14} /> {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={deleteNote}
                disabled={!selectedDateKey || !savedNotes[selectedDateKey]}
                className={`rounded-full py-2.5 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${!selectedDateKey || !savedNotes[selectedDateKey] ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20"}`}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>

          {/* Date Grid */}
          <div className="w-full md:col-span-7">
            <div className="grid grid-cols-7 mb-4">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                <span
                  key={d}
                  className={`text-[9px] md:text-[10px] font-bold text-center tracking-tighter ${isDark ? "text-slate-500" : "text-gray-400"}`}
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((day, i) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const isHol = holidays.includes(dateKey);
                const isSunday = day.getDay() === 0;
                const isSel = range.start && isSameDay(day, range.start);
                const isEnd = range.end && isSameDay(day, range.end);
                const hasNote = savedNotes[dateKey]?.text?.trim().length > 0;
                const inRange =
                  range.start &&
                  range.end &&
                  isWithinInterval(day, {
                    start: range.start,
                    end: range.end,
                  });
                const isCurrMonth = isWithinInterval(day, {
                  start: monthStart,
                  end: monthEnd,
                });

                return (
                  <button
                    key={i}
                    onClick={() => handleDateClick(day)}
                    className={`relative h-10 md:h-11 flex items-center justify-center text-xs md:text-sm font-medium transition-all
                      ${!isCurrMonth ? (isDark ? "text-slate-700" : "text-gray-300") : isSunday ? "text-rose-600" : isDark ? "text-slate-300" : "text-gray-700"}
                      ${inRange ? (isDark ? "bg-blue-500/70" : "bg-blue-200") : ""}
                      ${isSunday && isCurrMonth && !isSel && !isEnd ? (isDark ? "bg-red-900/20" : "bg-red-50") : ""}
                      ${isSel || isEnd ? "bg-[#2196f3] !text-white z-10 shadow-lg shadow-blue-500/40 rounded-lg scale-110" : isDark ? "hover:bg-slate-800" : "hover:bg-gray-100 rounded-lg"}
                    `}
                  >
                    {isHol && isCurrMonth && !isSel && !isEnd && (
                      <div
                        className={`absolute inset-1.5 md:inset-2 rounded-full -z-10 animate-pulse ${isDark ? "bg-red-900/30" : "bg-red-100"}`}
                      />
                    )}
                    <span
                      className={
                        (isHol || isSunday) && isCurrMonth && !isSel && !isEnd
                          ? "font-bold"
                          : ""
                      }
                    >
                      {format(day, "d")}
                    </span>

                    {hasNote && isCurrMonth && (
                      <div
                        className={`absolute bottom-0.5 md:bottom-1 w-1 h-1 rounded-full ${
                          isSel || isEnd
                            ? "bg-white"
                            : isDark
                              ? "bg-blue-400"
                              : "bg-blue-600"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Notes summary list */}
            {Object.keys(savedNotes).length > 0 && (
              <div
                className={`mt-6 rounded-2xl p-3 ${isDark ? "bg-slate-800" : "bg-gray-50"}`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-400" : "text-gray-400"}`}
                >
                  Saved Notes
                </p>
                <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto">
                  {Object.entries(savedNotes)
                    .filter(([, v]) => v?.text?.trim())
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => {
                          const d = new Date(key + "T00:00:00");
                          setCurrentDate(startOfMonth(d));
                          setRange({ start: d, end: null });
                          setNoteText(val.text);
                          setIsRecurring(val.recurring || false);
                          setNoteHistory([val.text]);
                        }}
                        className={`text-left text-[11px] px-2 py-1 rounded-lg truncate transition-all ${isDark ? "text-slate-300 hover:bg-slate-700" : "text-gray-600 hover:bg-gray-200"}`}
                      >
                        <span
                          className={`font-bold mr-2 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                        >
                          {key}
                        </span>
                        {val.text}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
