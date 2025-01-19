"use client";

import { useState } from "react";
import { Eye, Clock, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { Button } from "../ui/button";
import { Author, Startup } from "@/sanity/types";
import { formatedViews } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type IPost = Omit<Startup, "author"> & { author?: Author };

const StartUpCard = ({ post }: { post: IPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNavigate = (url: string) => {
    setIsLoading(true); 
    router.push(url);
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(post?._createdAt));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col p-6 gap-3 w-[320px] h-[470px]  border border-slate-100 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      {/* Date and Views */}
      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex items-center gap-2 px-3 text-sm font-semibold py-1 bg-orange-200/70 text-slate-700 rounded-full">
          <Clock className="text-slate-700" width={20} height={20} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Eye width={20} height={20} color="#FF6B6B" />
          <p className="text-sm font-semibold">
            {formatedViews(Number(post?.views))}
          </p>
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
            src={post?.author?.image || "https://placehold.co/45x45"}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full border border-gray-300 p-1"
          />
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm capitalize text-gray-600 mb-2 line-clamp-3">
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
        <Link
          href={`/?query=${post?.category.toLowerCase()}`}
          className="rounded-2xl border border-indigo-600 hover:border-slate-300"
        >
          <p className="text-sm font-medium text-indigo-600 hover:text-slate-100 hover:bg-indigo-600 capitalize rounded-xl transition-colors px-3 py-1 duration-200">
            {post?.category}
          </p>
        </Link>
        <Button
          className="rounded-3xl group px-3 py-1 bg-white border border-indigo-600 hover:bg-indigo-600/80 transition-colors duration-200 flex items-center justify-center"
          onClick={() => handleNavigate(`/startup/${post?._id}`)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin text-indigo-900" width={25} height={25}  />
          ) : (
            <span className="text-sm text-indigo-600 group-hover:text-white font-semibold">Details</span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default StartUpCard;
