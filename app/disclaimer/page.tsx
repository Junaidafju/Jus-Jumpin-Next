import type { Metadata } from "next";
import { PolicyLayout } from "../components/legal/PolicyLayout";

export const metadata: Metadata = {
  title: "Disclaimer | Jus Jumpin",
  description:
    "Important visitor information about Jus Jumpin attraction rules, health restrictions, and supervision.",
};

const sections = [
  {
    id: "general-information",
    title: "General information",
    content: (
      <>
        <p>
          Information on this website is provided as general guidance about
          Jus Jumpin services, attractions, and visitor policies. Attraction
          instructions, age recommendations, and requirements are provided to
          help guests prepare for a visit.
        </p>
        <p>
          Rules and policies may be updated. Please check the current
          information posted at the venue and follow the instructions of Jus
          Jumpin staff and marshals during your visit.
        </p>
      </>
    ),
  },
  {
    id: "health-and-safety",
    title: "Health and safety",
    content: (
      <>
        <p>
          Jus Jumpin attractions involve physical activity and are not suitable
          for everyone. The supplied safety guidance identifies restrictions
          including pregnancy, fear of heights, intoxication, hypertension,
          heart disease, respiratory conditions, and limb injuries. Some
          attractions have additional restrictions, including epilepsy or
          recent surgeries for the Infinity Trampoline and balance disorders
          for the Sky Stepper.
        </p>
        <p>
          If you are unsure whether an attraction is suitable for you or your
          child, ask a Jus Jumpin team member before participating.
        </p>
      </>
    ),
  },
  {
    id: "parental-supervision",
    title: "Parental supervision",
    content: (
      <p>
        Staff provide general supervision within the play area, but parents
        and guardians remain responsible for directly supervising children
        and for their behaviour and wellbeing throughout the visit.
      </p>
    ),
  },
  {
    id: "related-policies",
    title: "Related policies",
    content: (
      <>
        <p>
          This notice does not replace the attraction-specific rules, the
          Safety Guidelines, or the Terms &amp; Conditions. Please review them
          before your visit.
        </p>
        <p>
          For questions, contact{" "}
          <a href="mailto:info@jusjumpin.com">info@jusjumpin.com</a> or call{" "}
          <a href="tel:+919874206206">+91 9874206206</a>.
        </p>
      </>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <PolicyLayout
      title="Disclaimer"
      intro="Important information about attraction guidance, health restrictions, and supervision at Jus Jumpin."
      sections={sections}
    />
  );
}
