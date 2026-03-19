import type { NavLink } from "../types/nav.types";
import {
  Home, Building2, LayoutGrid, Star, MapPin, Briefcase,
  Sparkles, BarChart3, BookOpen, Ruler, DollarSign,
} from "lucide-react";

export const NAV: NavLink[] = [
  { label: "Find Agent", href: "/agents" },

  {
    label: "Sell Property",
    children: [
      { label: "List for Sale",         href: "/list?purpose=sale",        icon: <Building2 className="w-4 h-4" />,  description: "Reach serious buyers"        },
      { label: "List for Rent",         href: "/list?purpose=rent",        icon: <Home className="w-4 h-4" />,       description: "Find quality tenants fast"   },
      { label: "List Off-Plan Project", href: "/list?completion=off_plan", icon: <Sparkles className="w-4 h-4" />,   description: "Promote your development"    },
      { label: "Agent Portal",          href: "/agent-portal",             icon: <Briefcase className="w-4 h-4" />,  description: "Manage listings & leads"     },
      { label: "Advertise with Domio",  href: "/advertise",                icon: <BarChart3 className="w-4 h-4" />,  description: "Reach 50,000+ monthly users" },
    ],
  },

  {
    label: "TrueValue™",
    children: [
      { label: "Get a Free Valuation",    href: "/valuation",       icon: <Star className="w-4 h-4" />,       description: "Instant AI-powered estimate"    },
      { label: "Market Intelligence",     href: "/market",          icon: <BarChart3 className="w-4 h-4" />,  description: "Nairobi & Kenya price trends"   },
      { label: "Price Heatmap",           href: "/market/heatmap",  icon: <MapPin className="w-4 h-4" />,     description: "Interactive price-per-sqft map" },
      { label: "Rental Yield Calculator", href: "/mortgage",        icon: <DollarSign className="w-4 h-4" />, description: "Calculate investment returns"   },
    ],
  },

  {
    label: "New Projects",
    badge: "New",
    children: [
      { label: "Off-Plan Properties", href: "/search?completion=off_plan",                  icon: <Building2 className="w-4 h-4" />,  description: "Invest early, save more"  },
      { label: "Upcoming Launches",   href: "/search?completion=off_plan&sortBy=date_desc", icon: <Sparkles className="w-4 h-4" />,   description: "Be the first to know", badge: "Hot" },
      { label: "Developer Listings",  href: "/search?completion=off_plan&sort=developer",   icon: <LayoutGrid className="w-4 h-4" />, description: "Direct from developers"   },
      { label: "Floor Plans",         href: "/floorplans",                                  icon: <Ruler className="w-4 h-4" />,      description: "Explore unit layouts"     },
    ],
  },

  {
    label: "More",
    mega: true,
    children: [
      { label: "Market Intelligence", href: "/market",       icon: <BarChart3 className="w-4 h-4" />,  description: "Price trends & insights"         },
      { label: "Guides",              href: "/guides",       icon: <BookOpen className="w-4 h-4" />,   description: "Area & buying guides", badge: "New" },
      { label: "Floor Plans",         href: "/floorplans",   icon: <Ruler className="w-4 h-4" />,      description: "Explore property layouts"        },
      { label: "Agent Portal",        href: "/agent-portal", icon: <Briefcase className="w-4 h-4" />,  description: "For agents & developers"         },
      { label: "Events",              href: "/events",       icon: <Sparkles className="w-4 h-4" />,   description: "Property expos & open days", badge: "New" },
    ],
  },
];