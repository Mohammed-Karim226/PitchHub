"use client";
import { IPost } from "@/types";
import { motion } from "framer-motion";
import StartUpCard from "./StartUpCard";

const RecommendedStartups = ({ query }: { query?: string }) => {
  const posts = [
    {
      _createdAt: "Yesterday",
      views: 55,
      author: { _id: 1, name: "mohammed" },
      _id: 1,
      description: "This is a description",
      image: "/logo.png",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: "Today",
      views: 100,
      author: { _id: 2, name: "mohammed" },
      _id: 2,
      description: "Exploring AI advancements",
      image: "/logo.png",
      category: "AI",
      title: "The Rise of Artificial Intelligence",
    },
    {
      _createdAt: "2 Days Ago",
      views: 75,
      author: { _id: 3, name: "mohammed" },
      _id: 3,
      description: "Understanding robotics in modern life",
      image: "/logo.png",
      category: "Technology",
      title: "Robots in Everyday Life",
    },
    {
      _createdAt: "Last Week",
      views: 200,
      author: { _id: 4, name: "mohammed" },
      _id: 4,
      description: "The future of human-robot interaction",
      image: "/logo.png",
      category: "Innovation",
      title: "Humans and Robots Together",
    },
    {
      _createdAt: "3 Days Ago",
      views: 120,
      author: { _id: 5, name: "mohammed" },
      _id: 5,
      description: "The role of AI in the tech industry",
      image: "/logo.png",
      category: "AI",
      title: "AI's Impact on Technology",
    },
  ];

  return (
    <section className="flex py-6 flex-col w-full justify-center items-center gap-2">
      <div className=" w-full p-4 flex justify-start items-start ">
        <motion.h1
          key={query}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          exit={{ opacity: 0 }}
          className="capitalize text-start w-full text-3xl font-semibold text-black"
        >
          {query ? `Search Results For ${query}` : "Recommended Startups"}
        </motion.h1>
      </div>
      {/* loop through cards */}
      <div className="flex justify-center items-center flex-wrap max-sm:flex-col gap-2">
        {posts?.length > 0 ? (
          posts?.map((post: IPost) => (
            <StartUpCard post={post} key={post._id} />
          ))
        ) : (
          <span>No Results Founded</span>
        )}
      </div>
    </section>
  );
};

export default RecommendedStartups;
