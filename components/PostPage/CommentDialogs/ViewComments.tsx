"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const ViewComments = ({id}: {id: string}) => {
  return (
    <Sheet>
    <SheetTrigger asChild>
    <Button className="bg-sky-500/30 text-slate-500 rounded-full shadow-sm hover:bg-sky-500/40">View Comments</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Comments</SheetTitle>
        <SheetDescription className="capitalize text-sm text-slate-500">
          Here you can view all the comments for this post.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col justify-start items-start gap-2">
        {/* content here */}
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button className="bg-orange-500/30 text-slate-500 rounded-full shadow-sm hover:bg-orange-500/40">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
  )
}

export default ViewComments