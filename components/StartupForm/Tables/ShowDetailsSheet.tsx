"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface ISheet {
  isOpen: boolean;
  setIsOpen: () => void;
  id: string;
}

const ShowDetailsSheet = ({ isOpen, setIsOpen, id }: ISheet) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Details</SheetTitle>
          <SheetDescription>
            Here you can view all the details for this startup.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
            <p>posyId: {id}</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShowDetailsSheet;
