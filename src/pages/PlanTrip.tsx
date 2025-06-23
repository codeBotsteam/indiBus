import React from "react";

const PlanTrip = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Plan Your Bus Trip</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-6">Find the best government bus routes, schedules, fares, operators and eco scores for your journey, and visualize your trip across India.</p>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        <input className="border p-2 rounded" placeholder="Source city or stop" />
        <input className="border p-2 rounded" placeholder="Destination" />
        <button className="rounded bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold">Show Routes</button>
      </div>
    </section>
  );
};

export default PlanTrip;
