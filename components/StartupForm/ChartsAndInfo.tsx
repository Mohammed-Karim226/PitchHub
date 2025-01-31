"use client";

import { IPost } from "../PostPage/PostPage";
import { TopAuthors } from "./Charts/TopAuthors";
import { ViewsOverTime } from "./Charts/ViewOverTime";
import { ViewsByCategory } from "./Charts/ViewsByCategory";
import { MetricsGrid } from "./metrics/MetricGrid";
import { RecentPosts } from "./Tables/RecentPosts";

const ChartsAndInfo = ({ posts }: { posts: IPost[] }) => {
  return (
    <section className=" space-y-6 w-full">
      <h1 className="text-3xl font-bold tracking-tight text-indigo-600">
        Dashboard Overview
      </h1>
      <MetricsGrid posts={posts} />
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div className="flex w-full justify-between gap-4 items-center max-sm:flex-col max-sm:gap-2">
          <ViewsByCategory posts={posts} />
          <ViewsOverTime posts={posts} />
        </div>
        <div className="flex w-full justify-center gap-2 items-center flex-col m">
          <TopAuthors posts={posts} />
          <RecentPosts posts={posts || []} />
        </div>
      </div>
    </section>
  );
};

export default ChartsAndInfo;
