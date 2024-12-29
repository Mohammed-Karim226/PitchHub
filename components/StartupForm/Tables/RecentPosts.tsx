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

export function RecentPosts({ posts }: { posts: IPost[] }) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-indigo-600">Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.slice(0, 5).map((post) => (
              <TableRow key={post?._id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post?.author?.name}</TableCell>
                <TableCell>{post?.category}</TableCell>
                <TableCell className="text-right">
                  {parseInt(post?.views).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
