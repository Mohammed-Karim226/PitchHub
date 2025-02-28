import { formatedViews } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { QUERY_STARTUP_VIEWS } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const MatchedPosts = async ({ id }: { id: string }) => {
  // Fetch current views from the database
  const { views: currentViews } = await client
    .withConfig({ useCdn: false })
    .fetch(QUERY_STARTUP_VIEWS, { id });

  // Ensure atomic increment after response ends
  after(async () => {
    // Fetch the latest views again before incrementing
    const { views: latestViews } = await client
      .withConfig({ useCdn: false })
      .fetch(QUERY_STARTUP_VIEWS, { id });

    // Increment based on the latest value
    const safeLatestViews  = latestViews ?? 0;
    await writeClient
      .patch(id)
      .set({ views: safeLatestViews + 1 })
      .commit();
  });
  const safeCurrentViews = currentViews ?? 0;
  return (
    <div className="flex justify-center items-center">
      <div className="text-center flex justify-start items-center">
        <p className="text-base font-normal text-gray-500 mr-1">Views: </p>
        <h1 className="text-base font-extrabold text-blue-600 transition-all duration-700 ease-in-out animate-pulse">
          {formatedViews(safeCurrentViews)}
        </h1>
      </div>
    </div>
  );
};

export default MatchedPosts;
