import type { Metadata } from "next";
import { PolicyLayout } from "../components/legal/PolicyLayout";
import styles from "../components/legal/PolicyLayout.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Terms & Conditions | Jus Jumpin",
  "Read the Jus Jumpin party, venue, and attraction rules before your visit.",
  "/terms-and-conditions/",
);

const categories = [
  {
    id: "slides",
    title: "Slides",
    icon: "🛝",
    attractions: [
      {
        name: "Donut Slide",
        age: "6+",
        rules: [
          "Use only the provided donut tube.",
          "Sit properly on the donut tube and hold both handles firmly.",
          "Ensure the slide is clear before starting.",
          "Only one rider per tube unless instructed otherwise.",
          "Do not use your feet to slow down.",
          "Do not climb back up the slide.",
          "Leave the landing area immediately after finishing.",
        ],
      },
      {
        name: "Wave Slide",
        age: "3+",
        rules: [
          "Sit upright with legs extended while sliding.",
          "Only one participant may slide at a time.",
          "Keep a safe distance from the previous rider.",
          "Do not stop midway.",
          "Do not climb the slide from the bottom.",
          "Exit the landing area immediately.",
        ],
      },
      {
        name: "Tunnel Slide",
        age: "All ages",
        rules: [
          "Sit facing forward with legs extended.",
          "Only one participant at a time.",
          "Ensure the exit is clear before sliding.",
          "Do not stop inside the tunnel.",
          "Do not climb backwards through the slide.",
          "No pushing at the entrance.",
          "Exit immediately after landing.",
        ],
      },
    ],
  },
  {
    id: "climbing",
    title: "Climbing & Height Adventures",
    icon: "🧗",
    attractions: [
      {
        name: "Sky Stepper",
        age: "6+",
        rules: [
          "Health restrictions for this attraction also cover balance disorders, in addition to the general park restrictions.",
          "Cross one step at a time while maintaining your balance.",
          "Hold the support ropes whenever provided.",
          "Allow the previous participant to finish before starting.",
          "Do not jump between steps or swing excessively.",
          "Maintain a safe distance from other participants.",
          "Exit immediately after completing the course.",
        ],
      },
      {
        name: "Obstacle Zone",
        age: "All ages",
        rules: [
          "Complete obstacles in the designated order.",
          "Only one participant per obstacle.",
          "Hold handrails wherever provided.",
          "No pushing or overtaking.",
          "Do not perform dangerous stunts.",
          "Use designated landing areas only.",
          "Exit immediately after completing the course.",
        ],
      },
      {
        name: "Hanging Bridge",
        age: "All ages",
        rules: [
          "Cross one participant at a time unless instructed otherwise.",
          "Hold both side ropes while crossing.",
          "Walk carefully without running.",
          "Maintain distance from the participant ahead.",
          "Do not shake or swing the bridge.",
          "No jumping on the bridge.",
          "Exit immediately after crossing.",
        ],
      },
    ],
  },
  {
    id: "trampolines",
    title: "Trampolines",
    icon: "🤸",
    attractions: [
      {
        name: "Infinity Trampoline",
        age: "3+ (children under 6 must be supervised)",
        rules: [
          "Health restrictions for this attraction also cover epilepsy and recent surgeries, in addition to the general park restrictions.",
          "Only one participant is allowed on each trampoline at a time.",
          "Land on both feet, knees slightly bent, to absorb impact.",
          "Do not attempt flips, somersaults, or tricks beyond your skill level.",
          "Do not jump from one trampoline to another.",
          "Do not sit, lie down, or crawl on the trampoline bed.",
          "Exit immediately after your session and keep the trampoline clear for the next participant.",
        ],
      },
    ],
  },
  {
    id: "rides",
    title: "Thrill Rides",
    icon: "🎢",
    attractions: [
      {
        name: "Merry-Go-Round",
        age: "All ages",
        rules: [
          "Sit properly before the ride begins.",
          "Hold the handles throughout the ride.",
          "Keep hands and feet inside the ride.",
          "Do not stand while the equipment is moving.",
          "Do not push or spin the ride excessively.",
          "Wait until the ride stops completely before getting off.",
          "One participant per designated seat.",
        ],
      },
      {
        name: "Swing",
        age: "All ages",
        rules: [
          "Sit properly before swinging.",
          "Hold both chains or ropes firmly.",
          "Only one participant per swing.",
          "Do not jump off while moving.",
          "Keep clear of moving swings.",
          "Wait until the swing stops before getting off.",
          "Do not twist or wrap the chains.",
        ],
      },
      {
        name: "360° Cycling",
        age: "6+",
        rules: [
          "Wear the provided safety harness correctly before starting.",
          "Only one participant may use the equipment at a time.",
          "Only staff may operate the equipment.",
          "Keep both hands on the handlebars throughout the ride.",
          "Do not unbuckle the harness until instructed by the marshal.",
          "Exit only after the equipment comes to a complete stop.",
        ],
      },
    ],
  },
  {
    id: "active-play",
    title: "Active Play",
    icon: "⚽",
    attractions: [
      {
        name: "Basketball Area",
        age: "All ages (under-6s must be supervised)",
        rules: [
          "Keep the playing area clear.",
          "Shoot only from the designated area.",
          "Do not hang or climb on the basketball hoop.",
          "Keep both feet on the ground while shooting.",
          "Do not throw balls at other participants.",
          "Avoid pushing or blocking others.",
          "Return basketballs after use.",
        ],
      },
      {
        name: "Pin Wall",
        age: "All ages",
        rules: [
          "Stand only in the designated position.",
          "Press your body gently against the pin wall.",
          "Keep fingers away from the sides of the pins.",
          "Only one participant at a time.",
          "Do not jump or run into the wall.",
          "Do not push other participants against the wall.",
          "Exit the activity area after use.",
        ],
      },
      {
        name: "Drop Stick Reflex Game",
        age: "All ages",
        rules: [
          "Stand within the designated play area.",
          "Catch only the stick assigned to your position.",
          "Keep your eyes on the dropping sticks at all times.",
          "Do not dive or jump aggressively.",
          "Do not interfere with other participants.",
          "Wait for the marshal's signal before each round.",
          "Return to the starting position after each attempt.",
        ],
      },
    ],
  },
  {
    id: "soft-play",
    title: "Soft Play & Toddler Zones",
    icon: "🧸",
    attractions: [
      {
        name: "Sand Pit",
        age: "Children only (under-3s must be supervised)",
        rules: [
          "Keep the sand clean at all times.",
          "Remove shoes before entering if instructed.",
          "Do not throw sand at others.",
          "Keep sand away from eyes, ears and mouth.",
          "No running or rough play inside the sand pit.",
          "Wash or brush off sand before leaving the play area.",
        ],
      },
      {
        name: "Foam Pit",
        age: "All ages",
        rules: [
          "Remove all valuables before participating.",
          "Jump only from the designated platform.",
          "Ensure the foam pit is clear before jumping.",
          "Enter feet first, or land safely on your back or hips.",
          "Exit immediately after landing.",
          "Do not dive headfirst.",
          "Do not bury yourself beneath the foam cubes.",
          "No pushing or rough play.",
        ],
      },
      {
        name: "Toddler Play Area",
        age: "Toddlers only (adult supervision mandatory)",
        rules: [
          "Remove shoes before entering.",
          "No rough play.",
          "Do not climb outside designated play structures.",
          "Do not bring food or drinks into the play area.",
          "Keep toys inside the toddler zone.",
          "Report damaged equipment to staff immediately.",
        ],
      },
    ],
  },
];

