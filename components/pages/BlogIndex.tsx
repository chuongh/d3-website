import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";

export function BlogIndex({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.blog;
  const posts = getAllPosts(locale);
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.breadcrumb.home, path: "/" },
            { name: t.kicker, path: "/blog" },
          ],
          locale,
        )}
      />

      <div className="sub-hero">
        <div className="container">
          <div className="crumb"><Link href={p("/")}>{dict.breadcrumb.home}</Link> / <span>{t.kicker}</span></div>
          <h1>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </div>

      <section>
        <div className="container blog-grid">
          {posts.map((post, i) => (
            <Link className={`post${i === 0 ? " wide" : ""}`} key={post.meta.slug} href={p(`/blog/${post.meta.slug}`)}>
              <div className="post-cover"><span className="tag">{post.meta.tag}</span></div>
              <div className="post-body">
                <h3>{post.meta.title}</h3>
                <p>{post.meta.description}</p>
                <div className="post-meta">
                  <span>{post.meta.date}</span>
                  <span>·</span>
                  <span>{post.meta.minutes} {t.readTimeSuffix}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
