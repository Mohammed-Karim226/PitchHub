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
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { COMMENTS_BY_ID_QUERY } from "@/sanity/lib/queries";
import {
  CircleUserRound,
  Frown,
  LayoutList,
  PersonStanding,
  Smile,
} from "lucide-react";
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
          <SheetTitle className="flex justify-start items-center gap-1 text-slate-500">
            <LayoutList width={22} height={22} />
            Comments
          </SheetTitle>
          <SheetDescription className="capitalize text-sm text-slate-500">
            Here you can view all the comments for this post.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-start items-start gap-2 py-4 overflow-y-auto">
          {comments.map((comment: any) => (
            <div
              key={comment._id}
              className={cn(
                "p-4 border-b border-gray-200 w-full rounded-lg",

                comment.type === "positive"
                  ? "bg-green-500/10"
                  : "bg-orange-500/10"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-1">
                  <CircleUserRound width={24} height={24} color="#324897" />
                  <p className="text-sm text-slate-600 ">{comment.name}</p>
                </div>
                <span className="text-sm text-slate-500">
                  {comment.type === "positive" ? (
                    <Smile width={24} height={24} color="#2CA7A8" />
                  ) : (
                    <Frown width={24} height={24} color="#E09527" />
                  )}
                </span>
              </div>
              <p className="mt-2 text-base text-slate-700 whitespace-pre-wrap capitalize">
                {comment.comment}
              </p>
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
