import BirthdayClient from './BirthdayClient';
import { pageMetadata } from "@/lib/seo";

// Server Component - No client-side code here
export const metadata = pageMetadata(
  "Birthday Celebrations | Jus Jumpin",
  "Host unforgettable birthday parties for kids and adults at Jus Jumpin. Trampoline park, personalized decorations, food & endless entertainment.",
  "/birthday-celebration/",
);

export default function BirthdayCelebrationPage() {
  return (
    <BirthdayClient />
  );
}