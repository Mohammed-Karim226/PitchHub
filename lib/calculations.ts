import { IPost } from "@/components/PostPage/PostPage";
interface ICategoryItem {
  category: string;
  count: number;
  views: number;
  posts?: IPost[];
}
export function calculateMetrics(posts: IPost[]) {
  if (!Array.isArray(posts)) {
    return {
      totalViews: 1,
      totalPosts: 1,
      avgViewsPerPost: 1,
      uniqueAuthors: 1,
    };
  }
  const totalViews = posts.reduce((sum, post) => {
    const views = parseInt(post.views, 10); // Convert to integer
    return sum + (isNaN(views) ? 1 : views); // Add 0 if views is NaN
  }, 0);
  const totalPosts = posts.length;
  const avgViewsPerPost =
    totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
  const uniqueAuthors = new Set(posts.map((post) => post?.author?._id)).size;

  return {
    totalViews,
    totalPosts,
    avgViewsPerPost,
    uniqueAuthors,
  };
}

export function prepareCategoryData(posts: IPost[]) {
  return posts.reduce((acc: ICategoryItem[], post) => {
    const existingCategory = acc.find(
      (item) => item.category === post.category
    );

    // Parse views, defaulting to 0 if invalid or missing
    const views = parseInt(post.views, 10);
    const safeViews = isNaN(views) ? 0 : views;

    if (existingCategory) {
      existingCategory.count += 1;
      existingCategory.views += safeViews;
    } else {
      acc.push({
        category: post.category,
        count: 1,
        views: safeViews,
      });
    }
    return acc;
  }, []);
}

export function prepareAuthorData(posts: IPost[]) {
  const authorStats = posts.reduce(
    (acc: { [key: string]: { name: string; totalViews: number } }, post) => {
      // Ensure author exists before destructuring
      if (post?.author) {
        const { _id, name } = post.author;

        if (_id) {
          // Ensure _id exists
          if (!acc[_id]) {
            acc[_id] = { name, totalViews: 0 };
          }

          // Parse views, defaulting to 0 if invalid or missing
          const views = parseInt(post.views, 10);
          const safeViews = isNaN(views) ? 0 : views;

          acc[_id].totalViews += safeViews;
        }
      }
      return acc;
    },
    {}
  );

  return Object.values(authorStats).sort((a, b) => b.totalViews - a.totalViews);
}
