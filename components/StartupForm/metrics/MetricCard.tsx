"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  border?: string;
  bg?: string;
  text?: string;
  value: string | number;
  Icon: LucideIcon;
}

export function MetricCard({
  title,
  value,
  Icon,
  border,
  bg,
  text,
}: MetricCardProps) {
  return (
    <Card className={`${border ?? "bg-indigo-600"} ${bg}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`${text} text-sm font-medium`}>{title}</CardTitle>
        <Icon className={`${text} h-4 w-4 text-muted-foreground`} />
      </CardHeader>
      <CardContent>
        <div className={`${text} text-2xl font-bold`}>{value}</div>
      </CardContent>
    </Card>
  );
}
