"use client";
// import { IPost } from "@/types";
import { Eye, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Author, Startup } from "@/sanity/types";

export type IPost = Omit<Startup, "author"> & { author?: Author };
const StartUpCard = ({ post }: { post: IPost }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(post?._createdAt));

  return (
    <div className="flex flex-col p-6 gap-3 w-[320px] h-[470px] border border-slate-100 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Date and Views */}
      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex items-center gap-2 px-3 text-sm font-semibold py-1 bg-orange-200/70 text-slate-700 rounded-full">
          <Clock className="text-slate-700" width={20} height={20} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Eye width={20} height={20} color="#FF6B6B" />
          <p className="text-sm font-semibold">{post?.views}</p>
        </div>
      </div>

      {/* Title and Author */}
      <div className="flex w-full justify-between items-start">
        <div>
          <Link
            href={`/user/${post?.author?._id}`}
            className="text-gray-800 font-medium"
          >
            {post?.author?.name}
          </Link>
          <Link href={`/startup/${post?._id}`}>
            <h1 className="text-2xl font-semibold text-gray-900 leading-snug hover:text-black transition-colors duration-200">
              {post?.title}
            </h1>
          </Link>
        </div>
        <Link href={`/user/${post?.author?._id}`}>
          <Image
            src="https://placehold.co/45x45"
            alt="avatar"
            width={45}
            height={45}
            className="rounded-full border border-gray-300"
          />
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
        {post?.description}
      </p>

      {/* Image */}
      <div className="w-full h-[150px] rounded-lg overflow-hidden mb-3">
        <Image
          src={post?.image}
          alt="post"
          width={276}
          height={150}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Category and Button */}
      <div className="flex w-full justify-between items-center">
        <Link href={`/?query=${post?.category.toLowerCase()}`}>
          <p className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
            {post?.category}
          </p>
        </Link>
        <Button
          className="w-[92px] h-[39px] rounded-3xl bg-gray-800 hover:bg-gray-900 transition-colors duration-200"
          asChild
        >
          <Link href={`/startup/${post?._id}`}>
            <span className="text-sm text-white font-semibold">Details</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StartUpCard;
