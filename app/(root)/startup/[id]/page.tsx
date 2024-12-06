import PostPage from "@/components/PostPage/PostPage";
import { client } from "@/sanity/lib/client";
import { QUERY_BY_ID } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(QUERY_BY_ID, { id });

  if (!post) return notFound();

  return <PostPage post={post} />;
};

export default page;
