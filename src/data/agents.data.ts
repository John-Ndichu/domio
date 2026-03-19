import type { Agency, Agent, AgentReview, City, PlatformStat, Testimonial } from "../types";

export const AGENCIES: Agency[] = [
  {
    id: "agency-1", name: "Elite Properties Kenya", slug: "elite-properties-kenya",
    logo: "https://ui-avatars.com/api/?name=Elite+Properties&background=1B4FBB&color=fff&size=200",
    description: "Nairobi's premier luxury real estate firm, specialising in high-end residential and commercial properties since 2005.",
    phone: "+254 20 123 4567", email: "info@eliteproperties.ke", website: "https://eliteproperties.ke",
    address: "The Westgate, Westlands", city: "Nairobi",
    verified: true, agentCount: 32, totalListings: 487, established: 2005, rating: 4.8, reviewCount: 234,
  },
  {
    id: "agency-2", name: "Apex Realtors", slug: "apex-realtors",
    logo: "https://ui-avatars.com/api/?name=Apex+Realtors&background=0D47A1&color=fff&size=200",
    description: "Dynamic real estate agency specialising in residential sales, rentals and property management across Nairobi and Mombasa.",
    phone: "+254 20 234 5678", email: "info@apexrealtors.ke", website: "https://apexrealtors.ke",
    address: "Apex Tower, Upperhill", city: "Nairobi",
    verified: true, agentCount: 47, totalListings: 712, established: 2010, rating: 4.7, reviewCount: 389,
  },
  {
    id: "agency-3", name: "Signature Real Estate", slug: "signature-real-estate",
    logo: "https://ui-avatars.com/api/?name=Signature+RE&background=283593&color=fff&size=200",
    description: "Kenya's #1 agent-driven property firm. Our signature agents deliver unmatched results in every price segment.",
    phone: "+254 20 345 6789", email: "info@signaturere.ke",
    address: "Signature House, Gigiri", city: "Nairobi",
    verified: true, agentCount: 61, totalListings: 934, established: 2008, rating: 4.9, reviewCount: 623,
  },
];

