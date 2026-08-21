export type LocationType = 'kids' | 'adults-kids';

export interface Activity {
  name: string;
  emoji: string;
  description: string;
  ageGroup: string;
  color: string;
  image?: string;
}

export interface PricingRow {
  label: string;
  weekday: string;
  weekend: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Highlight {
  title: string;
  emoji: string;
  paragraph: string;
  gradient: string;
  image?: string;
}

export interface LocationData {
  // Identity
  slug: string;
  type: LocationType;
  city: string;
  mall: string;
  stateName: string;

  // Hero
  heroImages: [string, string, string];
  h1: string;
  subtitle: string;

  // Intro
  introHeading: string;
  introText: string;
  flipCardImage: string;
  flipCardBullets: string[];

  // Highlights
  highlights: [Highlight, Highlight, Highlight, Highlight];

  // Activities
  activities: Activity[];

  // Timing
  weekdayHours: string;
  weekendHours: string;

  // Pricing
  pricing: PricingRow[];
  ticketNote: string;

  // Location
  address: string;
  phone: string;
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  reviewUrl: string;

  // Coordinates
  lat: number;
  lng: number;

  // FAQs
  faqs: FAQ[];

  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  accentColor: string;
}
