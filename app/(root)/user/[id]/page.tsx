import { auth } from "@/auth";
import UserDetails from "@/components/UserDetails/UserDetails";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  
  if (!user) return notFound();

  return <UserDetails user={user} />;
};

export default page;
