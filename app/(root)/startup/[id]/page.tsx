import PostPage from "@/components/PostPage/PostPage";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, QUERY_BY_ID } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string; slug: string }> }) => {
  const id = (await params).id;
  
 
  const [post,  editorPosts ] = await Promise.all([
    client.fetch(QUERY_BY_ID, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "eco-pass",
    }),
  ]);

  console.log(editorPosts);
  
  if (!post) return notFound();

  return <PostPage post={post} />;
};

export default page;
