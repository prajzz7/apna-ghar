export const apartments = [
  {
    id: 1,
    name: "Sunrise Heights",
    location: "Koramangala, Bangalore",
    status: "Visited",
    priceQuote: "₹1.45 Cr",
    negotiatedPrice: "₹1.40 Cr",
    details: {
      type: "3 BHK",
      size: "1850 sqft",
      possession: "Dec 2025",
      amenities: ["Pool", "Gym", "Clubhouse", "24/7 Security"],
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop"
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy video
    documents: [
      { name: "Floor Plan A.pdf", type: "pdf", size: "2.4 MB", url: "assets/akkalkot to mumbai.pdf" },
      { name: "Cost Sheet.pdf", type: "pdf", size: "1.1 MB", url: "assets/TEST.pdf" },
      { name: "Legal Opinion.pdf", type: "pdf", size: "4.5 MB", url: "assets/TEST.pdf" }
    ],
    notes: "Liked the balcony view. Negotiated price includes car parking. Builder promised modular kitchen."
  },
  {
    id: 2,
    name: "Green Valley Residency",
    location: "Whitefield, Bangalore",
    status: "Shortlisted",
    priceQuote: "₹95 L",
    negotiatedPrice: "₹92 L",
    details: {
      type: "2 BHK",
      size: "1250 sqft",
      possession: "Ready to Move",
      amenities: ["Park", "Community Hall", "Power Backup"],
    },
    images: [
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005229766-939cb9a27dea?q=80&w=1000&auto=format&fit=crop"
    ],
    video: null,
    documents: [
      { name: "Master Plan.pdf", type: "pdf", size: "5.2 MB", url: "assets/TEST.pdf" },
      { name: "Amenity List.pdf", type: "pdf", size: "800 KB", url: "assets/TEST.pdf" }
    ],
    notes: "A bit far from main road, but very peaceful. Good construction quality. No swimming pool."
  },
  {
    id: 3,
    name: "Urban Oasis",
    location: "Indiranagar, Bangalore",
    status: "Under Negotiation",
    priceQuote: "₹2.10 Cr",
    negotiatedPrice: "Pending",
    details: {
      type: "3.5 BHK",
      size: "2100 sqft",
      possession: "June 2026",
      amenities: ["Sky Lounge", "Infinity Pool", "Squash Court", "Smart Home"],
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-2a4d04774c71?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop"
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    documents: [
      { name: "Brochure.pdf", type: "pdf", size: "12 MB", url: "assets/TEST.pdf" },
      { name: "Payment Plan.pdf", type: "pdf", size: "1.5 MB", url: "assets/TEST.pdf" }
    ],
    notes: "Premium location. Waiting for final meeting with sales head. Price is slightly negotiable."
  }
];
