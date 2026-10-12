import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./PolicyLayout.module.css";

export type PolicySection = {
  id: string;
  title: string;
  content: ReactNode;
};

const policyLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Safety Guidelines", href: "/safety-guidelines/" },
  { label: "Disclaimer", href: "/disclaimer/" },
];

type PolicyLayoutProps = {
  title: string;
  intro: string;
  sections: PolicySection[];
  children?: ReactNode;
};

export function PolicyLayout({ title, intro, sections, children }: PolicyLayoutProps) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Jus Jumpin · Helpful information</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </header>

      <div className={styles.content}>
        <nav className={styles.sectionNav} aria-label={`${title} sections`}>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>

        <div className={styles.document}>
          {children}
          {sections.map((section) => (
            <section className={styles.section} id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}

          <nav className={styles.related} aria-label="Other information pages">
            <h2>More information</h2>
            <div className={styles.relatedLinks}>
              {policyLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}

export { styles as policyStyles };
