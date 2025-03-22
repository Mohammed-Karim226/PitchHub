"use client";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IPost } from "@/components/PostPage/PostPage";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ShowDetailsSheet from "./ShowDetailsSheet";

export function RecentPosts({ posts = [] }: { posts: IPost[] }) {
  const isEmpty = posts.length === 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setCurrentId("");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentId("");
    }
  };

  return (
    <Card className="w-full h-full shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <CardHeader className="bg-indigo-50 p-6 max-sm:p-4">
        <CardTitle className="text-2xl max-sm:text-lg font-bold text-indigo-600">
          Recent Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">
                Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Author
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Category
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">
                Views
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Delete
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Update
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-lg text-gray-500 font-medium"
                >
                  No posts found. Start creating some!
                </TableCell>
              </TableRow>
            ) : (
              currentPosts.map((post) => (
                <motion.tr
                  key={post._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50  transition-colors border-b border-gray-200 cursor-pointer"
                  onClick={() => {
                    setCurrentId(post?._id);
                    setIsOpen(true);
                  }}
                >
                  <TableCell className="font-medium text-gray-900">
                    {post.title}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {post?.author?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {post?.category || "Uncategorized"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {parseInt(post?.views ?? 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right ">
                    <DeleteDialog pitchId={post._id} />
                  </TableCell>
                  <TableCell className="text-right ">
                    <UpdateDialog pitchId={post._id} />
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="text-indigo-600 disabled:cursor-not-allowed font-semibold disabled:opacity-50"
        >
          <SquareArrowLeft size={24} />
        </button>
        <span className="text-base flex text-indigo-600 justify-center items-center">
          Page{" "}
          <p
            className="size-5 flex justify-center items-center
          bg-slate-100 px-1 py-0 text-[14px] mx-2 border border-slate-300 rounded-sm"
          >
            {currentPage}
          </p>{" "}
          of{" "}
          <p
            className="size-5 flex justify-center items-center
          bg-slate-100 px-1 py-0 text-[14px] mx-2 border border-slate-300 rounded-sm"
          >
            {totalPages}
          </p>
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="text-indigo-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SquareArrowRight size={24} />
        </button>
      </CardFooter>
      <ShowDetailsSheet
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(!isOpen)}
        id={currentId}
      />
    </Card>
  );
}
