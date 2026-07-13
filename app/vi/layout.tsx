/**
 * VI subtree layout. The single root <html> renders lang="en"; this corrects the
 * document language to Vietnamese for the /vi/* pages. All real locale SEO signals
 * (hreflang, canonical, per-locale title/description/OG, schema inLanguage) are set
 * per page, so this only fixes the html@lang attribute (§11.1, §11.2).
 */
export default function ViLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.lang='vi';",
        }}
      />
      {children}
    </>
  );
}
