"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { IPost } from "@/components/PostPage/PostPage";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { prepareCategoryData } from "@/lib/calculations";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ViewsByCategory({ posts }: { posts: IPost[] }) {
  const categoryData = prepareCategoryData(posts);

  const data = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Views",
        data: categoryData.map((item) => item.views ?? 1),
        backgroundColor: "hsl(231, 60%, 46%)",
        borderColor: "hsl(231, 60%, 46%)",
        borderWidth: 1,
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
        <CardTitle className="text-indigo-600">Views by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
