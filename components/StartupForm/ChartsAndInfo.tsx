"use client";

import { IPost } from "../PostPage/PostPage";
import { TopAuthors } from "./Charts/TopAuthors";
import { ViewsOverTime } from "./Charts/ViewOverTime";
import { ViewsByCategory } from "./Charts/ViewsByCategory";
import { MetricsGrid } from "./metrics/MetricGrid";
import { RecentPosts } from "./Tables/RecentPosts";

const ChartsAndInfo = ({ posts }: { posts: IPost[] }) => {
  return (
    <section className=" space-y-6 p-4 w-full">
      <h1 className="text-3xl font-bold max-sm:text-xl tracking-tight text-indigo-600">
        Dashboard Overview
      </h1>
      <MetricsGrid posts={posts} />
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div
          className="flex w-full justify-center gap-4 items-center xl:flex-row xl:gap-6 
          lg:flex-col lg:gap-4 
          md:flex-col md:gap-3 
          sm:flex-col sm:gap-2 
          max-sm:flex-col max-sm:gap-2"
        >
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
