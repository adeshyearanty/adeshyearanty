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
    <div className="min-h-screen">
      {/* Blog Header */}
      <section className="relative pt-40 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Writing
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Thoughts on systems design, backend architecture, and distributed
              systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="group p-6 lg:p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col gap-4">
                      {/* Top Row: Tag and Meta */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                            tagColors[article.tag] ||
                            "bg-gray-500/10 text-gray-400 border-gray-500/30"
                          }`}
                        >
                          {article.tag}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>

                      {/* Title and Summary */}
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 pt-2">
                        <span className="font-medium text-sm">Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl lg:text-2xl font-bold mb-6">Topics covered</h2>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(tagColors).map(([tag]) => (
                <span
                  key={tag}
                  className={`text-sm font-medium px-4 py-2 rounded-full border ${tagColors[tag]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-400 mb-6">More articles coming soon</p>
            <Link href="/#projects">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                Back to portfolio
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
