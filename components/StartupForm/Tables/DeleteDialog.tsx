"use client";

import { useState, memo, useEffect } from "react";
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
import { deletePitch } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface DeleteDialogProps {
  pitchId: string;
}

const DeleteDialog = memo(({ pitchId }: DeleteDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deletePitch(pitchId);
      if (res.status !== "SUCCESS") {
        throw new Error(
          res.error || "Failed to update pitch. Unauthorized user."
        );
      }
      toast.toast({
        title: "Success",
        description: "Pitch deleted successfully!",
      });
      router.prefetch("/startup/create");
    } catch (error) {
      const err = error as unknown as { message: string; code: number };
      toast.toast({
        title: `${err.message}`,
        description: "Failed to delete the pitch. ",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-3xl z-50 text-slate-500 bg-fuchsia-500/40 hover:bg-fuchsia-500/70 px-2 h-6 text-[14px] py-1">
          Delete Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="amx-sm: gap-2">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

DeleteDialog.displayName = "DeleteDialog";

export default DeleteDialog;
