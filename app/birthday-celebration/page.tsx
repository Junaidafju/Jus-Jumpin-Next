import BirthdayClient from './BirthdayClient';
import { pageMetadata } from "@/lib/seo";

// Server Component - No client-side code here
export const metadata = pageMetadata(
  "Best Birthday Celebration Venue | Top Kids Birthday Party Halls",
  "Find the best kids birthday party venue in your city. Host a birthday party for your kid at our party zone with party games, delicious food and theme decorations.",
  "/birthday-celebration/",
);

export default function BirthdayCelebrationPage() {
  return (
    <BirthdayClient />
  );
}