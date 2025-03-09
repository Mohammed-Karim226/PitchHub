import Link from "next/link";
import { IPost } from "../PostPage/PostPage";
import ChartsAndInfo from "./ChartsAndInfo";

const StartupFormHeader = ({ posts }: { posts: IPost[] }) => {
  return <ChartsAndInfo posts={posts} />;
};

export default StartupFormHeader;
