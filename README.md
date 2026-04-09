# 🗓️ Perfect Wall Calendar — React

A **premium, feature-rich interactive calendar** built with **React**, designed to combine **beautiful UI** with powerful productivity tools like **AI-powered planning, mood tracking, and streak management**.

---

## 🚀 Live Highlights

- 🖼️ Elegant **Hero Section** with diagonal layout
- 🤖 **AI Daily Planner** (Claude AI integration)
- 😊 **Mood Tracking System**
- 📊 **Monthly Analytics & Streak Tracker**
- 🎨 Fully customizable (**Themes, Fonts, Backgrounds**)
- 🔥 Confetti animations on actions
- 📅 Smart calendar with **note density heatmap**

---

## ✨ Features

### 📆 Calendar System

- Dynamic monthly calendar powered by **date-fns**
- Smooth **3D page-flip animation** for navigation
- Highlight:
  - **Today’s date**
  - **Selected date**
  - **Holidays & Sundays**

- Date range selection support
- Muted styling for non-current month dates

---

### 📝 Notes System

- Create, edit, delete notes for any date
- Persistent storage via **localStorage**
- Visual indicators on calendar
- Notes panel with quick navigation
- Character limit: **300 chars**

---

### 🤖 AI Daily Planner

- Generate structured plans:
  - 🌅 Morning
  - 🌇 Afternoon
  - 🌙 Evening

- Powered by **Claude AI API**
- One-click insert into notes

---

### ⚡ Quick Templates

Pre-built templates for productivity:

- 📋 Daily Standup
- 💪 Workout Log
- 🍽️ Meal Plan
- 📓 Journal Prompt
- 📚 Study Plan

---

### 😊 Mood Journal

- Track daily emotions with 6 moods:
  - 😊 😔 😤 🔥 😴 😌

- Visual ring + emoji indicators
- Stored persistently
- Integrated with notes & stats

---

### 📊 Monthly Analytics

- Total notes count
- Most productive weekday
- Top mood analysis
- Streak tracking
- Mood distribution breakdown

---

### 🔥 Streak System

- Tracks **daily consistency**
- Displays: `🔥 X day streak`
- Resets automatically on missed days

---

### 🎨 Customization

- **Themes**: Light, Dark, Forest, Ocean, Sunset, Lavender
- **Fonts**: Default, Serif, Mono, Rounded, Elegant
- **Backgrounds**: Gradients, Mesh, Patterns, Custom Upload

---

### 🖼️ UI & Animations

- Glassmorphism controls
- Smooth transitions via **Framer Motion**
- 3D effects & hover interactions

---

### 📈 Heatmap Visualization

- GitHub-style yearly heatmap
- Shows note activity across all months

---

### 🎊 Micro Interactions

- Confetti animation on save
- Smooth scaling, hover, and motion effects

---

### 📱 Responsive Design

- Fully optimized for:
  - Mobile 📱
  - Tablet 📲
  - Desktop 💻

- Adaptive layout & typography

---

## 🛠️ Tech Stack

| Technology    | Purpose           |
| ------------- | ----------------- |
| React.js      | Frontend UI       |
| date-fns      | Date calculations |
| Framer Motion | Animations        |
| Lucide React  | Icons             |
| Claude AI API | AI planning       |
| localStorage  | Data persistence  |
| CSS-in-JS     | Styling           |

---

## 📂 Project Structure

```
src/
├── components/
│   └── PerfectWallCalendar.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/perfect-wall-calendar.git
cd perfect-wall-calendar
```

### 2. Install Dependencies

```bash
npm install
npm install framer-motion lucide-react date-fns
```

### 3. Run Project

```bash
npm run dev
```

---

## 🧠 Core Implementation

### Date Generation

```js
eachDayOfInterval({
  start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
  end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
});
```

### Data Storage

```js
"yyyy-MM-dd" → { text: string }
"yyyy-MM-dd" → "😊"
```

### Streak Logic

- Iterates backward from today
- Stops at first missing entry

### AI API Call

```http
POST https://api.anthropic.com/v1/messages
model: claude-sonnet-4
```

---

## 🎯 Why This Project Stands Out

- 💎 **Premium UI (Portfolio Ready)**
- 🤖 **Real AI Integration**
- ⚡ **No Backend Required**
- 📊 **Productivity + Emotional Tracking**
- 🔥 **Engagement-driven features (streaks, stats)**

---

## 🔮 Future Enhancements

- 🌐 Backend (MongoDB / Firebase)
- 🔐 Authentication system
- 🗓️ Weekly & yearly views
- 🔔 Notifications & reminders
- 🌦️ Weather integration
- 🔗 Google Calendar sync
- 📸 Export as image / PDF

---

## 🙌 Contributing

```bash
1. Fork the repo
2. Create branch → feature/your-feature
3. Commit changes
4. Open Pull Request
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Abhijeet Tiwari**

---

## ⭐ Support

If you found this helpful:

- ⭐ Star the repository
- 🔁 Share with others
- 💼 Add it to your portfolio

---
