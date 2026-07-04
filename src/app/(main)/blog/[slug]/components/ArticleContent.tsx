"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Article } from "@/lib/articles";
import { getAllArticles } from "@/lib/articles";
import * as DiagramComponents from "./SvgDiagrams";

interface ArticleContentProps {
  article: Article;
}

const tagColors: Record<string, string> = {
  Architecture: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Systems: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Backend: "bg-green-500/10 text-green-400 border-green-500/30",
};

function getDiagramComponent(componentName: string) {
  const Component = DiagramComponents[componentName as keyof typeof DiagramComponents];
  return Component ? <Component /> : null;
}

function renderContent(article: Article) {
  const lines = article.content.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) {
      continue;
    }

    // Handle code blocks
    if (line.trim().startsWith("```")) {
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={`code-${elements.length}`}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"
        >
          <code className="text-sm text-gray-300 font-mono">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
      continue;
    }

    // Handle headings
    if (line.trim().startsWith("##")) {
      const title = line.replace(/^##\s*/, "");
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="text-2xl font-bold mt-12 mb-6 text-white"
        >
          {title}
        </h2>
      );
      continue;
    }

    // Handle lists
    if (line.trim().startsWith("- ")) {
      const listItems = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].replace(/^-\s*/, ""));
        i++;
      }
      i--;
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="list-disc list-inside space-y-2 my-4 text-gray-300"
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Regular paragraphs
    if (line.trim()) {
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="text-gray-300 leading-relaxed my-4"
        >
          {line}
        </p>
      );
    }
  }

  // Insert diagrams at appropriate points
  const contentWithDiagrams: React.ReactNode[] = [];
  let diagramIndex = 0;

  for (let i = 0; i < elements.length; i++) {
    contentWithDiagrams.push(elements[i]);

    // Add diagrams after certain content sections
    if (diagramIndex < article.diagramComponents.length && i % 5 === 4) {
      const diagramComponent = getDiagramComponent(
        article.diagramComponents[diagramIndex]
      );
      if (diagramComponent) {
        contentWithDiagrams.push(
          <div
            key={`diagram-${diagramIndex}`}
            className="my-12 p-6 bg-gray-800/20 border border-gray-700/50 rounded-lg"
          >
            {diagramComponent}
          </div>
        );
        diagramIndex++;
      }
    }
  }

  // Add any remaining diagrams
  while (diagramIndex < article.diagramComponents.length) {
    const diagramComponent = getDiagramComponent(
      article.diagramComponents[diagramIndex]
    );
    if (diagramComponent) {
      contentWithDiagrams.push(
        <div
          key={`diagram-${diagramIndex}`}
          className="my-12 p-6 bg-gray-800/20 border border-gray-700/50 rounded-lg"
        >
          {diagramComponent}
        </div>
      );
    }
    diagramIndex++;
  }

  return contentWithDiagrams;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const allArticles = getAllArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="relative pt-40 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 w-fit">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to writing</span>
            </Link>
          </motion.div>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border inline-block mb-6 ${
                tagColors[article.tag] ||
                "bg-gray-500/10 text-gray-400 border-gray-500/30"
              }`}
            >
              {article.tag}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 border-t border-gray-800 pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <span>By {article.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto prose prose-invert max-w-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderContent(article)}
          </motion.div>
        </article>
      </section>

      {/* Divider */}
      <div className="relative my-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto border-t border-gray-800" />
      </div>

      {/* Related Articles */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">More from Adesh</h2>
          <div className="grid gap-6">
            {relatedArticles.map((relatedArticle, index) => (
              <motion.div
                key={relatedArticle.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/blog/${relatedArticle.slug}`}>
                  <div className="group p-6 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border inline-block mb-3 ${
                            tagColors[relatedArticle.tag] ||
                            "bg-gray-500/10 text-gray-400 border-gray-500/30"
                          }`}
                        >
                          {relatedArticle.tag}
                        </span>
                        <h3 className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {relatedArticle.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
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
