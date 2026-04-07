# 🌄 Interactive Wall Calendar (React + Tailwind)

A **modern, aesthetic, and interactive wall calendar UI** built with **React**, inspired by real-world digital calendars and premium UI designs.

This project combines **beautiful visuals (hero image + animations)** with **functional productivity features (notes, date selection, export)**.

---

## ✨ Preview

- 🖼️ Dynamic Hero Image (changes with month)
- 📅 Interactive Calendar Grid
- 📝 Notes per Date
- 🌙 Light / Dark Mode
- 🎯 Smooth Animations

---

## 🚀 Features

### 📆 Calendar Functionality

- Monthly calendar view
- Accurate date generation using **date-fns**
- Previous / Next month navigation
- Highlight selected date
- Sunday & holiday highlighting

### 📝 Notes System

- Add notes for any selected date
- Edit & delete notes
- Persistent UI state handling
- Clean writing panel

### 🎨 UI/UX Enhancements

- Hero image banner with smooth transitions
- Glassmorphism-style controls
- Responsive layout (mobile + desktop)
- Dark / Light mode toggle

### ⚡ Extra Features

- 📤 Upload custom hero image
- 📸 Export calendar as image (html2canvas)
- 🎬 Smooth animations using Framer Motion

---

## 🛠️ Tech Stack

| Technology    | Usage           |
| ------------- | --------------- |
| React.js      | UI Development  |
| Tailwind CSS  | Styling         |
| date-fns      | Date utilities  |
| Framer Motion | Animations      |
| Lucide React  | Icons           |
| html2canvas   | Export as image |

---

## 📂 Project Structure

```id="projstruct"
src/
│
├── components/
│   └── InteractiveCalendar.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="clone"
git clone https://github.com/your-username/interactive-calendar.git
cd interactive-calendar
```

### 2️⃣ Install dependencies

```bash id="install"
npm install
```

### 3️⃣ Run the project

```bash id="run"
npm run dev
```

---

## 🧠 Core Logic

- Dates are generated using:

  ```js
  eachDayOfInterval + startOfMonth + endOfMonth;
  ```

- Each note is stored using:

  ```js
  "yyyy-MM-dd" as unique key
  ```

- Calendar updates dynamically based on:
  - Selected date
  - Current month
  - View state

---

## 🎯 Key Highlights

- 💎 **Premium UI design (portfolio-ready)**
- ⚡ **Smooth and fast interactions**
- 📱 **Responsive across devices**
- 🧩 **Modular and scalable structure**

---

## 🔮 Future Improvements

- 🌐 Backend integration (MongoDB / Firebase)
- 🔐 Authentication system
- 🗓️ Week & Year view
- 🔔 Notifications / reminders
- 🌦️ Real-time weather API
- 📅 Google Calendar sync

---

## 🙌 Contributing

Feel free to contribute!

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Abhijeet Tiwari**

- MERN Stack Developer
- Passionate about building real-world UI/UX projects

---

## ⭐ Support

If you like this project:

👉 Star the repo
👉 Share with others
👉 Use it in your portfolio

---
