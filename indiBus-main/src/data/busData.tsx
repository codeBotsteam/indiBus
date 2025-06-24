type Bus = {
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
};

const generateBusData = (): Bus[] => {
  const routeBase = [
    "ISBT", "Kashmere Gate", "Rajiv Chowk", "AIIMS", "Lajpat Nagar",
    "South Ex", "Saket", "Vasant Kunj", "Dwarka", "Janakpuri",
    "Rohini", "Pitampura", "Shalimar Bagh", "Netaji Subhash Place",
    "Karol Bagh", "Rajouri Garden", "Tilak Nagar", "Badarpur",
    "Faridabad", "Noida City Centre", "Connaught Place", "India Gate",
    "Red Fort", "Chandni Chowk", "Dhaula Kuan", "Aerocity", "Hauz Khas",
    "Nehru Place", "Kalkaji", "Govind Puri", "Greater Kailash", "Sarojini Nagar",
    "Inderlok", "Punjabi Bagh", "Shadipur", "Patel Nagar", "Kirti Nagar",
    "Moti Nagar", "Rajendra Place", "Palam", "Dwarka Sec 14", "Dwarka Sec 21",
    "Anand Vihar", "Yamuna Bank", "Mayur Vihar", "Preet Vihar", "Karkardooma",
    "Azadpur", "Model Town", "GTB Nagar", "Vishwavidyalaya", "Civil Lines",
    "Chawri Bazar", "New Delhi", "Shivaji Stadium", "Dilli Haat", "Laxmi Nagar",
    "Nirman Vihar", "Ashram", "Sarai Kale Khan", "Jangpura", "Lodi Colony",
    "Jorbagh", "Khan Market", "Mandi House", "Barakhamba", "Rajouri Place",
    "Paschim Vihar", "Peeragarhi", "Udyog Nagar", "Surajmal Stadium",
    "Gurgaon", "Manesar", "Sohna", "Palwal", "Ballabhgarh", "Ghaziabad",
    "Indirapuram", "Vaishali", "Dilshad Garden", "Rithala", "Mundka",
    "Nangloi", "Najafgarh", "Kapashera", "Tughlakabad", "Okhla",
    "Khanpur", "Mehrauli", "Chhatarpur", "Gwal Pahari", "Sikanderpur"
  ];

  const types = ["AC", "Non-AC", "Electric", "CNG", "Deluxe", "Express"];
  const delayReasons = [
    "Traffic Jam", "Signal Failure", "Vehicle Maintenance", "Accident Nearby", 
    "Road Block", "Weather Conditions", "Security Alert", "Driver Change", 
    "On Time", "Early Arrival", "Festival Crowd", "VIP Movement", "Heavy Rain",
    "Construction Work", "Fuel Stop", "Passenger Boarding"
  ];
  
  const districts = [
    "DEL", "NCR", "GGN", "NOI", "FBD", "GZB", "MDU", "RWP", "BLG", "SON"
  ];

  const operators = [
    "DTC", "DMRC Feeder", "Haryana Roadways", "UP Roadways", "RRTS Connect",
    "Cluster Bus", "Orange Bus", "Green Line", "Metro Feeder", "City Link"
  ];

  // Generate buses with more realistic data
  return Array.from({ length: 2000 }, (_, i) => {
    // Create realistic route with contiguous stops
    const startIdx = Math.floor(Math.random() * (routeBase.length - 8));
    const routeLength = Math.floor(Math.random() * 12) + 6; // 6-18 stops
    const route = routeBase.slice(startIdx, Math.min(startIdx + routeLength, routeBase.length));
    
    // Add some cross-city routes
    if (Math.random() > 0.7) {
      const additionalStops = Math.floor(Math.random() * 5) + 2;
      const endIdx = Math.min(startIdx + routeLength + additionalStops, routeBase.length);
      route.push(...routeBase.slice(routeBase.length - additionalStops, routeBase.length));
    }
    
    const district = districts[Math.floor(Math.random() * districts.length)];
    const busNum = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    const suffix = Math.random() > 0.8 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : '';
    
    const busType = types[Math.floor(Math.random() * types.length)];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    // Calculate fare based on distance and bus type
    const basefare = route.length * 2;
    const typeMultiplier = busType === "AC" ? 1.5 : busType === "Deluxe" ? 1.3 : busType === "Express" ? 1.2 : 1;
    const fare = Math.floor(basefare * typeMultiplier) + Math.floor(Math.random() * 10);
    
    return {
      busNumber: `${district}-${busNum}${suffix}`,
      type: busType,
      operator: operator,
      route: route,
      eta: Math.floor(Math.random() * 45) + 2, // 2-47 minutes
      delayReason: delayReasons[Math.floor(Math.random() * delayReasons.length)],
      distanceToNextStop: (Math.random() * 8 + 0.5).toFixed(1), // 0.5-8.5 km
      capacity: Math.floor(Math.random() * 60) + 25, // 25-85 passengers
      occupancy: Math.floor(Math.random() * 100), // 0-100% occupancy
      currentSpeed: Math.random() > 0.1 ? (Math.random() * 35 + 15).toFixed(1) : "0", // 15-50 km/h or stopped
      fare: fare,
      wheelchairAccessible: Math.random() > 0.7,
      wifiAvailable: Math.random() > 0.6,
      lastUpdated: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(), // Within last 5 minutes
      driverName: `Driver ${Math.floor(Math.random() * 999) + 1}`,
      vehicleAge: Math.floor(Math.random() * 15) + 1, // 1-15 years
      fuelType: busType === "Electric" ? "Electric" : busType === "CNG" ? "CNG" : "Diesel",
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0 rating
      totalSeats: Math.floor(Math.random() * 30) + 35, // 35-65 seats
      availableSeats: function() { 
        return Math.floor(this.totalSeats * (1 - this.occupancy / 100)); 
      }
    };
  });
};

const busData: Bus[] = generateBusData();

// Export additional utility functions
export const getAllStops = (): string[] => {
  return [...new Set(busData.flatMap(bus => bus.route))].sort();
};

export const getBusesByRoute = (startStop: string, endStop: string): Bus[] => {
  return busData.filter(bus => {
    const routeLower = bus.route.map(r => r.toLowerCase());
    const startIndex = routeLower.indexOf(startStop.toLowerCase());
    const endIndex = routeLower.indexOf(endStop.toLowerCase());
    return startIndex !== -1 && endIndex !== -1 && startIndex < endIndex;
  });
};

export const getBusById = (busNumber: string): Bus | undefined => {
  return busData.find(bus => bus.busNumber === busNumber);
};

export const getPopularRoutes = (): { route: string; count: number }[] => {
  const routeCounts: Record<string, number> = {};
  busData.forEach(bus => {
    bus.route.forEach((stop, index) => {
      if (index < bus.route.length - 1) {
        const routeKey = `${stop}-${bus.route[index + 1]}`;
        routeCounts[routeKey] = (routeCounts[routeKey] || 0) + 1;
      }
    });
  });

  return Object.entries(routeCounts)
    .sort(([, a], [, b]) => Number(b) - Number(a))
    .slice(0, 10)
    .map(([route, count]) => ({ route, count }));
};

export default busData;