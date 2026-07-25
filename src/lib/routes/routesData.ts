// Route pages are the primary organic-search surface, so each entry owns its
// own copy, image, and metadata — no shared boilerplate between routes.

export interface RoutePlace {
  name: string;
  description: string;
  emoji: string;
}

export interface RouteVehicle {
  name: string;
  emoji: string;
  reason: string;
}

export interface RouteReview {
  name: string;
  rating: number;
  text: string;
  vehicle: string;
}

export interface RouteData {
  slug: string;
  from: string;
  to: string;
  image: string;
  distance: string;
  duration: string;
  bestTime: string;
  rating: number;
  trips: number;
  description: string;
  highlights: string[];
  topPlaces: RoutePlace[];
  recommendedVehicles: RouteVehicle[];
  reviews: RouteReview[];
  relatedRoutes: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export const ROUTES_DATA: RouteData[] = [
  {
    slug: "pune-to-shirdi",
    from: "Pune",
    to: "Shirdi",
    image: "/images/routes/shirdi.jpg",
    distance: "242 km",
    duration: "4.5 - 5 hours",
    bestTime: "October to March",
    rating: 4.9,
    trips: 342,
    description:
      "Shirdi, the sacred abode of Sai Baba, is Maharashtra's most visited pilgrimage destination. Book your comfortable Pune to Shirdi cab with Obii Cabs and experience a hassle-free spiritual journey.",
    highlights: ["Most Popular Route", "Pilgrimage Special", "All Vehicles Available"],
    topPlaces: [
      {
        name: "Sai Baba Temple",
        description:
          "The main temple dedicated to Sai Baba. Open from 4 AM to 11 PM. Darshan can take 2-4 hours during peak times.",
        emoji: "🛕",
      },
      {
        name: "Dwarkamai",
        description:
          "The mosque where Sai Baba spent most of his life. A must-visit spiritual site in Shirdi.",
        emoji: "🕌",
      },
      {
        name: "Chavadi",
        description:
          "Where Sai Baba slept on alternate nights. A peaceful and historically significant spot.",
        emoji: "🏛️",
      },
      {
        name: "Shani Shingnapur",
        description: "Famous Shani temple 65 km from Shirdi. Often combined with Shirdi trip.",
        emoji: "⛪",
      },
      {
        name: "Wet N Joy Water Park",
        description: "Popular water park near Shirdi, perfect for families after the pilgrimage.",
        emoji: "🎢",
      },
    ],
    recommendedVehicles: [
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Most popular choice for Shirdi — premium comfort for 4.5 hour journey",
      },
      {
        name: "Ertiga",
        emoji: "🚙",
        reason: "Perfect for small families of 4-5 — spacious and comfortable",
      },
      {
        name: "Urbania",
        emoji: "🚌",
        reason: "Best for group pilgrimages — comfortable seating for 17 people",
      },
    ],
    reviews: [
      {
        name: "Rahul S.",
        rating: 5,
        text: "Amazing Shirdi trip! Driver was very professional and the Innova was spotless. Will definitely book again!",
        vehicle: "Innova Crysta",
      },
      {
        name: "Sneha R.",
        rating: 5,
        text: "Very comfortable journey. Driver knew all the shortcuts and we reached on time for morning aarti!",
        vehicle: "Ertiga",
      },
      {
        name: "Anita D.",
        rating: 5,
        text: "Second time booking with Obii Cabs for Shirdi. Consistent quality every time!",
        vehicle: "Innova Crysta",
      },
    ],
    relatedRoutes: ["pune-to-nashik", "pune-to-mumbai", "mumbai-to-shirdi"],
    seoTitle: "Pune to Shirdi Cab Service | Obii Cabs | ₹Best Rates | Book Now",
    seoDescription:
      "Book Pune to Shirdi cab with Obii Cabs. 242 km, 4.5 hours. Innova Crysta, Ertiga, Urbania available. Professional drivers. 4.9 rating. Call now!",
    seoKeywords:
      "pune to shirdi cab, pune shirdi taxi, pune to shirdi innova, shirdi cab booking pune, pune shirdi cab fare",
  },
  {
    slug: "pune-to-mumbai",
    from: "Pune",
    to: "Mumbai",
    image: "/images/routes/mumbai.jpg",
    distance: "150 km",
    duration: "2.5 - 3.5 hours",
    bestTime: "All Year Round",
    rating: 4.8,
    trips: 289,
    description:
      "The Pune to Mumbai route is one of the most travelled expressway routes in India. Obii Cabs provides comfortable, safe, and timely cab service between the two major cities of Maharashtra.",
    highlights: ["Express Highway", "Business Travel", "Airport Transfers"],
    topPlaces: [
      {
        name: "Gateway of India",
        description: "Iconic Mumbai landmark built in 1924. Perfect start to your Mumbai visit.",
        emoji: "🏛️",
      },
      {
        name: "Marine Drive",
        description:
          "The Queen's Necklace — beautiful coastal road perfect for evening walks.",
        emoji: "🌊",
      },
      {
        name: "Elephanta Caves",
        description:
          "UNESCO World Heritage Site — ancient rock-cut temples on Elephanta Island.",
        emoji: "🗿",
      },
      {
        name: "Siddhivinayak Temple",
        description:
          "Famous Ganpati temple — one of the most visited temples in Mumbai.",
        emoji: "🛕",
      },
      {
        name: "Juhu Beach",
        description: "Famous beach with street food and sunset views. A Mumbai must-visit!",
        emoji: "🏖️",
      },
    ],
    recommendedVehicles: [
      {
        name: "Swift Dzire",
        emoji: "🚗",
        reason: "Perfect for solo/couple travel on the expressway",
      },
      { name: "Ertiga", emoji: "🚙", reason: "Ideal for small family trips to Mumbai" },
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Best for business travel and comfortable group trips",
      },
    ],
    reviews: [
      {
        name: "Priya M.",
        rating: 5,
        text: "On-time pickup and smooth expressway drive. Reached Mumbai in 2.5 hours!",
        vehicle: "Innova Crysta",
      },
      {
        name: "Vijay P.",
        rating: 5,
        text: "Regular Pune-Mumbai traveler. Obii Cabs is my first choice always!",
        vehicle: "Swift Dzire",
      },
    ],
    relatedRoutes: ["pune-to-shirdi", "mumbai-to-nashik", "pune-to-mumbai-airport"],
    seoTitle: "Pune to Mumbai Cab Service | Obii Cabs | Express Highway | Book Now",
    seoDescription:
      "Book Pune to Mumbai cab with Obii Cabs. 150 km, 3 hours via expressway. Dzire, Ertiga, Innova available. Professional drivers. Call now!",
    seoKeywords:
      "pune to mumbai cab, pune mumbai taxi, pune to mumbai innova, mumbai cab booking pune, pune mumbai cab fare",
  },
  {
    slug: "pune-to-nashik",
    from: "Pune",
    to: "Nashik",
    image: "/images/routes/nashik.jpg",
    distance: "210 km",
    duration: "3.5 - 4 hours",
    bestTime: "October to February",
    rating: 4.7,
    trips: 156,
    description:
      "Nashik — the wine capital of India and a sacred pilgrimage city. Book your Pune to Nashik cab with Obii Cabs for a comfortable journey to this vibrant city.",
    highlights: ["Wine Country", "Pilgrimage City", "Weekend Getaway"],
    topPlaces: [
      {
        name: "Trimbakeshwar Temple",
        description:
          "One of the 12 Jyotirlingas — a sacred Shiva temple of great religious significance.",
        emoji: "🛕",
      },
      {
        name: "Sula Vineyards",
        description:
          "India's most famous vineyard. Wine tasting, tours, and a beautiful resort.",
        emoji: "🍷",
      },
      {
        name: "Pandavleni Caves",
        description:
          "24 ancient Buddhist caves dating back to 3rd century BC. A heritage gem.",
        emoji: "🗿",
      },
      {
        name: "Muktidham Temple",
        description:
          "Beautiful white marble temple — a replica of 12 Jyotirlingas under one roof.",
        emoji: "⛪",
      },
      {
        name: "Dugarwadi Waterfall",
        description:
          "Stunning waterfall best visited during monsoon. Perfect for nature lovers.",
        emoji: "💧",
      },
    ],
    recommendedVehicles: [
      { name: "Ertiga", emoji: "🚙", reason: "Perfect for Nashik weekend trips with family" },
      { name: "Innova Crysta", emoji: "🚐", reason: "Premium comfort for wine tour groups" },
      {
        name: "Swift Dzire",
        emoji: "🚗",
        reason: "Budget-friendly for couples and solo travelers",
      },
    ],
    reviews: [
      {
        name: "Vijay P.",
        rating: 5,
        text: "Excellent service for Nashik wine tour. On-time, clean cab, very professional!",
        vehicle: "Ertiga",
      },
      {
        name: "Meera T.",
        rating: 4,
        text: "Good service overall. Driver was very knowledgeable about Nashik routes.",
        vehicle: "Innova Crysta",
      },
    ],
    relatedRoutes: ["pune-to-shirdi", "nashik-to-shirdi", "mumbai-to-nashik"],
    seoTitle: "Pune to Nashik Cab Service | Obii Cabs | Wine Tour | Book Now",
    seoDescription:
      "Book Pune to Nashik cab with Obii Cabs. 210 km, 4 hours. Visit Trimbakeshwar, Sula Vineyards. Professional drivers. 4.7 rating. Call now!",
    seoKeywords:
      "pune to nashik cab, pune nashik taxi, nashik cab booking, pune nashik cab fare, nashik wine tour cab",
  },
  {
    slug: "pune-to-mahabaleshwar",
    from: "Pune",
    to: "Mahabaleshwar",
    image: "/images/routes/mahabaleshwar.jpg",
    distance: "120 km",
    duration: "2.5 - 3 hours",
    bestTime: "October to June",
    rating: 4.9,
    trips: 198,
    description:
      "Mahabaleshwar — the Queen of Hill Stations. Just 120 km from Pune, this beautiful hill station offers stunning valley views, strawberry farms, and cool mountain air. Book your Obii Cabs ride today!",
    highlights: ["Hill Station", "Family Favorite", "Weekend Special"],
    topPlaces: [
      {
        name: "Venna Lake",
        description:
          "Scenic lake in the heart of Mahabaleshwar. Boating and horse riding available.",
        emoji: "🏞️",
      },
      {
        name: "Elephant's Head Point",
        description: "Stunning viewpoint offering panoramic views of the valley below.",
        emoji: "🐘",
      },
      {
        name: "Strawberry Farms",
        description:
          "Fresh strawberry picking season from November to May. A unique experience!",
        emoji: "🍓",
      },
      {
        name: "Pratapgad Fort",
        description:
          "Historic Maratha fort where Shivaji Maharaj defeated Afzal Khan in 1659.",
        emoji: "🏰",
      },
      {
        name: "Wilson Point",
        description:
          "Highest point in Mahabaleshwar — best spot for sunrise and sunset views.",
        emoji: "🌅",
      },
    ],
    recommendedVehicles: [
      {
        name: "Ertiga",
        emoji: "🚙",
        reason: "Perfect for family trips — comfortable on mountain roads",
      },
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Premium hill station experience for larger groups",
      },
      { name: "Kia Carens", emoji: "🚌", reason: "Modern and comfortable for weekend getaways" },
    ],
    reviews: [
      {
        name: "Priya M.",
        rating: 5,
        text: "Best family trip to Mahabaleshwar. Clean cab, on time, kids loved it!",
        vehicle: "Ertiga",
      },
      {
        name: "Pooja R.",
        rating: 5,
        text: "Kia Carens is so comfortable! Smooth ride on mountain roads.",
        vehicle: "Kia Carens",
      },
    ],
    relatedRoutes: ["pune-to-lonavala", "pune-to-mumbai", "pune-to-goa"],
    seoTitle: "Pune to Mahabaleshwar Cab | Obii Cabs | Hill Station Trip | Book Now",
    seoDescription:
      "Book Pune to Mahabaleshwar cab with Obii Cabs. 120 km, 3 hours. Visit Venna Lake, Strawberry Farms. Family-friendly. 4.9 rating. Call now!",
    seoKeywords:
      "pune to mahabaleshwar cab, mahabaleshwar taxi pune, pune mahabaleshwar trip, hill station cab pune",
  },
  {
    slug: "pune-to-sambhajinagar",
    from: "Pune",
    to: "Sambhajinagar",
    image: "/images/routes/sambhajinagar.jpg",
    distance: "240 km",
    duration: "4 - 4.5 hours",
    bestTime: "October to March",
    rating: 4.6,
    trips: 87,
    description:
      "Sambhajinagar (Aurangabad) — the city of historical monuments and Mughal heritage. Book your Pune to Sambhajinagar cab with Obii Cabs and explore this fascinating historical city.",
    highlights: ["Heritage City", "Ajanta Ellora Gateway", "Historical Tour"],
    topPlaces: [
      {
        name: "Bibi Ka Maqbara",
        description:
          "The Taj of Deccan — a beautiful white marble mausoleum, often compared to the Taj Mahal.",
        emoji: "🕌",
      },
      {
        name: "Daulatabad Fort",
        description:
          "One of India's most impressive medieval forts with a complex defensive structure.",
        emoji: "🏰",
      },
      {
        name: "Ajanta Caves",
        description:
          "UNESCO World Heritage Site — ancient Buddhist cave paintings dating to 2nd century BC.",
        emoji: "🗿",
      },
      {
        name: "Ellora Caves",
        description:
          "Rock-cut temples representing Buddhist, Hindu, and Jain traditions. A true marvel!",
        emoji: "⛪",
      },
      {
        name: "Aurangabad Caves",
        description:
          "12 Buddhist caves from the 6th and 7th centuries with remarkable sculptures.",
        emoji: "🗺️",
      },
    ],
    recommendedVehicles: [
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Best for long 4+ hour journey to Sambhajinagar",
      },
      { name: "Ertiga", emoji: "🚙", reason: "Comfortable for family heritage tours" },
      { name: "Urbania", emoji: "🚌", reason: "Perfect for group heritage tours" },
    ],
    reviews: [
      {
        name: "Kavita S.",
        rating: 4,
        text: "Good experience for Sambhajinagar trip. Long journey but cab was very comfortable.",
        vehicle: "Innova Crysta",
      },
      {
        name: "Deepak M.",
        rating: 5,
        text: "Driver was very helpful. Took us to Ajanta and Ellora caves too!",
        vehicle: "Innova Crysta",
      },
    ],
    relatedRoutes: ["pune-to-shirdi", "nashik-to-shirdi", "pune-to-nashik"],
    seoTitle: "Pune to Sambhajinagar Cab | Obii Cabs | Ajanta Ellora Tour | Book Now",
    seoDescription:
      "Book Pune to Sambhajinagar (Aurangabad) cab. 240 km, 4 hours. Visit Ajanta Ellora, Bibi Ka Maqbara. Professional drivers. Call now!",
    seoKeywords:
      "pune to aurangabad cab, pune sambhajinagar taxi, aurangabad cab booking pune, ajanta ellora tour cab",
  },
  {
    slug: "pune-to-lonavala",
    from: "Pune",
    to: "Lonavala",
    image: "/images/routes/lonavala.jpg",
    distance: "65 km",
    duration: "1 - 1.5 hours",
    bestTime: "June to September (Monsoon)",
    rating: 4.8,
    trips: 214,
    description:
      "Lonavala — Maharashtra's most popular weekend getaway, just 65 km from Pune! Famous for its chikki, scenic viewpoints, and monsoon waterfalls. Perfect for a quick day trip with Obii Cabs.",
    highlights: ["Closest Hill Station", "Monsoon Special", "Day Trip Friendly"],
    topPlaces: [
      {
        name: "Bhushi Dam",
        description:
          "Famous dam with water overflowing during monsoon. Most visited spot in Lonavala!",
        emoji: "💧",
      },
      {
        name: "Tiger's Leap",
        description:
          "Dramatic cliff viewpoint offering stunning views of the valley below.",
        emoji: "🐅",
      },
      {
        name: "Karla Caves",
        description:
          "Ancient Buddhist caves dating back to 2nd century BC. A heritage must-visit.",
        emoji: "🗿",
      },
      {
        name: "Rajmachi Fort",
        description: "Historic fort perfect for trekking with panoramic Sahyadri views.",
        emoji: "🏰",
      },
      {
        name: "Lonavala Lake",
        description:
          "Scenic lake offering peaceful surroundings and beautiful sunset views.",
        emoji: "🏞️",
      },
    ],
    recommendedVehicles: [
      { name: "Swift Dzire", emoji: "🚗", reason: "Perfect for quick day trips — budget friendly" },
      { name: "Ertiga", emoji: "🚙", reason: "Best for family day trips to Lonavala" },
      { name: "Innova Crysta", emoji: "🚐", reason: "Comfortable group trips to Lonavala" },
    ],
    reviews: [
      {
        name: "Suresh B.",
        rating: 5,
        text: "Quick and comfortable ride to Lonavala. Driver was punctual and friendly!",
        vehicle: "Ertiga",
      },
      {
        name: "Rohan K.",
        rating: 5,
        text: "Great monsoon trip experience. Driver took us to the best viewpoints!",
        vehicle: "Swift Dzire",
      },
    ],
    relatedRoutes: ["pune-to-mumbai", "pune-to-mahabaleshwar", "pune-to-goa"],
    seoTitle: "Pune to Lonavala Cab | Obii Cabs | Day Trip Special | Book Now",
    seoDescription:
      "Book Pune to Lonavala cab with Obii Cabs. Just 65 km, 1 hour. Best monsoon day trip. Bhushi Dam, Tiger's Leap. Affordable rates. Call now!",
    seoKeywords:
      "pune to lonavala cab, lonavala taxi pune, pune lonavala day trip, lonavala cab booking",
  },
  {
    slug: "pune-to-goa",
    from: "Pune",
    to: "Goa",
    image: "/images/routes/goa.jpg",
    distance: "460 km",
    duration: "8 - 9 hours",
    bestTime: "November to February",
    rating: 4.9,
    trips: 64,
    description:
      "Pune to Goa — the ultimate road trip! Experience the beautiful Sahyadri ghats, coastal highways, and end up at India's most famous beach destination. Book your Pune to Goa cab with Obii Cabs!",
    highlights: ["Long Road Trip", "Beach Destination", "Group Travel"],
    topPlaces: [
      {
        name: "Baga Beach",
        description:
          "Goa's most popular beach — perfect for water sports, nightlife, and beach shacks.",
        emoji: "🏖️",
      },
      {
        name: "Basilica of Bom Jesus",
        description:
          "UNESCO World Heritage Site — 400-year-old Portuguese church housing St. Francis Xavier.",
        emoji: "⛪",
      },
      {
        name: "Fort Aguada",
        description:
          "Iconic Portuguese fort with a lighthouse offering panoramic ocean views.",
        emoji: "🏰",
      },
      {
        name: "Dudhsagar Falls",
        description:
          "One of India's highest waterfalls — a spectacular sight during monsoon.",
        emoji: "💧",
      },
      {
        name: "Anjuna Flea Market",
        description:
          "Famous Wednesday market with antiques, clothes, and Goan handicrafts.",
        emoji: "🛍️",
      },
    ],
    recommendedVehicles: [
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Best for long Goa road trip — premium comfort for 8+ hours",
      },
      {
        name: "Urbania",
        emoji: "🚌",
        reason: "Perfect for group Goa trips — spacious and comfortable",
      },
      { name: "Ertiga", emoji: "🚙", reason: "Good for small family Goa trips" },
    ],
    reviews: [
      {
        name: "Amit K.",
        rating: 5,
        text: "Best Goa road trip ever! Driver was excellent on the ghats section.",
        vehicle: "Innova Crysta",
      },
      {
        name: "Deepak M.",
        rating: 5,
        text: "Group trip to Goa in Urbania was perfect. Everyone was comfortable!",
        vehicle: "Urbania",
      },
    ],
    relatedRoutes: ["pune-to-mumbai", "pune-to-mahabaleshwar", "pune-to-lonavala"],
    seoTitle: "Pune to Goa Cab Service | Obii Cabs | Best Road Trip | Book Now",
    seoDescription:
      "Book Pune to Goa cab with Obii Cabs. 460 km road trip. Innova, Urbania available. Experienced drivers for ghat roads. Best rates. Call now!",
    seoKeywords:
      "pune to goa cab, pune goa taxi, pune to goa road trip, goa cab booking pune, pune goa innova",
  },
  {
    slug: "mumbai-to-shirdi",
    from: "Mumbai",
    to: "Shirdi",
    image: "/images/routes/mumbai-shirdi.jpg",
    distance: "296 km",
    duration: "5 - 6 hours",
    bestTime: "October to March",
    rating: 4.9,
    trips: 176,
    description:
      "Mumbai to Shirdi is one of Maharashtra's most popular pilgrimage routes. Obii Cabs provides comfortable, safe cab service for your spiritual journey from the city of dreams to the abode of Sai Baba.",
    highlights: ["Most Popular Route", "Pilgrimage Special", "Mumbai Pickup"],
    topPlaces: [
      {
        name: "Sai Baba Temple",
        description: "The main temple dedicated to Sai Baba. Open from 4 AM to 11 PM.",
        emoji: "🛕",
      },
      {
        name: "Dwarkamai",
        description: "The mosque where Sai Baba spent most of his life.",
        emoji: "🕌",
      },
      {
        name: "Shani Shingnapur",
        description: "Famous Shani temple 65 km from Shirdi. Often combined with this trip.",
        emoji: "⛪",
      },
      {
        name: "Chavadi",
        description:
          "Where Sai Baba slept on alternate nights. Peaceful and significant spot.",
        emoji: "🏛️",
      },
    ],
    recommendedVehicles: [
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Most popular for long Mumbai-Shirdi journey",
      },
      { name: "Ertiga", emoji: "🚙", reason: "Comfortable for family pilgrimages" },
      { name: "Urbania", emoji: "🚌", reason: "Best for group pilgrimages from Mumbai" },
    ],
    reviews: [
      {
        name: "Sneha R.",
        rating: 5,
        text: "Very comfortable journey from Mumbai to Shirdi. Driver was polite!",
        vehicle: "Innova Crysta",
      },
      {
        name: "Anita D.",
        rating: 5,
        text: "Smooth ride, professional driver. Reached Shirdi well on time for darshan!",
        vehicle: "Ertiga",
      },
    ],
    relatedRoutes: ["pune-to-shirdi", "mumbai-to-nashik", "nashik-to-shirdi"],
    seoTitle: "Mumbai to Shirdi Cab Service | Obii Cabs | Pilgrimage Special | Book Now",
    seoDescription:
      "Book Mumbai to Shirdi cab with Obii Cabs. 296 km, 5-6 hours. Innova, Ertiga, Urbania available. Professional drivers. 4.9 rating. Call now!",
    seoKeywords:
      "mumbai to shirdi cab, mumbai shirdi taxi, shirdi cab from mumbai, mumbai to shirdi innova",
  },
  {
    slug: "mumbai-to-nashik",
    from: "Mumbai",
    to: "Nashik",
    image: "/images/routes/mumbai-nashik.jpg",
    distance: "165 km",
    duration: "3 - 3.5 hours",
    bestTime: "October to March",
    rating: 4.7,
    trips: 92,
    description:
      "Mumbai to Nashik — a quick and comfortable drive to the wine capital of India. Perfect for weekend wine tours, pilgrimage trips, and family getaways. Book with Obii Cabs for a premium experience.",
    highlights: ["Wine Tour", "Weekend Getaway", "Pilgrimage Route"],
    topPlaces: [
      {
        name: "Sula Vineyards",
        description:
          "India's most famous vineyard with wine tasting and beautiful resort.",
        emoji: "🍷",
      },
      {
        name: "Trimbakeshwar Temple",
        description:
          "One of the 12 Jyotirlingas — sacred Shiva temple of great significance.",
        emoji: "🛕",
      },
      {
        name: "Pandavleni Caves",
        description: "24 ancient Buddhist caves from 3rd century BC.",
        emoji: "🗿",
      },
      {
        name: "Dugarwadi Waterfall",
        description: "Beautiful waterfall best visited during monsoon season.",
        emoji: "💧",
      },
    ],
    recommendedVehicles: [
      { name: "Ertiga", emoji: "🚙", reason: "Perfect for Mumbai-Nashik wine tours" },
      { name: "Innova Crysta", emoji: "🚐", reason: "Premium comfort for group trips" },
      { name: "Swift Dzire", emoji: "🚗", reason: "Budget option for couples" },
    ],
    reviews: [
      {
        name: "Deepak M.",
        rating: 5,
        text: "Family reunion in Nashik was perfect with Obii Cabs. Driver was like family!",
        vehicle: "Urbania",
      },
      {
        name: "Meera T.",
        rating: 4,
        text: "Good service overall. Comfortable ride from Mumbai to Nashik.",
        vehicle: "Ertiga",
      },
    ],
    relatedRoutes: ["mumbai-to-shirdi", "nashik-to-shirdi", "pune-to-nashik"],
    seoTitle: "Mumbai to Nashik Cab Service | Obii Cabs | Wine Tour Special | Book Now",
    seoDescription:
      "Book Mumbai to Nashik cab with Obii Cabs. 165 km, 3 hours. Visit Sula Vineyards, Trimbakeshwar. Professional drivers. Call now!",
    seoKeywords:
      "mumbai to nashik cab, nashik taxi from mumbai, mumbai nashik cab fare, nashik wine tour from mumbai",
  },
  {
    slug: "mumbai-to-pune",
    from: "Mumbai",
    to: "Pune",
    image: "/images/routes/mumbai-pune.jpg",
    distance: "150 km",
    duration: "2.5 - 3.5 hours",
    bestTime: "All Year Round",
    rating: 4.8,
    trips: 231,
    description:
      "Mumbai to Pune — one of India's busiest expressway routes. Whether for business or leisure, Obii Cabs ensures a smooth, comfortable, and timely journey between these two major Maharashtra cities.",
    highlights: ["Express Highway", "Business Travel", "Regular Route"],
    topPlaces: [
      {
        name: "Shaniwar Wada",
        description: "Historic Maratha fortification in the heart of Pune city.",
        emoji: "🏰",
      },
      {
        name: "Aga Khan Palace",
        description:
          "Historic palace where Mahatma Gandhi was held during independence movement.",
        emoji: "🏛️",
      },
      {
        name: "Sinhagad Fort",
        description: "Famous hill fort offering stunning views of the Deccan plateau.",
        emoji: "🏔️",
      },
      {
        name: "Osho Ashram",
        description:
          "World-famous meditation center and spiritual commune in Koregaon Park.",
        emoji: "🧘",
      },
    ],
    recommendedVehicles: [
      { name: "Swift Dzire", emoji: "🚗", reason: "Best for solo business travel on expressway" },
      { name: "Innova Crysta", emoji: "🚐", reason: "Premium comfort for executive travel" },
      { name: "Ertiga", emoji: "🚙", reason: "Great for family trips from Mumbai to Pune" },
    ],
    reviews: [
      {
        name: "Vijay P.",
        rating: 5,
        text: "Regular Mumbai-Pune traveler. Obii Cabs is always reliable and on time!",
        vehicle: "Swift Dzire",
      },
      {
        name: "Rohan K.",
        rating: 5,
        text: "Professional driver, clean cab. Perfect business travel experience!",
        vehicle: "Innova Crysta",
      },
    ],
    relatedRoutes: ["pune-to-mumbai", "mumbai-to-nashik", "mumbai-to-shirdi"],
    seoTitle: "Mumbai to Pune Cab Service | Obii Cabs | Express Highway | Book Now",
    seoDescription:
      "Book Mumbai to Pune cab with Obii Cabs. 150 km, 3 hours via expressway. Professional drivers. Business travel specialists. Call now!",
    seoKeywords:
      "mumbai to pune cab, mumbai pune taxi, mumbai to pune innova, pune cab from mumbai, mumbai pune cab fare",
  },
  {
    slug: "nashik-to-shirdi",
    from: "Nashik",
    to: "Shirdi",
    image: "/images/routes/nashik-shirdi.jpg",
    distance: "90 km",
    duration: "1.5 - 2 hours",
    bestTime: "All Year Round",
    rating: 4.8,
    trips: 118,
    description:
      "Nashik to Shirdi is a short but spiritually significant route. Often combined with a Nashik pilgrimage trip. Obii Cabs provides reliable and comfortable cab service for this divine journey.",
    highlights: ["Short Route", "Pilgrimage Combo", "Quick Trip"],
    topPlaces: [
      {
        name: "Sai Baba Temple",
        description: "The main temple in Shirdi dedicated to Sai Baba.",
        emoji: "🛕",
      },
      {
        name: "Dwarkamai",
        description: "The mosque where Sai Baba spent most of his life.",
        emoji: "🕌",
      },
      {
        name: "Shani Shingnapur",
        description: "Famous Shani temple on the way — perfect combo stop.",
        emoji: "⛪",
      },
    ],
    recommendedVehicles: [
      {
        name: "Swift Dzire",
        emoji: "🚗",
        reason: "Short route — Dzire is perfect and budget friendly",
      },
      { name: "Ertiga", emoji: "🚙", reason: "Comfortable for small family pilgrimage" },
    ],
    reviews: [
      {
        name: "Kavita S.",
        rating: 5,
        text: "Quick and comfortable ride from Nashik to Shirdi. Will book again!",
        vehicle: "Swift Dzire",
      },
      {
        name: "Suresh B.",
        rating: 5,
        text: "Driver was very helpful and took us to Shani Shingnapur on the way!",
        vehicle: "Ertiga",
      },
    ],
    relatedRoutes: ["pune-to-shirdi", "mumbai-to-shirdi", "pune-to-nashik"],
    seoTitle: "Nashik to Shirdi Cab Service | Obii Cabs | Pilgrimage Route | Book Now",
    seoDescription:
      "Book Nashik to Shirdi cab with Obii Cabs. Just 90 km, 2 hours. Pilgrimage special. Visit Shani Shingnapur on the way. Call now!",
    seoKeywords:
      "nashik to shirdi cab, nashik shirdi taxi, shirdi cab from nashik, nashik shirdi cab fare",
  },
  {
    slug: "pune-to-mumbai-airport",
    from: "Pune",
    to: "Mumbai Airport",
    image: "/images/routes/mumbai-airport.jpg",
    distance: "160 km",
    duration: "3 - 4 hours",
    bestTime: "All Year Round",
    rating: 4.9,
    trips: 143,
    description:
      "Pune to Mumbai Airport transfers — reliable, punctual, and comfortable. Never miss a flight again! Obii Cabs specializes in airport transfers with professional drivers who know the best routes.",
    highlights: ["Airport Transfer", "Flight Guarantee", "24/7 Available"],
    topPlaces: [
      {
        name: "Chhatrapati Shivaji Airport",
        description:
          "Mumbai's international airport — Terminal 2 for international, Terminal 1 for domestic.",
        emoji: "✈️",
      },
      {
        name: "Terminal 2 (T2)",
        description:
          "International flights terminal — beautiful architecture and world-class facilities.",
        emoji: "🌍",
      },
      {
        name: "Terminal 1 (T1)",
        description:
          "Domestic flights terminal — IndiGo, SpiceJet, Air India domestic flights.",
        emoji: "🛫",
      },
    ],
    recommendedVehicles: [
      { name: "Swift Dzire", emoji: "🚗", reason: "Budget airport transfer for solo travelers" },
      {
        name: "Innova Crysta",
        emoji: "🚐",
        reason: "Premium airport transfer with luggage space",
      },
      { name: "Ertiga", emoji: "🚙", reason: "Family airport transfer with comfortable seating" },
    ],
    reviews: [
      {
        name: "Rohan K.",
        rating: 5,
        text: "Driver was waiting with name board at 4 AM! Very professional airport transfer service.",
        vehicle: "Swift Dzire",
      },
      {
        name: "Vijay P.",
        rating: 5,
        text: "Never missed a flight with Obii Cabs. Always on time for airport drops!",
        vehicle: "Innova Crysta",
      },
    ],
    relatedRoutes: ["pune-to-mumbai", "mumbai-to-pune", "pune-to-shirdi"],
    seoTitle: "Pune to Mumbai Airport Cab | Obii Cabs | Never Miss a Flight | Book Now",
    seoDescription:
      "Reliable Pune to Mumbai Airport cab transfer. 160 km, 3 hours. 24/7 available. Professional drivers. On-time guarantee. Call now!",
    seoKeywords:
      "pune to mumbai airport cab, pune airport transfer, pune to csia cab, pune mumbai airport taxi",
  },
];

export function getRouteBySlug(slug: string): RouteData | undefined {
  return ROUTES_DATA.find((route) => route.slug === slug);
}

// Preserves the order given in `relatedRoutes` rather than the order of
// ROUTES_DATA, so each page controls how its own sidebar reads.
export function getRelatedRoutes(slugs: string[]): RouteData[] {
  return slugs
    .map((slug) => getRouteBySlug(slug))
    .filter((route): route is RouteData => route !== undefined);
}

// Departure cities, derived so the listing filter can never drift out of sync
// with the data.
export const ROUTE_ORIGINS = ["All", ...new Set(ROUTES_DATA.map((r) => r.from))] as const;
