import React from "react";

const Rewards = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-yellow-600 mb-4">Your Eco Rewards</h2>
      <p className="text-lg max-w-xl text-gray-700 mb-8 dark:text-white">Earn points and unlock discounts by choosing sustainable travel options. View your stats, coupons, and eco achievements.</p>
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
};

export default Rewards;
