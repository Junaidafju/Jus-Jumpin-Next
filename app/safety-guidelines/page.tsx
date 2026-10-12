import type { Metadata } from "next";
import { PolicyLayout } from "../components/legal/PolicyLayout";
import styles from "../components/legal/PolicyLayout.module.css";

export const metadata: Metadata = {
  title: "Safety Guidelines | Jus Jumpin",
  description:
    "Prepare for a safe visit with Jus Jumpin's play, supervision, health, and hygiene guidance.",
};

const essentials = [
  {
    icon: "🧦",
    title: "Anti-skid socks on",
    text: "Required for everyone in the play area. Bring your own or buy a pair at the counter.",
  },
  {
    icon: "👀",
    title: "Parents stay watchful",
    text: "Our team supervises the park, but direct supervision of your child is always yours.",
  },
  {
    icon: "🎒",
    title: "Valuables stay out",
    text: "No sharp, fragile or valuable items in the play area. Leave them at the counter.",
  },
  {
    icon: "📣",
    title: "Listen to the team",
    text: "Follow staff and marshal instructions at all times, on every attraction.",
  },
];

const supervision = [
  ["Toddlers", "Toddler Play Area only, with an adult present throughout. Adult supervision is mandatory."],
  ["Under 3", "Must be supervised in the Sand Pit."],
  ["Under 6", "Must be supervised on the Infinity Trampoline and in the Basketball Area."],
  ["3 and over", "Can use the Infinity Trampoline and Wave Slide (under-6s supervised on the trampoline)."],
  ["6 and over", "Can use the Sky Stepper, Donut Slide and 360° Cycling."],
];

const beforeYouJump = [
  "Wear anti-skid socks. Bare feet and regular socks are not allowed in the play area.",
  "Wear long sleeves and long trousers to prevent abrasions.",
  "Avoid loose clothing such as long dresses and drawstrings, and skip heavy accessories.",
  "Remove watches, jewellery, hair clips with sharp edges, and anything that could scratch or catch.",
  "Empty pockets. Phones, keys and wallets stay with a member of your party or at the counter.",
  "Check the age, height and weight limits on the attraction before your child joins the queue.",
];

const doItems = [
  "Take turns and keep a safe distance from the person ahead.",
  "Land on both feet with knees slightly bent on the trampolines.",
  "Hold ropes, handles and handrails wherever they are provided.",
  "Wait for the marshal's signal where an attraction needs one.",
  "Exit the landing area right after your turn.",
  "Tell a team member if anything looks damaged or unsafe.",
];

const dontItems = [
  "Run, push, pull or play rough with other guests.",
  "Attempt flips or tricks beyond your skill level.",
  "Climb on equipment in ways it was not designed for.",
  "Stop midway on a slide, bridge or course.",
  "Put more than one person on a single trampoline, swing or seat.",
  "Bring outside food or drink into the play zone.",
];

const healthRestrictions = [
  "Pregnant guests",
  "Anyone with a fear of heights",
  "Intoxicated guests",
  "Hypertension or heart disease",
  "Respiratory conditions",
  "Limb injuries",
];

const parentGuidance = [
  {
    title: "Supervise your child",
    text: "Staff keep watch over the park, but you remain responsible for your child's behaviour and wellbeing. Please stay within sight of them while they play.",
  },
  {
    title: "Know your child's limits",
    text: "Choose attractions that suit their age and ability. If your child is nervous, let them watch first. Never push a child to try something they are unsure about.",
  },
  {
    title: "Share what we should know",
    text: "Tell a team member about any medical condition, allergy or recent injury that could affect how your child plays.",
  },
  {
    title: "Keep a plan for the group",
    text: "If you are attending a party, agree on a meeting point and make sure every adult knows which children they are responsible for.",
  },
];

const hygiene = [
  "Play equipment is regularly sanitized and maintained by our team.",
  "Please do not come to the park if your child is unwell or has an infectious illness.",
  "Wash or sanitize hands before eating and after using the washroom.",
  "No outside food or drink in the play zone. Food and beverages are available on site.",
  "Keep sand, foam cubes and toys inside their designated areas.",
];

const emergencyGuidance = [
  {
    title: "Someone is hurt",
    text: "Stop play and tell the nearest team member or marshal straight away, even if the injury looks small. Please do not move a child who may have hurt their neck, back or head.",
  },
  {
    title: "A child is missing",
    text: "Tell any team member immediately. Stay calm and give them your child's name, age and what they are wearing.",
  },
  {
    title: "Equipment looks damaged",
    text: "Move away from it and report it to staff. Do not try to fix or use it.",
  },
  {
    title: "You see unsafe behaviour",
    text: "Let a marshal know. We would rather hear about it early than after someone is hurt.",
  },
];

