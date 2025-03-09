import { Suspense } from "react";

import { ArrowLeftCircle, Calendar1Icon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import View from "./View";
import markdownit from "markdown-it";

interface IAuthor {
  bio: string;
  _id: string;
  name: string;
  username: string;
  image: string;
}

export interface IPost {
  _createdAt: string;
  _id: string;
  author: IAuthor;
  views: string;
  description: string;
  category: string;
  image: string;
  pitch: string;
  title: string;
  length?: number;
}

const PostPage = ({ post }: { post: IPost }) => {
  const md = markdownit();

  const renderPitchContent = (pitch: string) => {
    const rawHTML = md.render(pitch);

    return rawHTML;
  };

  // Example Usage
  const pitchHTML = renderPitchContent(post.pitch);
  return (
    <section className="bg-gray-50 h-full relative py-12 px-6 md:px-12 lg:px-20">
      <div className="absolute top-6 left-10 max-sm:left-4 max-sm:pointer-events-auto">
        <Link href={"/"}>
          <ArrowLeftCircle width={40} height={40} className="max-sm:size-7" />
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center flex flex-col justify-center items-center  mb-8">
          <div className="flex justify-center  items-center bg-yellow-300 px-4 py-1 text-sm font-bold uppercase rounded-2xl">
            <Calendar1Icon
              width={20}
              height={20}
              className="mr-2 text-gray-800"
            />
            {new Date(post._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-4xl font-bold mt-4 text-gray-900">
            {post.title}
          </h1>
          <p className="text-lg capitalize text-gray-600 mt-2">
            An online platform offering modern solutions to{" "}
            <span className="text-indigo-600 font-semibold">
              {post.category.toLowerCase()} enthusiasts
            </span>
            .
          </p>
        </div>

        {/* Main Card Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 shadow-lg rounded-lg p-8">
          <div className="flex overflow-hidden justify-between items-center max-sm:flex-col">
            {/* Title and Description */}
            <div>
              <h2 className="text-3xl max-sm:text-center capitalize font-bold text-gray-800">
                Master Modern {post.category} <br />
                <span className="text-gradient text-indigo-600">
                  With a Project-Based Approach
                </span>
              </h2>
            </div>
            {/* Logo or Icon */}
            <div className="w-[130px] h-[130px] max-sm:mt-2 rounded-full overflow-hidden bg-white border border-slate-50 flex justify-center items-center">
              <Image
                src={post?.image}
                alt="Category"
                width={130}
                height={130}
                className="object-cover shadow-md hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Ratings Section */}
          <div className="mt-6 max-sm:flex-col max-sm:justify-start max-sm:items-start flex items-center gap-4 text-gray-600">
            <div className="max-sm:hidden">•</div>
            <div className="flex items-center gap-2">
              <User width={20} height={20} />
              <span>{post.author.name}</span>
            </div>
            <div className="max-sm:hidden">•</div>
            <div className="flex items-center gap-2">
              <Image
                src={"/categories.png"}
                alt="recommended"
                width={21}
                height={21}
              />
              <span className="capitalize pl-[2px] pr-3 border-l-2 rounded-sm text-slate-700 border-indigo-600 bg-indigo-600/20">
                {post?.category}
              </span>
            </div>
            <div className="max-sm:hidden">•</div>
            <div className="flex items-center gap-2">
              <Image
                src={"/view.png"}
                alt="recommended"
                width={21}
                height={21}
              />
              <Suspense fallback={<Skeleton />}>
                <View id={post?._id} />
              </Suspense>
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-8 flex items-center gap-4">
            <Image
              src={post?.author?.image || "https://placehold.co/45x45"}
              alt={post.author.name}
              width={50}
              height={50}
              className="rounded-full hover:scale-105 transition-transform"
            />
            <div>
              <Link href={`/user/${post?.author?._id}`}>
                <p className="font-bold text-gray-800 hover:text-indigo-600 transition-colors">
                  {post.author.name}
                </p>
              </Link>
              <p className="text-sm font-mono text-gray-600">
                @{post.author.username}
              </p>
            </div>
          </div>
        </div>

        {/* Pitch Details Section */}
        <div
          className={`mt-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-8 rounded-2xl shadow-2xl relative overflow-hidden`}
        >
          {/* Decorative Gradient Circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-30 -z-10"></div>

          {/* Section Title */}
          <div className="flex items-center gap-2 mb-6">
            <div className="p-3 bg-indigo-600 text-white rounded-full shadow-md">
              <button
                
                className="flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 tracking-wide">
              Pitch Details
            </h3>
          </div>

          {/* Content */}
          <div
            className="prose capitalize text-gray-800 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: pitchHTML }}
          ></div>

          {/* Bottom Border */}
          <div className="mt-6 w-full h-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