export const AGENTS: Agent[] = [
  {
    id: "agent-1", name: "James Mwangi", slug: "james-mwangi",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    coverPhoto: "https://picsum.photos/seed/cov1/1200/400",
    phone: "+254 712 345 678", email: "james@domio.ke", whatsapp: "+254712345678",
    agency: AGENCIES[0], rating: 4.8, reviewCount: 67,
    totalListings: 47, activeListings: 32, soldListings: 89, rentedListings: 124,
    responseTime: "Within 2 hours", languages: ["English","Swahili"],
    specializations: ["Luxury Residential","Off-Plan Investments"],
    areas: ["Westlands","Parklands","Gigiri","Runda"],
    about: "James is a seasoned real estate professional with over 12 years in the Nairobi market. Specialising in luxury residential properties across premier neighbourhoods, he has helped hundreds of clients find their perfect home. Known for deep market knowledge, integrity and exceptional client service.",
    verified: true, featured: true, yearsExperience: 12, nationality: "Kenyan",
    license: "ERB/2012/1234", joinedAt: "2018-03-01",
    socialLinks: { linkedin:"#", instagram:"#" },
    awards: [
      { id:"a1", title:"Top Agent of the Year", year:2023, issuer:"Kenya Property Awards" },
      { id:"a2", title:"Luxury Sales Award",    year:2022, issuer:"Elite Properties" },
    ],
  },
  {
    id: "agent-2", name: "Sarah Kamau", slug: "sarah-kamau",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    coverPhoto: "https://picsum.photos/seed/cov2/1200/400",
    phone: "+254 722 456 789", email: "sarah@domio.ke", whatsapp: "+254722456789",
    agency: AGENCIES[1], rating: 4.9, reviewCount: 112,
    totalListings: 63, activeListings: 48, soldListings: 145, rentedListings: 203,
    responseTime: "Within 1 hour", languages: ["English","Swahili","French"],
    specializations: ["High-End Rentals","Diplomatic Housing","Corporate Relocations"],
    areas: ["Kilimani","Lavington","Kileleshwa","Riverside"],
    about: "Sarah is one of Nairobi's most respected agents, consistently ranking at the top of Apex Realtors. With a background in finance and 10+ years in real estate, she brings a unique analytical perspective. Her trilingual abilities and international network make her particularly effective with diplomatic and expatriate clients.",
    verified: true, featured: true, yearsExperience: 10, nationality: "Kenyan",
    license: "ERB/2014/5678", joinedAt: "2019-06-01",
    socialLinks: { linkedin:"#", instagram:"#", twitter:"#" },
    awards: [
      { id:"b1", title:"Best Agent — Rentals",      year:2023, issuer:"Kenya Property Awards" },
      { id:"b2", title:"Customer Excellence Award", year:2023, issuer:"Apex Realtors" },
    ],
  },
  {
    id: "agent-3", name: "David Ochieng", slug: "david-ochieng",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    phone: "+254 733 567 890", email: "david@domio.ke", whatsapp: "+254733567890",
    agency: AGENCIES[1], rating: 4.7, reviewCount: 43,
    totalListings: 31, activeListings: 22, soldListings: 56, rentedListings: 87,
    responseTime: "Within 3 hours", languages: ["English","Swahili"],
    specializations: ["Family Homes","Land & Plots","Karen Specialist"],
    areas: ["Karen","Langata","South C","Ngong Road"],
    about: "David has built a reputation as the go-to agent for families looking to settle in Karen and the wider Langata area. His deep community ties and 8 years of experience make him an invaluable guide through buying and renting.",
    verified: true, featured: false, yearsExperience: 8, nationality: "Kenyan",
    license: "ERB/2016/9012", joinedAt: "2020-01-01",
  },
  {
    id: "agent-4", name: "Grace Njoki", slug: "grace-njoki",
    photo: "https://randomuser.me/api/portraits/women/29.jpg",
    coverPhoto: "https://picsum.photos/seed/cov4/1200/400",
    phone: "+254 745 678 901", email: "grace@domio.ke", whatsapp: "+254745678901",
    agency: AGENCIES[2], rating: 4.95, reviewCount: 178,
    totalListings: 89, activeListings: 71, soldListings: 234, rentedListings: 312,
    responseTime: "Within 30 mins", languages: ["English","Swahili","Kikuyu"],
    specializations: ["Penthouse & Luxury","Off-Plan","Property Investment"],
    areas: ["Westlands","Muthaiga","Runda","Spring Valley","Gigiri"],
    about: "Grace is Kenya's #1 ranked agent for the third consecutive year, closing over KSh 2 billion in transactions in 2023 alone. Her encyclopaedic market knowledge, unmatched network and relentless client focus have made her a legend in the industry.",
    verified: true, featured: true, yearsExperience: 15, nationality: "Kenyan",
    license: "ERB/2009/3456", joinedAt: "2017-09-01",
    socialLinks: { linkedin:"#", instagram:"#", twitter:"#", facebook:"#" },
    awards: [
      { id:"c1", title:"#1 Agent in Kenya",     year:2023, issuer:"Kenya Property Awards" },
      { id:"c2", title:"#1 Agent in Kenya",     year:2022, issuer:"Kenya Property Awards" },
      { id:"c3", title:"#1 Agent in Kenya",     year:2021, issuer:"Kenya Property Awards" },
      { id:"c4", title:"Billion Shilling Club", year:2023, issuer:"Signature Real Estate" },
    ],
  },
];

export const AGENT_REVIEWS: AgentReview[] = [
  { id:"rev-1", agentId:"agent-4", reviewerName:"Michael Oduya", reviewerPhoto:"https://randomuser.me/api/portraits/men/88.jpg", rating:5, comment:"Grace was absolutely phenomenal throughout the purchase of our Karen villa. Her market knowledge is unparalleled and she negotiated an exceptional deal for us. Highly recommended!", date:"2024-02-15", verified:true, propertyType:"Villa" },
  { id:"rev-2", agentId:"agent-2", reviewerName:"Jennifer Achieng", reviewerPhoto:"https://randomuser.me/api/portraits/women/91.jpg", rating:5, comment:"Sarah found us the perfect apartment in Kilimani within two weeks. Professional, responsive, and truly understands what her clients need.", date:"2024-01-28", verified:true, propertyType:"Apartment" },
  { id:"rev-3", agentId:"agent-1", reviewerName:"Robert Njoroge", reviewerPhoto:"https://randomuser.me/api/portraits/men/62.jpg", rating:4, comment:"James helped us navigate the Westlands market confidently. Very honest advice and great negotiation skills.", date:"2024-02-20", verified:true, propertyType:"Penthouse" },
  { id:"rev-4", agentId:"agent-3", reviewerName:"Susan Waweru", reviewerPhoto:"https://randomuser.me/api/portraits/women/74.jpg", rating:5, comment:"David is incredibly knowledgeable about Karen and the surrounding areas. Found us our dream home within budget. A true professional.", date:"2024-03-05", verified:true, propertyType:"Villa" },
];

