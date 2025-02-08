import Link from "next/link";
import { IPost } from "../PostPage/PostPage";
import ChartsAndInfo from "./ChartsAndInfo";

const StartupFormHeader = ({ posts }: { posts: IPost [] }) => {
  return (
    <section className="flex flex-col gap-4 justify-start items-start p-6">
 <Link href={`/startup/create/post`}>
  <button className="flex max-sm:text-base justify-center items-center rounded-full px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 shadow-lg">
    Create Post
  </button>
</Link>
      <ChartsAndInfo posts={posts} />
    </section>
  );
};

export default StartupFormHeader;