const partyTerms = [
  {
    title: "Minimum Guest Requirement",
    text: "To book a party package, a minimum of 10 kids & 10 adults are required. In case minimum requirement for adults not met than 15 kids are mandatory for the birthday party.",
  },
  {
    title: "Socks Policy",
    text: "To ensure safety, all guests must wear anti-skid socks in the play area. You may bring your own or purchase them at the counter.",
  },
  {
    title: "Party Duration",
    text: "Party durations are determined based on the time slots available with a buffer period allocated for wrap-up. Exceeding the scheduled time may incur an additional charge depending on the overage. We will communicate the specific time slot and any potential overage charges clearly during the booking process.",
  },
  {
    title: "Supervision",
    text: "While our staff provides general supervision within the play area, direct supervision of children remains the responsibility of parents or guardians. We kindly request that you ensure adequate supervision of children throughout the party.",
  },
  {
    title: "Vendors and Decorations",
    text: "To maintain a consistent and safe environment, we do not permit outside photographers, vendors, or personal decorations. We offer various party enhancements and are happy to discuss options to personalize your event.",
  },
  {
    title: "Food and Beverages",
    text: "For hygiene and safety reasons within the play zone, outside food and beverages are not permitted. We offer a diverse selection of food and beverage options on-site for your convenience.",
  },
  {
    title: "Party Exclusivity",
    text: "A dedicated birthday party zone is allocated for celebrating a birthday party. The company does not provide exclusivity for the entire play/trampoline area.",
  },
  {
    title: "Billing Policy",
    text: "Billing is based on the Minimum Guarantee (MG). Any agreed-upon changes to the MG, communicated via WhatsApp or other agreed-upon channels, will be considered final and reflected in the invoice.",
  },
  {
    title: "Social Media Use",
    text: "By booking a party, you acknowledge that we may use photographs taken during the event for promotional purposes on our social media platforms. We respect your privacy and are happy to discuss any concerns you may have.",
  },
  {
    title: "Safety Measures",
    text: "Guest safety is our utmost priority. All play equipment is regularly sanitized and maintained. We kindly request that all guests adhere to our safety instructions and guidelines.",
  },
  {
    title: "Party Coordination",
    text: "Our dedicated party coordinator will be available to assist you throughout your event, ensuring a seamless and enjoyable experience. Please do not hesitate to contact them with any questions or special requests.",
  },
  {
    title: "Liability and Damages",
    text: "Parents or guardians are responsible for any damages caused by their children or guests to the venue or equipment. We appreciate your cooperation in maintaining the venue's condition.",
  },
  {
    title: "Additional Requests",
    text: "We are happy to consider special requests, such as additional food, themed decorations, or customized activities. Please inform us of these requests in advance, and we will do our best to accommodate them, subject to availability and feasibility.",
  },
  {
    title: "Event Timing",
    text: "We kindly request that all guests arrive at least 15 minutes before the scheduled start time.",
  },
  {
    title: "Amendments to Digital Invitation",
    text: "We are dedicated to delivering precise and required digital invitations. If any alternative or adjustments are required, clients must inform us at least 24 hours before the scheduled event time. Unfortunately, any adjustments being requested after this deadline may not be accomplished.",
  },
  {
    title: "Policy Amendments and Enforcement",
    text: "Jus Jumpin reserves the right to amend, modify, or update these Terms and Conditions and any applicable policies at any time, with changes effective immediately upon posting on the premises, the company website, or by other reasonable notice.",
  },
];

