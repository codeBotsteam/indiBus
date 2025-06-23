import React from "react";

const LiveTracking = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Live Bus Tracking</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-6">Track your bus in real time anywhere in India. Get arrival times, route map, and latest updates.</p>
      <div className="w-full max-w-xl h-72 rounded-2xl border-2 border-blue-200 bg-gray-100 flex items-center justify-center mb-2">
        <span className="text-gray-400">Live Map Placeholder</span>
      </div>
    </section>
  );
};

export default LiveTracking;
