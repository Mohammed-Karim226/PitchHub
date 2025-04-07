import PostPage from "@/components/PostPage/PostPage";
import { getPostViews } from "@/components/PostPage/View";
import { client } from "@/sanity/lib/client";
import {
  COMMENTS_BY_ID_QUERY,
  PLAYLIST_BY_SLUG_QUERY,
  QUERY_BY_ID,
  TOP_VIEW_POST_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const page = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const id = (await params).id;

  const [post] = await Promise.all([
    client.fetch(QUERY_BY_ID, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "eco-pass",
    }),
  ]);

  const comments = await client.fetch(COMMENTS_BY_ID_QUERY, { id });
  const trendy_post = await client.fetch(TOP_VIEW_POST_BY_ID_QUERY);

  const { views }  = await getPostViews({ id });

  if (!post) return notFound();

  return <PostPage post={{...post, views}} comments={comments} trendy_post={trendy_post} />;
};

export default page;
export const dynamic = 'force-dynamic';