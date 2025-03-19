"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { MessageCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { AddCommentAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";

const formSchema = z.object({
  type: z.string(),
  comment: z.string().min(1, "Comment must be at least 10 character long."),
});

interface ICommentTypes {
  value: string;
  label: string;
}
const AddComment = ({id}: {id: string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const r = useRouter();

  const commentType: ICommentTypes[] = [
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative"},
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      comment: "",
    },
  });

  const ButtonType = form.watch("type");

  const typeSelected = (type: string) =>{
    form.setValue("type", type);
  }
 async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
    try {
      if(!values?.type){
        setIsOpen(false);
        setIsSubmitted(false);
        throw new Error("Please select a comment type.");
      }
     const result = await AddCommentAction({postId: id, type: values?.type, comment: values?.comment});
      
      if(result.status !== "SUCCESS"){
        setIsOpen(false);
        throw new Error("Failed to comment. Unauthorized user.");
      }
      setIsSubmitted(false);
      setIsOpen(false);
      form.reset();
      toast({title: "Success", description: "Comment added successfully.", color: "green"});
      r.refresh();
    } catch (error: unknown) {
      const err = error as { message: string, code: string | number };
      toast({title: "Error", description: err.message, color: "danger"});
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500/30 text-slate-500 rounded-full shadow-sm hover:bg-green-500/40">
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-start items-center gap-1">
            <MessageCircle width={26} height={26} color="#4440B3" />
            <p className="text-base font-bold text-slate-500">Add Comment</p>
          </DialogTitle>
          <DialogDescription className="text-base text-slate-400 font-normal">
            Make comments here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between items-center gap-2 max-sm:flex-col">
                {commentType.map((type) => (
                  <button
                  type="button"
                  key={type.value}
                  onClick={() => typeSelected(type.value)}
                  className={`px-6 w-full py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200 ease-in-out ${ButtonType === type.value && 'border-indigo-500 bg-indigo-500/40 text-indigo-500'}`}
                >
                  {type.label}
                </button>
                ))}
              </div>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add Comment..." {...field} className="whitespace-pre-wrap"/>
                    </FormControl>
                    <FormDescription>
                      This is your comment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-indigo-500/30 w-full text-slate-700 rounded-full shadow-sm hover:bg-indigo-500/40"
                disabled={isSubmitted}
              >
               { isSubmitted ? "Adding Comment..." : "Add Comment"}
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter>
          {/* <Button type="submit" className="bg-indigo-500/30 text-slate-700 rounded-full shadow-sm hover:bg-indigo-500/40">Save</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
