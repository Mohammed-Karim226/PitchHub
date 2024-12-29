import { IPost } from "../PostPage/PostPage";
import ChartsAndInfo from "./ChartsAndInfo";
import FormDialog from "./FormDialog";

const StartupFormHeader = ({ posts }: { posts: IPost }) => {
  return (
    <section className="flex flex-col gap-4 justify-start items-start p-6">
      <FormDialog />
      <ChartsAndInfo posts={posts} />
    </section>
  );
};

export default StartupFormHeader;