const sections = [
  { id: "the-basics", title: "The basics" },
  { id: "supervision-by-age", title: "Supervision by age" },
  { id: "before-you-jump", title: "Before you jump" },
  { id: "play-floor", title: "On the play floor" },
  { id: "health-and-fitness", title: "Health" },
  { id: "parents-and-guardians", title: "For parents" },
  { id: "hygiene", title: "Hygiene" },
  { id: "emergency", title: "If something happens" },
];

export default function SafetyGuidelinesPage() {
  return (
    <PolicyLayout
      title="Safety Guidelines"
      intro="Great play starts with safe play. Here is how we keep every jump, slide and climb fun for children and calm for parents — and what we ask of you in return."
      sections={sections.map((section) => ({
        ...section,
        content: (() => {
          switch (section.id) {
            case "the-basics":
              return (
                <>
                  <p>Four things every guest needs to know before stepping onto the floor.</p>
                  <div className={styles.cardGrid}>
                    {essentials.map((item) => (
                      <article className={styles.card} key={item.title}>
                        <p aria-hidden="true">{item.icon}</p>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                </>
              );
            case "supervision-by-age":
              return (
                <>
                  <p>
                    Age limits are set per attraction. This is a quick guide to
                    the most important ones. The full list is on our{" "}
                    <a href="/terms-and-conditions/#general-safety">
                      Rules &amp; Regulations
                    </a>{" "}
                    page.
                  </p>
                  <dl className={styles.ageRows}>
                    {supervision.map(([who, rule]) => (
                      <div className={styles.ageRow} key={who}>
                        <dt>{who}</dt>
                        <dd>{rule}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              );
            case "before-you-jump":
              return (
                <>
                  <p>A minute of preparation at the counter prevents most scrapes and slips.</p>
                  <ul className={styles.checkList}>
                    {beforeYouJump.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </>
              );
            case "play-floor":
              return (
                <>
                  <p>Simple habits that keep everyone safe, whatever the attraction.</p>
                  <div className={styles.splitGrid}>
                    <article className={styles.card}>
                      <h3>Do</h3>
                      <ul className={styles.checkList}>
                        {doItems.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    </article>
                    <article className={styles.card}>
                      <h3>Don’t</h3>
                      <ul>
                        {dontItems.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    </article>
                  </div>
                </>
              );
            case "health-and-fitness":
              return (
                <>
                  <p>Our attractions are physical. They are not suitable for:</p>
                  <ul>
                    {healthRestrictions.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <div className={styles.callout}>
                    <strong>Extra limits on some attractions</strong>
                    <p>
                      The Infinity Trampoline also excludes guests with epilepsy
                      or recent surgeries, and the Sky Stepper excludes guests
                      with balance disorders. If you are unsure whether an
                      attraction is right for you or your child, please ask a
                      member of our team before playing.
                    </p>
                  </div>
                </>
              );
            case "parents-and-guardians":
              return (
                <>
                  <p>We look after the equipment and the floor. You know your child best.</p>
                  <div className={styles.cardGrid}>
                    {parentGuidance.map((item) => (
                      <article className={styles.card} key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                </>
              );
            case "hygiene":
              return (
                <ul className={styles.checkList}>
                  {hygiene.map((line) => <li key={line}>{line}</li>)}
                </ul>
              );
            case "emergency":
              return (
                <>
                  <p>
                    Tell the nearest team member or marshal first. They are
                    trained to help and know what to do next.
                  </p>
                  <div className={styles.cardGrid}>
                    {emergencyGuidance.map((item) => (
                      <article className={styles.card} key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                  <h3>Questions about safety?</h3>
                  <p>
                    Ask any team member on the floor, or get in touch before
                    your visit:{" "}
                    <a href="tel:+919874206206">+91 9874206206</a> or{" "}
                    <a href="mailto:info@jusjumpin.com">info@jusjumpin.com</a>.
                  </p>
                  <p>
                    These guidelines work alongside our{" "}
                    <a href="/terms-and-conditions/">Rules &amp; Regulations</a>{" "}
                    and Terms &amp; Conditions. Jus Jumpin may update them at
                    any time, with changes effective immediately upon posting.
                  </p>
                </>
              );
          }
        })(),
      }))}
    />
  );
}
