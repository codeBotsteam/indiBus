import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Navigation,
  ArrowRight,
  Bus,
  Clock,
  TrendingUp,
} from "lucide-react";
import BusCard from "../components/BusCard"; // Import your actual BusCard component

// ---------------- MOCK DATA ---------------- //

const mockBusData = {
  routes: {
    "Central Station": ["Mall Road", "University", "Airport", "Downtown"],
    "Mall Road": ["Central Station", "University", "Hospital", "Beach"],
    "University": ["Central Station", "Mall Road", "Library", "Stadium"],
    "Airport": ["Central Station", "Downtown", "Hotel District"],
    "Downtown": ["Central Station", "Airport", "Business Park"],
    "Hospital": ["Mall Road", "Residential Area"],
    "Beach": ["Mall Road", "Resort Area"],
    "Library": ["University", "Residential Area"],
    "Stadium": ["University", "Sports Complex"],
    "Hotel District": ["Airport", "Tourist Area"],
    "Business Park": ["Downtown", "Tech Hub"],
    "Residential Area": ["Hospital", "Library", "Shopping Center"],
    "Resort Area": ["Beach"],
    "Sports Complex": ["Stadium"],
    "Tourist Area": ["Hotel District"],
    "Tech Hub": ["Business Park"],
    "Shopping Center": ["Residential Area"],
  },
};

const frequentRoutes = [
  { from: "Central Station", to: "Mall Road", time: "15 min", fare: "₹25" },
  { from: "University", to: "Downtown", time: "22 min", fare: "₹30" },
  { from: "Airport", to: "Hotel District", time: "12 min", fare: "₹20" },
  { from: "Mall Road", to: "Beach", time: "18 min", fare: "₹28" },
  { from: "Central Station", to: "Airport", time: "25 min", fare: "₹35" },
  { from: "University", to: "Library", time: "8 min", fare: "₹15" },
];

const getAllStops = () => Object.keys(mockBusData.routes);

const getBusesByRoute = (start, end) => {
  const buses = [
    {
      busNumber: "DL 01 AA 1010",
      type: "AC",
      operator: "City Express Pvt Ltd",
      route: [
        "Central Station",
        "Metro Gate",
        "Mall Road",
        "Airport",
        "Beach",
        "Downtown",
        "Business Park",
      ],
      eta: 6,
      delayReason: "On Time",
      distanceToNextStop: "1.2",
      capacity: 50,
      occupancy: 28,
      currentSpeed: "35",
      fare: 35,
      wheelchairAccessible: true,
      wifiAvailable: true,
      lastUpdated: "2 mins ago",
      driverName: "Ravi Kumar",
      vehicleAge: 2,
      fuelType: "CNG",
      rating: "4.5",
      totalSeats: 50,
      availableSeats: function () {
        return this.totalSeats - this.occupancy;
      },
    },
    {
      busNumber: "DL 04 ZY 9231",
      type: "Electric",
      operator: "Green Wheels Corp",
      route: [
        "University",
        "Library",
        "Stadium",
        "Sports Complex",
        "Downtown",
        "Tech Hub",
      ],
      eta: 10,
      delayReason: "Traffic Jam",
      distanceToNextStop: "0.8",
      capacity: 40,
      occupancy: 35,
      currentSpeed: "12",
      fare: 30,
      wheelchairAccessible: true,
      wifiAvailable: false,
      lastUpdated: "Just now",
      driverName: "Anita Mehra",
      vehicleAge: 1,
      fuelType: "Electric",
      rating: "4.7",
      totalSeats: 40,
      availableSeats: function () {
        return this.totalSeats - this.occupancy;
      },
    },
  ];

  const startRoutes = mockBusData.routes || [];
  const endRoutes = mockBusData.routes || [];

  if (startRoutes.includes(end) || endRoutes.includes(start)) {
    return buses;
  }

  return buses.slice(0, 1);
};

// ---------------- HOME COMPONENT ---------------- //

