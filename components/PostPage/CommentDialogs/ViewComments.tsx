"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { client } from "@/sanity/lib/client";
import { COMMENTS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";

const ViewComments = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await client.fetch(COMMENTS_BY_ID_QUERY, { id });
        setComments(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-sky-500/30 text-slate-500 rounded-full shadow-sm hover:bg-sky-500/40">
          View Comments
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription className="capitalize text-sm text-slate-500">
            Here you can view all the comments for this post.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-start items-start gap-2">
          {comments.map((comment: any) => (
            <div
              key={comment._id}
              className="p-4 border-b border-gray-200 w-full"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-700">
                  {comment.name}
                </h3>
                <span className="text-sm text-slate-500">{comment.type}</span>
              </div>
              <p className="mt-2 text-slate-600">{comment.comment}</p>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="bg-orange-500/30 text-slate-500 rounded-full shadow-sm hover:bg-orange-500/40">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ViewComments;
