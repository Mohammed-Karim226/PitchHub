import { IPost } from "@/components/PostPage/PostPage";

export function calculateMetrics(posts: IPost[]) {
  const totalViews = posts.reduce((sum, post) => sum + parseInt(post.views), 0);
  const totalPosts = posts.length;
  const avgViewsPerPost = Math.round(totalViews / totalPosts);
  const uniqueAuthors = new Set(posts.map((post) => post?.author?._id)).size;

  return {
    totalViews,
    totalPosts,
    avgViewsPerPost,
    uniqueAuthors,
  };
}

export function prepareCategoryData(posts: IPost[]) {
  return posts.reduce((acc: any[], post) => {
    const existingCategory = acc.find(
      (item) => item.category === post.category
    );
    if (existingCategory) {
      existingCategory.count += 1;
      existingCategory.views += parseInt(post.views);
    } else {
      acc.push({
        category: post.category,
        count: 1,
        views: parseInt(post.views),
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
          acc[_id].totalViews += parseInt(post.views, 10);
        }
      }
      return acc;
    },
    {}
  );

  return Object.values(authorStats).sort((a, b) => b.totalViews - a.totalViews);
}
