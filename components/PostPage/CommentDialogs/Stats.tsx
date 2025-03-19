"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { client } from "@/sanity/lib/client";
import {
  COMMENTS_BY_ID_QUERY,
  TOP_VIEW_POST_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import {
  Calendar,
  ChartBar,
  ChartLine,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IComment {
  _id: string;
  _createdAt: string;
  type: string;
  comment: string;
  name: string;
}
const Stats = ({
  id,
  createdAt,
  postView,
}: {
  id: string;
  createdAt: string;
  postView: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [topViews, setTopviews] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await client.fetch(COMMENTS_BY_ID_QUERY, { id });
        setComments(data || []);
      } catch (error) {
        throw new Error("Failed to fetch comments");
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchTopViews = async () => {
      try {
        const views_data = await client.fetch(TOP_VIEW_POST_BY_ID_QUERY);
        setTopviews(views_data?.views);
      } catch (error) {
        throw new Error("Failed to fetch top views");
      }
    };
    fetchTopViews();
  }, []);

  const poslen = comments.filter(
    (comment) => comment?.type === "positive"
  ).length;
  const negLen = comments.filter(
    (comment) => comment?.type === "negative"
  ).length;
  const dateOfCreation = new Date(createdAt).toDateString();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-500/30 text-slate-500 rounded-full shadow-sm hover:bg-indigo-500/40">
          <ChartBar width={18} height={18} /> View Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-start items-center gap-1">
            <ChartLine width={26} height={26} color="#4440B3" />
            <p className="text-base font-bold text-slate-500">Stats</p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-start items-center w-full">
            <div className="flex flex-col gap-4 w-full p-4 rounded-lg ">
            <div className="w-full flex justify-start items-center gap-2 text-indigo-600">
              <Calendar width={20} height={20} />
              <p className="text-sm font-medium">{dateOfCreation}</p>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex justify-between items-start bg-green-50 p-3 rounded-lg shadow-sm w-1/2">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-sm font-semibold text-green-600">Positive</h1>
                <p className="text-lg font-bold text-green-700">{poslen}</p>
              </div>
              <TrendingUp width={28} height={28} className="text-green-500" />
              </div>
              <div className="flex justify-between items-start bg-red-50 p-3 rounded-lg shadow-sm w-1/2">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-sm font-semibold text-red-600">Negative</h1>
                <p className="text-lg font-bold text-red-700">{negLen}</p>
              </div>
              <TrendingDown width={28} height={28} className="text-red-500" />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              {topViews > 0 && Number(postView) === topViews && (
              <div className="flex justify-start items-center gap-2 bg-yellow-50 p-2 rounded-lg shadow-sm">
                <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse shadow-lg"></div>
                <p className="text-sm font-medium text-yellow-600">
                This post is trending
                </p>
              </div>
              )}
            </div>
            </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            className="bg-indigo-500/30 text-slate-700 rounded-full shadow-sm hover:bg-indigo-500/40"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Stats;
