# 🗓️ Perfect Wall Calendar — React

A **premium, feature-rich interactive wall calendar** built with **React**, combining beautiful visual design with real productivity tools including **AI-powered daily planning, mood tracking, streak system, and more**.

---

## ✨ Live Preview

- 🖼️ Dynamic Hero with chevron/diagonal photo layout
- 🤖 AI Daily Planner (powered by Claude AI)
- 😊 Mood Journal with calendar ring indicators
- 📊 Monthly Stats & Streak Tracker
- 🎨 6 Themes × 5 Fonts × 6 Backgrounds
- 🔥 Animated confetti on save
- 📅 Interactive calendar with note density heatmap

---

## 🚀 Features

### 📆 Calendar Functionality

- Monthly calendar view with accurate date generation via **date-fns**
- Previous / Next month navigation with **3D page-flip animation**
- Today button — jumps to current month instantly
- Today's date always highlighted with an accent border ring
- Selected date highlight with scale animation + shadow
- Date range selection
- Sunday & public holiday highlighting
- Dates outside current month shown as muted

### 📝 Notes System

- Add, edit, and delete notes per date
- Notes persist across sessions via **localStorage**
- Note indicator dot shown on calendar dates
- Saved notes list panel — click any to jump to that date
- Character counter (0 / 300)
- Selected date label shown above textarea

### 🤖 AI Daily Planner

- Select any date and click **"AI Plan"**
- Describe your day in one line
- Claude AI generates a structured **Morning / Afternoon / Evening** plan
- One-click **"Use This Plan"** pastes it directly into the note

### ⚡ Quick Templates

- Click **"Templates"** above the textarea when a date is selected
- 5 built-in templates:
  - 📋 Daily Standup
  - 💪 Workout Log
  - 🍽️ Meal Plan
  - 📓 Journal Prompt
  - 📚 Study Plan

### 😊 Mood Journal

- Assign one of 6 moods to any date: 😊 😔 😤 🔥 😴 😌
- Colored ring around the date on the calendar grid
- Tiny mood emoji shown in corner of each date cell
- Moods shown alongside notes in the saved notes list
- Moods persist via localStorage

### 📊 Monthly Stats Card

- Click the bar chart icon in the hero controls
- Shows for the current month:
  - Total notes saved
  - Busiest day of the week
  - Top mood of the month
  - Current writing streak
  - Full mood distribution breakdown

### 🔥 Streak Tracker

- Live **"🔥 X day streak"** badge in the hero
- Counts consecutive days with saved notes
- Resets if a day is missed

### 🎨 Themes & Customization

- **6 color themes**: Light, Dark, Forest, Ocean, Sunset, Lavender
- **5 fonts**: Default, Serif, Mono, Rounded, Elegant
- **6 hero backgrounds**: Photo, Gradient 1, Gradient 2, Gradient 3, Pattern, Mesh
- Upload your own custom hero photo
- All pickers accessible from glassmorphism buttons in the hero

### 🖼️ Hero Design

- Diagonal chevron photo layout (left shape + right shape with month label)
- Smooth **3D rotateY page-flip** animation between months
- Month and year text overlaid on the right chevron shape
- Gradient + polygon overlay blends seamlessly when using default photo

### 📈 Note Density Heatmap

- GitHub-style heatmap showing all 12 months of the year
- Blue dot for every date that has a saved note
- Toggle with "Show / Hide Heatmap" button

### 🎊 Confetti

- 60-piece animated confetti burst every time you save a note

### 📱 Responsive Design

- Fully responsive across mobile, tablet, and desktop
- Notes panel stacks above calendar on mobile
- Hero height, fonts, buttons, and padding all scale with screen size
- Dropdown menus adjust position to prevent overflow on small screens

---

## 🛠️ Tech Stack

| Technology    | Usage                         |
| ------------- | ----------------------------- |
| React.js      | UI Development                |
| date-fns      | Date utilities & calculations |
| Framer Motion | Animations & transitions      |
| Lucide React  | Icons                         |
| Claude AI API | AI Daily Planner              |
| localStorage  | Persistent notes & mood data  |
| CSS-in-JS     | All styling via inline styles |

---

## 📂 Project Structure

src/
│
├── components/
│ └── PerfectWallCalendar.jsx ← Main component (all-in-one)
│
├── App.jsx
├── main.jsx
└── index.css

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/perfect-wall-calendar.git
cd perfect-wall-calendar
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install required packages

```bash
npm install framer-motion lucide-react date-fns
```

### 4️⃣ Run the project

```bash
npm run dev
```

---

## 🧠 Core Logic

**Date generation:**

```js
eachDayOfInterval({
  start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
  end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
});
```

**Note & mood storage:**

```js
// Both keyed by date string
"yyyy-MM-dd" → { text: string, recurring: boolean }
"yyyy-MM-dd" → "😊"
```

**Streak calculation:**

```js
// Walks backwards from today
// Breaks on first missing note
```

**AI Planner API call:**

```js
POST https://api.anthropic.com/v1/messages
model: "claude-sonnet-4-20250514"
// Prompt includes date + user's one-line description
// Returns structured Morning / Afternoon / Evening plan
```

**Range selection logic:**

```js
// First click → sets range.start
// Second click → sets range.end (if no saved note on start date)
// If start date already has a saved note → always starts fresh
```

---

## 🎯 Key Highlights

- 💎 **Portfolio-ready premium UI design**
- 🤖 **Real AI integration — not just a mock**
- 🔥 **Streak system keeps users engaged daily**
- 😊 **Mood journaling adds emotional context to every day**
- ⚡ **Zero backend — fully client-side with localStorage**
- 📱 **Pixel-perfect responsive across all screen sizes**
- 🧩 **Single-file component — easy to drop into any React project**

---

## 🔮 Future Improvements

- 🌐 Backend integration (MongoDB / Firebase) for cloud sync
- 🔐 Authentication — personal calendars per user
- 🗓️ Week & Year view
- 🔔 Browser notifications & reminders
- 🌦️ Real-time weather API per date
- 📅 Google Calendar / iCal sync
- 📸 Export calendar month as PNG image
- 🖨️ Print-friendly layout

---

## 🙌 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and submit a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Abhijeet Tiwari**

---

## ⭐ Support

If you like this project:

👉 Star the repo  
👉 Share with others  
👉 Use it in your portfolio
