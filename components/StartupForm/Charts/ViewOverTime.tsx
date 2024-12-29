"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { IPost } from "@/components/PostPage/PostPage";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ViewsOverTime({ posts }: { posts: IPost[] }) {
  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
  );

  const data = {
    labels: sortedPosts.map((post) =>
      new Date(post._createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Views",
        data: sortedPosts.map((post) => parseInt(post.views)),
        borderColor: "hsl(231, 60%, 46%)",
        backgroundColor: "hsl(231, 60%, 46%)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="p-6 w-full hover:bg-slate-50 duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-indigo-600">Views Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
