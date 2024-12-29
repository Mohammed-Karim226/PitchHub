import { auth } from "@/auth";
import MainStartup from "@/components/StartupForm/MainStartup";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  const { data: posts } = await sanityFetch({
    query: ALL_POSTS_QUERY,
  });

  return <MainStartup posts={posts} />;
};

export default page;
