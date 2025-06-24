import React from "react";
import BusMap from './BusMap';


const LiveTracking = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 dark:text-blue-300">Live Bus Tracking</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-6 dark:text-white">Track your bus in real time anywhere in India. Get arrival times, route map, and latest updates.</p>
      <div className="w-full max-w-2xl max-h-xl h-100 rounded-2xl border-2 border-blue-200 bg-gray-100 flex items-center justify-center mb-2">
        <BusMap/>
      </div>
    </section>
  );
};

export default LiveTracking;
