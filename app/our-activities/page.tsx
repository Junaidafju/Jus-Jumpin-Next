// app/our-activities/page.tsx
import ActivitiesClient from "./ActivitiesClient";

export const metadata = {
  title: "Our Activities | Jus Jumpin' - 25+ Fun Adventures for All Ages",
  description: "Discover 25+ exciting activities at India's premier indoor entertainment destination. Trampolines, ninja courses, climbing walls, VR games and more!",
  keywords: "trampoline park, kids activities, birthday parties, indoor adventure, ninja course, climbing wall",
  openGraph: {
    title: "A Universe of Adventures at Jus Jumpin'",
    description: "Experience 25+ thrilling activities for all ages. Book your adventure today!",
    images: ["/images/activities-og.jpg"],
  },
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}