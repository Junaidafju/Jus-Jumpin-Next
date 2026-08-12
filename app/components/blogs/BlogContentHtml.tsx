interface BlogContentHtmlProps {
  html: string;
}

export function BlogContentHtml({ html }: BlogContentHtmlProps) {
  // Clean raw HTML by stripping block styles, scripts, inline styles, custom classes, and IDs.
  // This extracts the clean semantic text structure so our theme can style it dynamically.
  const cleanedHtml = html
    ? html
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
      .replace(/\s+style\s*=\s*(['"])(.*?)\1/gi, "")
      .replace(/\s+class\s*=\s*(['"])(.*?)\1/gi, "")
      .replace(/\s+id\s*=\s*(['"])(.*?)\1/gi, "")
    : "";
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .wp-content-styles {
              color: #cbd5e1; /* text-slate-300 */
              font-size: 1.05rem;
              line-height: 1.85;
            }
            .wp-content-styles p {
              margin-bottom: 1.75rem;
            }
            .wp-content-styles p:last-child {
              margin-bottom: 0;
            }
            .wp-content-styles h2 {
              font-size: 1.85rem;
              font-weight: 800;
              color: #ffffff;
              margin-top: 2.75rem;
              margin-bottom: 1.25rem;
              border-left: 4px solid #6dc065; /* neon green */
              padding-left: 1rem;
              line-height: 1.35;
              letter-spacing: -0.02em;
            }
            .wp-content-styles h3 {
              font-size: 1.45rem;
              font-weight: 700;
              color: #ffffff;
              margin-top: 2.25rem;
              margin-bottom: 1rem;
              line-height: 1.4;
              letter-spacing: -0.01em;
            }
            .wp-content-styles blockquote {
              border-left: 4px solid #6dc065; /* neon green */
              background-color: rgba(18, 18, 37, 0.45); /* brand dark tint */
              font-style: italic;
              padding: 1.5rem 2rem;
              margin: 2.25rem 0;
              border-radius: 1.25rem;
              color: #f8fafc; /* slate-50 */
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
              border-right: 1px solid rgba(255, 255, 255, 0.03);
              border-top: 1px solid rgba(255, 255, 255, 0.03);
              border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            }
            .wp-content-styles blockquote p {
              margin-bottom: 0;
              line-height: 1.75;
            }
            .wp-content-styles ul, .wp-content-styles ol {
              margin-bottom: 1.75rem;
              padding-left: 1.75rem;
            }
            .wp-content-styles ul {
              list-style-type: disc;
            }
            .wp-content-styles ol {
              list-style-type: decimal;
            }
            .wp-content-styles li {
              margin-bottom: 0.75rem;
              padding-left: 0.25rem;
            }
            .wp-content-styles strong {
              color: #ffffff;
              font-weight: 800;
            }
            .wp-content-styles a {
              color: #b2d235; /* lime green */
              text-decoration: underline;
              text-underline-offset: 4px;
              transition: all 0.3s ease;
              font-weight: 700;
            }
            .wp-content-styles a:hover {
              color: #6dc065; /* neon green */
            }
            .wp-content-styles figure {
              margin: 2.5rem 0;
            }
            .wp-content-styles figcaption {
              font-size: 0.875rem;
              color: #94a3b8;
              text-align: center;
              margin-top: 0.85rem;
              font-style: italic;
            }
            .wp-content-styles img {
              max-width: 100%;
              height: auto;
              border-radius: 1.5rem;
              border: 1px solid rgba(255, 255, 255, 0.05);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            }
          `,
        }}
      />
      <div
        className="wp-content-styles"
        dangerouslySetInnerHTML={{ __html: cleanedHtml }}
      />
    </>
  );
}
