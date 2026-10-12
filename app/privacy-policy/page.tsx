import type { Metadata } from "next";
import { PolicyLayout } from "../components/legal/PolicyLayout";
import styles from "../components/legal/PolicyLayout.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy | Jus Jumpin",
  "Learn how Jus Jumpin collects, uses, shares, and safeguards your information.",
  "/privacy-policy/",
);

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <>
        <p>We may collect the following types of information:</p>
        <h3>a) Personal Information</h3>
        <ul>
          <li>Name, phone number, email address</li>
          <li>Child&apos;s name and age (for bookings, safety, and party coordination)</li>
          <li>Billing and payment-related details</li>
        </ul>
        <h3>b) Non-Personal Information</h3>
        <ul>
          <li>Website usage data</li>
          <li>Device, browser, and IP address</li>
          <li>Cookies and analytics data</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>Your information may be used to:</p>
        <ul>
          <li>Process bookings, registrations, and payments</li>
          <li>Communicate booking confirmations, updates, or offers</li>
          <li>Ensure safety, age verification, and compliance with play rules</li>
          <li>Improve our services, website, and customer experience</li>
          <li>Comply with legal or regulatory obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "3. Children’s Privacy",
    content: (
      <>
        <p>
          Jus Jumpin primarily serves children; however, personal information is
          collected only from parents or legal guardians.
        </p>
        <p>
          We do not knowingly collect personal data directly from children
          without parental consent.
        </p>
      </>
    ),
  },
  {
    id: "sharing-information",
    title: "4. Sharing of Information",
    content: (
      <>
        <p>We do not sell, trade, or rent your personal information.</p>
        <p>Information may be shared only with:</p>
        <ul>
          <li>Authorized service providers (payment processors, booking tools)</li>
          <li>Legal authorities if required by law or safety obligations</li>
        </ul>
        <p>
          All third parties are required to maintain confidentiality and data
          security.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: (
      <>
        <p>
          We implement reasonable administrative, technical, and physical
          safeguards to protect your information against unauthorized access,
          loss, misuse, or disclosure.
        </p>
        <p>While we strive to protect your data, no system can guarantee 100% security.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies & Tracking Technologies",
    content: (
      <>
        <p>Our website may use cookies and similar technologies to:</p>
        <ul>
          <li>Improve website functionality</li>
          <li>Understand user behavior</li>
          <li>Enhance browsing experience</li>
        </ul>
        <p>You may choose to disable cookies through your browser settings.</p>
      </>
    ),
  },
  {
    id: "photography",
    title: "7. Photography & Media Usage",
    content: (
      <p>
        Photos or videos captured at Jus Jumpin premises may be used for
        promotional purposes unless explicitly declined by the parent or
        guardian at the time of visit or booking.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    content: (
      <>
        <p>You may:</p>
        <ul>
          <li>Request access to your personal information</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt out of promotional communications</li>
        </ul>
        <p>Requests can be made using the contact details below.</p>
      </>
    ),
  },
  {
    id: "policy-updates",
    title: "9. Policy Updates",
    content: (
      <>
        <p>Jus Jumpin may update this Privacy Policy at any time.</p>
        <p>
          Changes will be effective immediately upon posting on our website or
          premises.
        </p>
      </>
    ),
  },
  {
    id: "privacy-contact",
    title: "10. Contact Us",
    content: (
      <>
        <p>
          For any questions or concerns regarding this Privacy Policy, please
          contact:
        </p>
        <div className={styles.card}>
          <p>
            <strong>Jus Jumpin</strong>
          </p>
          <p>
            Email: <a href="mailto:info@jusjumpin.com">info@jusjumpin.com</a>
          </p>
          <p>
            Phone: <a href="tel:+919874206206">+91 9874206206</a>
          </p>
          <p>
            Website:{" "}
            <a href="https://www.jusjumpin.com/">https://www.jusjumpin.com/</a>
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      intro="Your privacy matters to us. Learn how we protect your information."
      sections={sections}
    >
      <div className={styles.callout}>
        <p>
          At Jus Jumpin, we value your trust and are committed to protecting
          your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our premises,
          website, or engage with our services.
        </p>
        <p>
          <strong>
            By accessing or using Jus Jumpin services, you agree to the terms
            of this Privacy Policy.
          </strong>
        </p>
      </div>
    </PolicyLayout>
  );
}
