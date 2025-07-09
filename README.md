
# 🎬 Mini Movie Explorer

A sleek, responsive movie search application built using **React**, the **OMDb API**, and **localStorage** for managing your personal watchlist. Includes support for light/dark themes and animated UI elements.

---

## 🚀 Features

- 🔍 **Search Movies** using the OMDb API
- 🌗 **Dark & Light Mode Toggle** with localStorage persistence
- 🎥 **Add to Watchlist** (stored locally)
- 📋 **Movie Details Drawer** with rating, plot, genre
- 💡 **Debounced Search Input** to reduce API calls
- ✨ **Animated UI** including gradient backgrounds and input effects
- ✅ Fully responsive grid layout

---

## 🛠️ Tech Stack

- **React**
- **JavaScript (ES6)**
- **CSS3 (with animations & custom properties)**
- **OMDb API** – https://www.omdbapi.com
- **localStorage** for watchlist and theme persistence

---

## 📦 Setup & Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/mini-movie-explorer.git
   cd mini-movie-explorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser.

---

## 🔐 API Key Setup

The app uses the free [OMDb API](https://www.omdbapi.com/).

You can replace the existing API key (`d8690e9a`) with your own for production:

```js
const res = await fetch(\`https://www.omdbapi.com/?apikey=YOUR_KEY_HERE&s=\${query}\`);
```

---

## 📁 Folder Structure

```
src/
│
├── assets/              # Logo or static assets
├── components/
│   └── SearchBar.js     # Animated search input
│
├── hooks/
│   └── useDebounce.js   # Custom debounce hook
│
├── App.js               # Main app logic
├── App.css              # Global styles + themes
└── index.js             # Entry point
```

---

## 📸 Screenshots

| Light Mode                        | Dark Mode                         |
|----------------------------------|-----------------------------------|
| ![](assets/screenshot-light.png) | ![](assets/screenshot-dark.png)  |

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Credits

- Movie data via [OMDb API](https://www.omdbapi.com)
- UI inspired by modern streaming platforms
