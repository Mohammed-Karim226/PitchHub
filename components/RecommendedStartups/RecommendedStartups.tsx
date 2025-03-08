import StartUpCard, { IPost } from "./StartUpCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { DotIcon } from "lucide-react";

const RecommendedStartups = async ({
  query,
  params,
}: {
  query?: string;
  params: { search: string | null };
}) => {
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <section className="flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-6 flex-col w-full justify-center items-center gap-2">
      <div className=" w-full p-4 flex justify-start items-center ">
        <DotIcon width={40} height={40} />
        <h1 className="capitalize text-start w-full max-sm:text-xl text-3xl font-semibold text-indigo-600">
          {query ? `Search Results For ${query}` : "Recommended Startups"}
        </h1>
      </div>
      <div className="flex justify-center items-center flex-wrap max-sm:flex-col gap-2">
        {posts?.length > 0 ? (
          posts?.map((post: IPost) => (
            <StartUpCard post={post} key={post._id} />
          ))
        ) : (
          <span>No Results Founded</span>
        )}
      </div>
      <SanityLive />
    </section>
  );
};

export default RecommendedStartups;