const sections = [
  { id: "general-safety", title: "General Safety" },
  ...categories.map(({ id, title }) => ({ id, title })),
  { id: "party-terms", title: "Party Terms" },
];

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      intro="Please read the venue terms and attraction rules before visiting or booking a party. Play safe, jump happy."
      sections={sections.map((item) => ({
        ...item,
        content:
          item.id === "general-safety" ? (
            <>
              <p>
                These rules apply across the park, in addition to the specific
                requirements listed for each attraction.
              </p>
              <ul className={styles.checkList}>
                <li>
                  Follow on-site safety regulations and staff instructions at
                  all times to avoid hazards and keep everyone safe.
                </li>
                <li>
                  No sharp, fragile or valuable items in the play area. Please
                  leave these with a member of your party or at the counter.
                </li>
                <li>
                  Wear long sleeves and long trousers to prevent abrasions.
                  Avoid loose clothing (long dresses, drawstrings) and excessive
                  accessories.
                </li>
                <li>
                  Anti-skid socks are required in the play area — bring your own
                  or purchase a pair at the counter.
                </li>
              </ul>
              <div className={styles.callout}>
                <strong>Health restrictions</strong>
                <p>
                  Our attractions are not suitable for pregnant guests, anyone
                  with a fear of heights, intoxicated guests, or those with
                  hypertension, heart disease, respiratory conditions or limb
                  injuries. If you&apos;re unsure whether an attraction is
                  right for you, please ask a member of our team.
                </p>
              </div>
            </>
          ) : item.id === "party-terms" ? (
            <>
              <p>
                Please read these terms before booking a party or visiting Jus
                Jumpin.
              </p>
              {partyTerms.map((term) => (
                <details className={styles.disclosure} key={term.title}>
                  <summary>{term.title}</summary>
                  <div className={styles.disclosureBody}>
                    <p>{term.text}</p>
                  </div>
                </details>
              ))}
              <h3>Contact Information</h3>
              <p>
                Questions about the Terms of Service should be sent to us at{" "}
                <a href="mailto:info@jusjumpin.com">info@jusjumpin.com</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                Follow these attraction-specific requirements in addition to
                the general safety guidelines and health restrictions above.
              </p>
              {categories
                .find((category) => category.id === item.id)
                ?.attractions.map((attraction) => (
                  <details
                    className={styles.disclosure}
                    key={attraction.name}
                  >
                    <summary>
                      <span>{attraction.name}</span>
                      <span className={styles.badgeRow}>
                        <span className={styles.badge}>
                          Age {attraction.age}
                        </span>
                      </span>
                    </summary>
                    <div className={styles.disclosureBody}>
                      <ol>
                        {attraction.rules.map((rule) => (
                          <li key={rule}>{rule}</li>
                        ))}
                      </ol>
                      <p>
                        Also subject to the General Safety Guidelines and
                        health restrictions listed above.
                      </p>
                    </div>
                  </details>
                ))}
            </>
          ),
      }))}
    >
      <div className={styles.cardGrid} aria-label="Included attraction groups">
        {categories.map((category) => (
          <a
            className={styles.categoryLink}
            href={`#${category.id}`}
            key={category.id}
          >
            <span>
              <span aria-hidden="true">{category.icon} </span>
              {category.title}
            </span>
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
    </PolicyLayout>
  );
}
