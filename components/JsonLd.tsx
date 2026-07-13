/**
 * Renders a JSON-LD <script>. Server component — emitted in the initial HTML so
 * Google's Rich Results Test sees it without executing JS (§3, §10.7).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Data is built from trusted constants/dictionaries, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
