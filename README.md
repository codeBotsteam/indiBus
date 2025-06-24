# React + TypeScript + Vite

# IndiBus 🚌

**IndiBus** is a centralized web platform aimed at integrating all government bus routes across India. It provides real-time data on travel time, fare, and operator-specific routes. Designed for accessibility and efficiency, the platform features a clean UI, route visualization, and smart commuting options.

The platform goes beyond just transportation by introducing:

- 🏆 A **Gamified Dashboard** that encourages users to opt for greener travel choices.
- 🌱 **CO₂ Emission Tracking** to promote environmental awareness.
- 💰 **Eco Points** (cashback system) for users choosing sustainable routes.
- 🤖 **IndiBus Saathi** – a smart AI-powered agent that answers user queries, recommends routes, and helps navigate the platform easily.

---

## 🌟 Motivation

With countless government buses operating across India, commuters often lack access to:

- Real-time travel updates
- Fare and route comparisons
- Eco-conscious route planning

**IndiBus** solves these challenges by providing a unified and scalable platform for smooth and smart public transportation experiences.

---

## 🚀 Features

- 🗺️ **Real-Time Route Visualization** – Integrated Google Maps API to show live bus paths.
- 🔍 **Search Routes** – Filter by city, stops, or operators.
- 🕒 **Travel Time & Fare Estimation** – Accurate data using backend APIs.
- 🧠 **Built-in Chatbot** – Assists with travel queries & route recommendations.
- 🏆 **Gamified Dashboard** – Rewards users for choosing sustainable transport.
- 📈 **Admin Dashboard** – Monitor users, buses, routes & performance.
- 📱 **Responsive Design** – Mobile-friendly and fast.

---

## ⚙️ Tech Stack

| Technology    | Usage                            |
|---------------|----------------------------------|
| React.js      | Frontend framework               |
| Tailwind CSS  | Styling and responsiveness       |
| Node.js       | Backend runtime environment      |
| Express.js    | Backend web framework            |
| MongoDB       | NoSQL database                   |
| Mongoose      | MongoDB object modeling          |
| JWT + Bcrypt  | Authentication & security        |


---

## 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/codeBotsteam/IndiBus.git

cd IndiBus
```

2. **Install Dependencies**
```bash
npm install
```

3. **Run the App**

```bash
npm run dev
```

---

## 🤝 Contribution Guidelines

**We welcome contributions to make IndiBus better!**

1) Fork the repo

2) Create a branch ```git checkout -b feature-name```

3) Make your changes

4) Commit your work: ```git commit -m "Description"```

5) Push: ```git push origin feature-name```

6) Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License – feel free to use, modify, and distribute.

---

## 📬 Contact

**Made with ❤️ by CodeBots Team**

For queries, suggestions, or collaboration, feel free to raise an issue or PR.

---


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
