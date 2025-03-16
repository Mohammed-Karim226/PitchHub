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
import { ChartBar, ChartLine } from "lucide-react";
import { useState } from "react";

const Stats = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
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
          <DialogDescription className="text-base text-slate-400 font-normal">
            View the stats of the post here. Click close when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* stats here */}</div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} type="button" className="bg-indigo-500/30 text-slate-700 rounded-full shadow-sm hover:bg-indigo-500/40">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Stats;