const Home = () => {
  const [startStop, setStartStop] = useState<string>("");
  const [endStop, setEndStop] = useState<string>("");
  const [matchedBuses, setMatchedBuses] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [allStops, setAllStops] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<{ start: string[]; end: string[] }>({
    start: [],
    end: [],
  });
  const [showStartSuggestions, setShowStartSuggestions] = useState<boolean>(false);
  const [showEndSuggestions, setShowEndSuggestions] = useState<boolean>(false);

  useEffect(() => {
    setAllStops(getAllStops());
  }, []);

  const filterSuggestions = (input: string, type: "start" | "end") => {
    if (!input || input.length < 1) {
      setSearchSuggestions((prev) => ({ ...prev, [type]: [] }));
      if (type === "start") setShowStartSuggestions(false);
      if (type === "end") setShowEndSuggestions(false);
      return;
    }
    
    const filtered = allStops
      .filter((stop) => stop.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 8);
    
    setSearchSuggestions((prev) => ({ ...prev, [type]: filtered }));
    
    if (type === "start") setShowStartSuggestions(filtered.length > 0);
    if (type === "end") setShowEndSuggestions(filtered.length > 0);
  };

  const handleStartStopChange = (value) => {
    setStartStop(value);
    filterSuggestions(value, "start");
  };

  const handleEndStopChange = (value) => {
    setEndStop(value);
    filterSuggestions(value, "end");
  };

  const selectStartStop = (stop) => {
    setStartStop(stop);
    setShowStartSuggestions(false);
    setSearchSuggestions((prev) => ({ ...prev, start: [] }));
  };

  const selectEndStop = (stop) => {
    setEndStop(stop);
    setShowEndSuggestions(false);
    setSearchSuggestions((prev) => ({ ...prev, end: [] }));
  };

  const handleSwapStops = () => {
    const temp = startStop;
    setStartStop(endStop);
    setEndStop(temp);
  };

  const handleQuickRoute = (from, to) => {
    setStartStop(from);
    setEndStop(to);
  };

  const handleSearch = () => {
    if (!startStop.trim() || !endStop.trim()) {
      alert("Please enter both starting point and destination");
      return;
    }
    if (startStop.toLowerCase().trim() === endStop.toLowerCase().trim()) {
      alert("Starting point and destination cannot be the same");
      return;
    }

    const startExists = allStops.some(
      (stop) => stop.toLowerCase() === startStop.toLowerCase().trim()
    );
    const endExists = allStops.some(
      (stop) => stop.toLowerCase() === endStop.toLowerCase().trim()
    );

    if (!startExists || !endExists) {
      alert("Please select valid stops from the suggestions.");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setShowStartSuggestions(false);
    setShowEndSuggestions(false);

    setTimeout(() => {
      const matches = getBusesByRoute(startStop.trim(), endStop.trim());
      setMatchedBuses(matches);
      setIsSearching(false);
    }, 1200);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowStartSuggestions(false);
      setShowEndSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Bus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white" >BusTracker</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-white">
            Find the best bus routes and track real-time arrivals for your journey
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={startStop}
                    onChange={(e) => handleStartStopChange(e.target.value)}
                    onFocus={() => {
                      if (searchSuggestions.start.length > 0) {
                        setShowStartSuggestions(true);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter starting point"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {showStartSuggestions && searchSuggestions.start.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {searchSuggestions.start.map((stop, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectStartStop(stop);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          {stop}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={endStop}
                    onChange={(e) => handleEndStopChange(e.target.value)}
                    onFocus={() => {
                      if (searchSuggestions.end.length > 0) {
                        setShowEndSuggestions(true);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter destination"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {showEndSuggestions && searchSuggestions.end.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {searchSuggestions.end.map((stop, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectEndStop(stop);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <Navigation className="w-4 h-4 text-gray-400 mr-2" />
                          {stop}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSwapStops}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4 transform rotate-90 mr-2" />
                Swap
              </button>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Find Buses
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* FREQUENT ROUTES */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Popular Routes</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {frequentRoutes.map((route, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleQuickRoute(route.from, route.to);
                      setTimeout(() => handleSearch(), 0);
                    }}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {route.time}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {route.fare}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-800 font-medium">{route.from}</span>
                      <ArrowRight className="w-4 h-4 mx-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-gray-800 font-medium">{route.to}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            {isSearching ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Finding the best routes for you...</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Available Buses</h2>
                  <span className="text-gray-600">
                    {matchedBuses.length} route{matchedBuses.length !== 1 ? "s" : ""} found
                  </span>
                </div>
                {matchedBuses.length > 0 ? (
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {matchedBuses.map((bus, index) => (
                      <BusCard key={index} bus={bus} startStop={startStop} endStop={endStop} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No buses found</h3>
                    <p>Try searching for a different route</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;