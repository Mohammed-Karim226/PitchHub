"use client";

import { Eye, BookOpen, Users, BarChart2 } from "lucide-react";

import { IPost } from "@/components/PostPage/PostPage";
import { calculateMetrics } from "@/lib/calculations";
import { MetricCard } from "./MetricCard";

export function MetricsGrid({ posts }: { posts: IPost[] }) {
  const { totalViews, totalPosts, avgViewsPerPost, uniqueAuthors } =
    calculateMetrics(posts);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Views"
        value={totalViews.toLocaleString()}
        Icon={Eye}
        border="border-green-500"
        bg="bg-green-500/10"
        text="text-green-500"
      />
      <MetricCard
        title="Total Posts"
        value={totalPosts}
        Icon={BookOpen}
        border="border-blue-500"
        bg="bg-blue-500/10"
        text="text-blue-500"
      />
      <MetricCard
        title="Avg. Views per Post"
        value={avgViewsPerPost.toLocaleString()}
        Icon={BarChart2}
        border="border-yellow-500"
        bg="bg-yellow-500/10"
        text="text-yellow-500"
      />
      <MetricCard
        title="Unique Authors"
        value={uniqueAuthors}
        Icon={Users}
        border="border-purple-500"
        bg="bg-purple-500/10"
        text="text-purple-500"
      />
    </div>
  );
}
