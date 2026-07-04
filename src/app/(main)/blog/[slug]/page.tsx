import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getArticle, getAllArticles } from "@/lib/articles";
import { Metadata } from "next";
import { ArticleContent } from "./components/ArticleContent";

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const article = getArticle(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen pt-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Article not found</h1>
          <Link href="/blog">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              Back to writing
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return <ArticleContent article={article} />;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const article = getArticle(params.slug);

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