export const CITIES: City[] = [
  { id:"city-1", name:"Nairobi",  slug:"nairobi",  image:"https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80", country:"Kenya", propertyCount:8432, description:"Kenya's vibrant capital, offering world-class residential and commercial real estate.", lat:-1.2921, lng:36.8219 },
  { id:"city-2", name:"Mombasa",  slug:"mombasa",  image:"https://images.unsplash.com/photo-1531213898768-a40e7e76b1e0?w=800&q=80", country:"Kenya", propertyCount:2341, description:"Kenya's coastal paradise with beautiful beachfront properties and rich cultural heritage.", lat:-4.0435, lng:39.6682 },
  { id:"city-3", name:"Kisumu",   slug:"kisumu",   image:"https://picsum.photos/seed/kisumu/800/600", country:"Kenya", propertyCount:876,  description:"Rapidly growing lakeside city with emerging real estate opportunities.", lat:-0.1022, lng:34.7617 },
  { id:"city-4", name:"Nakuru",   slug:"nakuru",   image:"https://picsum.photos/seed/nakuru/800/600", country:"Kenya", propertyCount:654,  description:"Kenya's fourth-largest city with affordable housing and excellent infrastructure.", lat:-0.3031, lng:36.0800 },
  { id:"city-5", name:"Eldoret",  slug:"eldoret",  image:"https://picsum.photos/seed/eldoret/800/600",country:"Kenya", propertyCount:423,  description:"A bustling agricultural and industrial hub in Kenya's North Rift region.", lat:0.5143, lng:35.2699 },
  { id:"city-6", name:"Thika",    slug:"thika",    image:"https://picsum.photos/seed/thika/800/600",  country:"Kenya", propertyCount:312,  description:"Industrial town near Nairobi with growing residential developments.", lat:-1.0332, lng:37.0693 },
];

export const TESTIMONIALS: Testimonial[] = [
  { id:"t1", name:"Patricia Wambua", photo:"https://randomuser.me/api/portraits/women/62.jpg", role:"Homeowner", comment:"Domio made finding our dream home in Karen so seamless. The platform is beautifully designed and the search tools are incredibly powerful. We found our perfect villa in under a week!", rating:5, date:"2024-02-10", propertyType:"Villa" },
  { id:"t2", name:"Kevin Omondi", photo:"https://randomuser.me/api/portraits/men/73.jpg", role:"Property Investor", company:"Omondi Capital", comment:"As a property investor I rely on accurate data and wide selection. Domio delivers both. Their market analytics have helped me identify the best investment opportunities in Nairobi.", rating:5, date:"2024-01-25", propertyType:"Multiple Properties" },
  { id:"t3", name:"Anne Wangari", photo:"https://randomuser.me/api/portraits/women/34.jpg", role:"First-time Buyer", comment:"Being a first-time buyer was daunting, but Domio's platform guided me every step of the way. The agent I connected with was exceptional. I'm now in my dream apartment in Kilimani!", rating:5, date:"2024-02-28", propertyType:"Apartment" },
  { id:"t4", name:"Samuel Gitau", photo:"https://randomuser.me/api/portraits/men/45.jpg", role:"Property Manager", company:"Gitau Properties", comment:"I've listed dozens of properties on Domio and the quality of inquiries is far superior to any other platform. The listing process is smooth and professional.", rating:5, date:"2024-03-01" },
];

export const PLATFORM_STATS: PlatformStat[] = [
  { id:"s1", label:"Active Listings",  value:"15,000+", icon:"🏠", description:"Properties available right now" },
  { id:"s2", label:"Happy Clients",    value:"50,000+", icon:"😊", description:"Satisfied buyers and renters" },
  { id:"s3", label:"Verified Agents",  value:"1,200+",  icon:"✅", description:"Trusted professionals" },
  { id:"s4", label:"Cities Covered",   value:"47",      icon:"🌍", description:"Across Kenya" },
];