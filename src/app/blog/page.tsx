"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  date: string;
  readTime: string;
}

const articles: Article[] = [
  {
    slug: "kinesis-vs-sqs-messaging-pipeline",
    title: "Why I chose Kinesis over SQS for the messaging pipeline",
    summary:
      "SQS is the default choice. Kinesis was the right one — but only because of one constraint: conversation ordering.",
    tag: "Architecture",
    date: "Jun 2025",
    readTime: "7 min",
  },
  {
    slug: "rbac-system-that-doesnt-lie",
    title: "Designing a RBAC system that doesn't lie to your users",
    summary:
      "Scope-based permissions sound simple until you model a hierarchy and add sharing rules.",
    tag: "Systems",
    date: "May 2025",
    readTime: "5 min",
  },
  {
    slug: "redis-version-based-caching",
    title: "Redis version-based caching: a simpler way to invalidate",
    summary:
      "TTL-based expiry is unpredictable and cache-busting is ugly.",
    tag: "Backend",
    date: "Apr 2025",
    readTime: "6 min",
  },
];

const tagColors: Record<string, string> = {
  Architecture: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Systems: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Backend: "bg-green-500/10 text-green-400 border-green-500/30",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Writing
          </h1>
          <p className="text-xl text-gray-300">
            Thoughts on systems design, architecture, and backend engineering.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="group p-8 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        tagColors[article.tag] ||
                        "bg-gray-500/10 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {article.tag}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <h2 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {article.title}
                  </h2>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center"
        >
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Back to portfolio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
