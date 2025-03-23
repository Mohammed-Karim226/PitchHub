"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { client } from "@/sanity/lib/client";
import { COMMENTS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { IComments } from "@/components/PostPage/PostPage";

interface ISheet {
  isOpen: boolean;
  setIsOpen: () => void;
  id: string;
}

const ShowDetailsSheet = ({ isOpen, setIsOpen, id }: ISheet) => {
  const [comments, setComments] = useState<IComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await client.fetch(COMMENTS_BY_ID_QUERY, { id });
        setComments(res || []);
        setError(null);
      } catch (err: unknown) {
        const error = err as { message: string };
        setError(error.message);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);

  const posLen = comments.filter(
    (comment) => comment?.type === "positive"
  ).length;
  const negLen = comments.filter(
    (comment) => comment?.type === "negative"
  ).length;
  const totalComments = comments.length;
  const positivePercentage = totalComments
    ? Math.round((posLen / totalComments) * 100)
    : 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            Post Details
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Insights and statistics for Post ID:{" "}
            <span className="font-medium">{id}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {loading ? (
            <div className="text-center text-gray-500 animate-pulse">
              Loading details...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Total Comments</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {totalComments}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Post ID</p>
                  <p className="text-lg font-semibold text-gray-800 truncate">
                    {id}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-green-600">Positive Comments</p>
                  <p className="text-lg font-semibold text-green-700">
                    {posLen}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-red-600">Negative Comments</p>
                  <p className="text-lg font-semibold text-red-700">{negLen}</p>
                </div>
              </div>

              {/* Sentiment Overview */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Sentiment Breakdown
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${positivePercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {positivePercentage}% Positive Sentiment
                </p>
              </div>

              {/* Additional Info */}
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={setIsOpen}
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShowDetailsSheet;
