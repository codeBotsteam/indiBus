import React from "react";

interface Bus {
  busNumber: string;
  type: string;
  operator: string;
  route: string[];
  eta: number;
  delayReason: string;
  distanceToNextStop: string;
  capacity: number;
  occupancy: number;
  currentSpeed: string;
  fare: number;
  wheelchairAccessible: boolean;
  wifiAvailable: boolean;
  lastUpdated: string;
  driverName: string;
  vehicleAge: number;
  fuelType: string;
  rating: string;
  totalSeats: number;
  availableSeats: () => number;
}

interface BusCardProps {
  bus: Bus;
  startStop?: string;
  endStop?: string;
  currentStop?: string;
}

const BusCard: React.FC<BusCardProps> = ({ bus, startStop, endStop }) => {
  // Calculate route segment if start and end stops are provided
  const getRouteSegment = () => {
    if (startStop && endStop) {
      const startIndex = bus.route.findIndex(
        stop => stop.toLowerCase() === startStop.toLowerCase()
      );
      const endIndex = bus.route.findIndex(
        stop => stop.toLowerCase() === endStop.toLowerCase()
      );
      
      if (startIndex !== -1 && endIndex !== -1) {
        return {
          segment: bus.route.slice(startIndex, endIndex + 1),
          startIndex,
          endIndex,
          duration: Math.floor((endIndex - startIndex) * 8 + Math.random() * 10)
        };
      }
    }
    return null;
  };

  const routeInfo = getRouteSegment();
  
  // Determine next stop
  const getNextStop = () => {
    const referenceStop = startStop;
    if (referenceStop) {
      const currentIndex = bus.route.findIndex(
        stop => stop.toLowerCase() === referenceStop.toLowerCase()
      );
      return currentIndex !== -1 && currentIndex + 1 < bus.route.length
        ? bus.route[currentIndex + 1]
        : "End of Route";
    }
    return bus.route[1] || "End of Route";
  };

  // Status color coding
  const getStatusColor = (reason: string) => {
    if (reason === "On Time" || reason === "Early Arrival") return "text-green-600 bg-green-50";
    if (reason === "Traffic Jam" || reason === "Accident Nearby") return "text-red-600 bg-red-50";
    return "text-yellow-600 bg-yellow-50";
  };

  // Bus type styling
  const getTypeColor = (type: string) => {
    switch(type) {
      case "AC": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Electric": return "bg-green-100 text-green-800 border-green-200";
      case "CNG": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Deluxe": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Express": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Occupancy color
  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 50) return "text-green-600";
    if (occupancy < 80) return "text-yellow-600";
    return "text-red-600";
  };

  const nextStop = getNextStop();
  const availableSeats = bus.availableSeats();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {bus.busNumber}
            </h4>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getTypeColor(bus.type)}`}>
              {bus.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {bus.operator} • {bus.fuelType}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{bus.fare}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">per person</div>
        </div>
      </div>

      {/* Key Information Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">ETA</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{bus.eta}m</div>
        </div>
        
        {routeInfo && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Journey</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{routeInfo.duration}m</div>
          </div>
        )}
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Speed</div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {bus.currentSpeed === "0" ? "Stopped" : `${bus.currentSpeed} km/h`}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Seats</div>
          <div className={`text-lg font-bold ${getOccupancyColor(bus.occupancy)}`}>
            {availableSeats}/{bus.totalSeats}
          </div>
        </div>
      </div>

      {/* Status and Next Stop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
          <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getStatusColor(bus.delayReason)}`}>
            {bus.delayReason}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm text-gray-600 dark:text-gray-400">Next Stop:</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">
            {nextStop}
          </span>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Distance:</span>
          <span className="font-medium">{bus.distanceToNextStop} km</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Rating:</span>
          <span className="font-medium">⭐ {bus.rating}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Updated:</span>
          <span className="font-medium">{bus.lastUpdated}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Occupancy:</span>
          <span className={`font-medium ${getOccupancyColor(bus.occupancy)}`}>
            {bus.occupancy}%
          </span>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-4">
        {bus.wheelchairAccessible && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            ♿ Accessible
          </span>
        )}
        {bus.wifiAvailable && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            📶 WiFi
          </span>
        )}
        {bus.type === "AC" && (
          <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">
            ❄️ AC
          </span>
        )}
        {bus.fuelType === "Electric" && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            🔋 Eco-Friendly
          </span>
        )}
      </div>

      {/* Route Display */}
      <div className="border-t pt-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {routeInfo ? "Your Route:" : "Full Route:"}
        </div>
        <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
          {(routeInfo ? routeInfo.segment : bus.route).map((stop, index) => {
            const isStart = routeInfo && index === 0;
            const isEnd = routeInfo && index === routeInfo.segment.length - 1;
            const isIntermediate = routeInfo && index > 0 && index < routeInfo.segment.length - 1;
            
            return (
              <span key={index} className="flex items-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  isStart ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                  isEnd ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 
                  isIntermediate ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {stop}
                </span>
                {index < (routeInfo ? routeInfo.segment : bus.route).length - 1 && (
                  <span className="mx-1 text-gray-400 text-xs">→</span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-sm">
          🚌 Track Live
        </button>
        <button className="flex-1 bg-gray-500 dark:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors text-sm">
          📅 Book Seat
        </button>
      </div>
    </div>
  );
};

export default BusCard;