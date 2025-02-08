"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IPost } from "@/components/PostPage/PostPage";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";

export function RecentPosts({ posts = [] }: { posts: IPost[] }) {
  const isEmpty = posts.length === 0;

  return (
    <Card className="w-full h-full shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <CardHeader className="bg-indigo-50 p-6">
        <CardTitle className="text-2xl font-bold text-indigo-600">
          Recent Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Author</TableHead>
              <TableHead className="font-semibold text-gray-700">Category</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
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
              posts.slice(0, 5).map((post) => (
                <TableRow
                  key={post._id}
                  className="hover:bg-gray-50 transition-colors"
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
                  <TableCell className="text-right text-gray-700">
                    {parseInt(post?.views).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteDialog pitchId={post._id} />
                  </TableCell>
                  <TableCell className="text-right">
                    <UpdateDialog pitchId={post._id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}