export interface Article {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  diagramComponents: string[];
}

// Article content will be imported from files
import { kinesisArticleContent } from "./articles/kinesis";
import { rbacArticleContent } from "./articles/rbac";
import { redisArticleContent } from "./articles/redis";

export const articles: Record<string, Article> = {
  "kinesis-vs-sqs-messaging-pipeline": {
    slug: "kinesis-vs-sqs-messaging-pipeline",
    title: "Why I chose Kinesis over SQS for the messaging pipeline",
    description:
      "SQS is the default choice. Kinesis was the right one — but only because of one constraint: conversation ordering.",
    tag: "Architecture",
    date: "Jun 2025",
    readTime: "7 min",
    author: "Adesh Yearanty",
    content: kinesisArticleContent,
    diagramComponents: [
      "KinesisArchitectureOverview",
      "KinesisPhase1RawIngress",
      "KinesisPhase2Enrichment",
    ],
  },
  "rbac-system-that-doesnt-lie": {
    slug: "rbac-system-that-doesnt-lie",
    title: "Designing a RBAC system that doesn't lie to your users",
    description:
      "Scope-based permissions sound simple until you model a hierarchy and add sharing rules.",
    tag: "Systems",
    date: "May 2025",
    readTime: "5 min",
    author: "Adesh Yearanty",
    content: rbacArticleContent,
    diagramComponents: [
      "RBACPermissionVsVisibility",
      "RBACHierarchyResolution",
      "RBACRequestAuthPath",
    ],
  },
  "redis-version-based-caching": {
    slug: "redis-version-based-caching",
    title: "Redis version-based caching: a simpler way to invalidate",
    description: "TTL-based expiry is unpredictable and cache-busting is ugly.",
    tag: "Backend",
    date: "Apr 2025",
    readTime: "6 min",
    author: "Adesh Yearanty",
    content: redisArticleContent,
    diagramComponents: [
      "RedisStandardInvalidation",
      "RedisVersionBasedComparison",
      "RedisVersionLifecycle",
    ],
  },
};

export function getArticle(slug: string): Article | null {
  return articles[slug] || null;
}

export function getAllArticles(): Article[] {
  return Object.values(articles).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}
