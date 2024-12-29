"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { IPost } from "@/components/PostPage/PostPage";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { prepareAuthorData } from "@/lib/calculations";

ChartJS.register(ArcElement, Tooltip, Legend);

export function TopAuthors({ posts }: { posts: IPost[] }) {
  const authorData = prepareAuthorData(posts).slice(0, 5);

  const data = {
    labels: authorData.map((item) => item.name),
    datasets: [
      {
        data: authorData.map((item) => item.totalViews),
        backgroundColor: Array(authorData.length).fill("hsl(231, 60%, 46%)"),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <Card className="p-6 w-full hover:bg-slate-50 duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-indigo-600">Top Authors by Views</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Doughnut data={data} options={options} />
      </CardContent>
    </Card>
  );
}
