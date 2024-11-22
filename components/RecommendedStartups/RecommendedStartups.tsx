import StartUpCard, { IPost } from "./StartUpCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const RecommendedStartups = async ({ query }: { query?: string }) => {
  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  return (
    <section className="flex py-6 flex-col w-full justify-center items-center gap-2">
      <div className=" w-full p-4 flex justify-start items-start ">
        <h1 className="capitalize text-start w-full text-3xl font-semibold text-black">
          {query ? `Search Results For ${query}` : "Recommended Startups"}
        </h1>
      </div>
      {/* loop through cards */}
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
