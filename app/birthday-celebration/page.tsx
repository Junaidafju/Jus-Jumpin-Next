import BirthdayClient from './BirthdayClient';

// Server Component - No client-side code here
export const metadata = {
  title: 'Birthday Celebrations | Jus Jumpin - Magical Party Venue',
  description: 'Host unforgettable birthday parties for kids and adults at Jus Jumpin. Trampoline park, personalized decorations, food & endless entertainment.',
};

export default function BirthdayCelebrationPage() {
  return (
    <BirthdayClient />
  );
}