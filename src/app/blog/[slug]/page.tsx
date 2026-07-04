import { Metadata } from "next";
import { ArticleContent } from "./components/ArticleContent";
import { getArticle, getAllArticles } from "@/lib/articles";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: `${article.title} — Adesh Yearanty`,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      authors: [article.author],
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen pt-40 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Article not found</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  return <ArticleContent article={article} />;
}
