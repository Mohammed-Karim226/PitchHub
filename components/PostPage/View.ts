import { formatedViews } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { QUERY_STARTUP_VIEWS } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

export const getPostViews = async ({ id }: { id: string }) => {
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
    const safeLatestViews = latestViews ?? 0;
    await writeClient
      .patch(id)
      .set({ views: safeLatestViews + 1 })
      .commit();
  });
  const safeCurrentViews = currentViews ?? 0;
  return {
    views: formatedViews(safeCurrentViews),
  }
};