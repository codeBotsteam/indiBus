import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IndiBot from './components/IndiBot';
import { MessageCircle } from 'lucide-react';

// Lazy loading pages
const Home = React.lazy(() => import("./pages/Home"));
const PlanTrip = React.lazy(() => import("./pages/PlanTrip"));
const LiveTracking = React.lazy(() => import("./pages/LiveTracking"));
const Rewards = React.lazy(() => import("./pages/Rewards"));

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showBot, setShowBot] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 flex flex-col">
          <Suspense fallback={<div className="text-center p-8 text-gray-500 dark:text-gray-300">Loading...</div>}>
          <button onClick={() => setShowBot(true)} className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50" aria-label="Open chat">
            <MessageCircle size={24} />
          </button>
          {showBot && <IndiBot onClose={() => setShowBot(false)} />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plan" element={<PlanTrip />} />
              <Route path="/tracking" element={<LiveTracking />} />
              <Route path="/rewards" element={<Rewards />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="py-4 text-center text-sm text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-400 border-t mt-auto">
          IndiBus — Unifying India’s Public Transport, Greener Together.
        </footer>
      </div>
    </Router>
  );
};

export default App;
