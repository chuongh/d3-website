import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/Bits";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getAllPosts, type Post } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export function BlogPost({ locale, post }: { locale: Locale; post: Post }) {
  const dict = getDictionary(locale);
  const t = dict.blog;
  const m = post.meta;
  const p = (path: string) => localePath(locale, path);

  // "Keep reading" — up to two other posts in the same locale (§10.5 internal linking).
  const related = getAllPosts(locale).filter((x) => x.meta.slug !== m.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(
            { title: m.title, description: m.description, date: m.date, author: m.author, path: `/blog/${m.slug}`, cover: m.cover },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: dict.breadcrumb.home, path: "/" },
              { name: t.breadcrumbBlog, path: "/blog" },
              { name: m.title, path: `/blog/${m.slug}` },
            ],
            locale,
          ),
        ]}
      />

      <div className="article-hero">
        <div className="container">
          <div className="crumb">
            <Link href={p("/")}>{dict.breadcrumb.home}</Link> / <Link href={p("/blog")}>{t.breadcrumbBlog}</Link> / <span>{m.tag}</span>
          </div>
          <h1>{m.title}</h1>
          <div className="post-meta">
            <span>{t.byAuthor} {m.author}</span>
            <span>·</span>
            <span>{m.date}</span>
            <span>·</span>
            <span>{m.minutes} {t.readTimeSuffix}</span>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          <article className="prose">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head" style={{ marginBottom: 36 }}><h2>{t.relatedHeading}</h2></div>
            <div className="blog-grid">
              {related.map((post) => (
                <Link className="post" key={post.meta.slug} href={p(`/blog/${post.meta.slug}`)}>
                  <div className="post-cover"><span className="tag">{post.meta.tag}</span></div>
                  <div className="post-body">
                    <h3>{post.meta.title}</h3>
                    <p>{post.meta.description}</p>
                    <div className="post-meta"><span>{post.meta.date}</span><span>·</span><span>{post.meta.minutes} {t.readTimeSuffix}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand locale={locale} dict={dict} heading={dict.pages.featureCta.h2} text={dict.pages.featureCta.p} />
        </div>
      </section>
    </>
  );
}
