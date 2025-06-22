import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function Home() {
  return (
    <header className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-8 pt-16 pb-8 mx-auto w-full max-w-6xl">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          All India <span className="text-green-700">Bus Routes</span> — Live, Unified, Eco-Conscious
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Plan your intercity & intracity journeys across India. Get real-time schedules, fares, and live tracking for all government buses. Earn rewards for choosing <span className="font-semibold text-green-700">eco-friendly routes</span>!
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 w-full md:w-72"
            placeholder="Enter source city or stop..."
          />
          <input
            type="text"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 w-full md:w-72"
            placeholder="Enter destination..."
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-md">Search Buses</button>
        </div>
      </div>
      {/* Google Maps placeholder */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-green-100 min-h-[280px] w-full max-w-md bg-gray-200 flex items-center justify-center">
          {/* Replace with Google Maps API integration later */}
          <span className="text-gray-500">Google Maps Bus Route Here</span>
        </div>
      </div>
    </header>
  );
}

function PlanTrip() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Plan Your Bus Trip</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-6">Find the best government bus routes, schedules, fares, operators and eco scores for your journey, and visualize your trip across India.</p>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        {/* Future: Trip planner UI and integration */}
        <input className="border p-2 rounded" placeholder="Source city or stop" />
        <input className="border p-2 rounded" placeholder="Destination" />
        <button className="rounded bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold">Show Routes</button>
      </div>
    </section>
  );
}

function LiveTracking() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Live Bus Tracking</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-6">Track your bus in real time anywhere in India. Get arrival times, route map, and latest updates.</p>
      <div className="w-full max-w-xl h-72 rounded-2xl border-2 border-blue-200 bg-gray-100 flex items-center justify-center mb-2">
        {/* Google Maps API goes here */}
        <span className="text-gray-400">Live Map Placeholder</span>
      </div>
    </section>
  );
}

function Rewards() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-yellow-600 mb-4">Your Eco Rewards</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-8">Earn points and unlock discounts by choosing sustainable travel options. View your stats, coupons, and eco achievements.</p>
      <div className="w-full max-w-lg flex flex-col gap-6">
        <div className="rounded-xl bg-white shadow p-6">
          <h3 className="font-bold text-xl mb-1">Total Points</h3>
          <div className="text-3xl text-green-600 font-mono font-bold">1200</div>
        </div>
        <div className="rounded-xl bg-yellow-50 p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="rounded bg-yellow-200 px-3 py-1 font-semibold text-yellow-900 text-sm">Active Coupon</div>
          <div className="font-bold">10% Off Next Trip • Code: <span className="text-yellow-700">GREEN10</span></div>
        </div>
        <div className="rounded-lg bg-green-100 px-4 py-3 text-green-800 font-semibold">You saved 20kg CO₂ this month!</div>
      </div>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <div className="text-lg font-bold text-green-700">IndiBus</div>
          <div className="space-x-6 hidden md:flex">
            <Link to="/" className="text-gray-700 font-medium hover:text-green-800">Home</Link>
            <Link to="/plan" className="text-gray-700 font-medium hover:text-green-800">Plan Trip</Link>
            <Link to="/tracking" className="text-gray-700 font-medium hover:text-green-800">Live Tracking</Link>
            <Link to="/rewards" className="text-gray-700 font-medium hover:text-green-800">Rewards</Link>
          </div>
          <button className="md:hidden p-2 rounded hover:bg-green-100">
            <span className="material-icons">menu</span>
          </button>
        </nav>
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<PlanTrip />} />
            <Route path="/tracking" element={<LiveTracking />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </main>
        <footer className="py-4 text-center text-sm text-gray-500 bg-white border-t mt-auto">IndiBus — Unifying India’s Public Transport, Greener Together.</footer>
      </div>
    </Router>
  );
}

export default App;
