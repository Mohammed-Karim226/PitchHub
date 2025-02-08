"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updatePitch } from "@/lib/actions";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { client } from "@/sanity/lib/client";
import { QUERY_BY_ID } from "@/sanity/lib/queries";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(100).trim(),
  description: z.string().min(10).max(500).trim(),
  category: z.string().regex(/^[A-Za-z\s]+$/).min(3),
  image: z.string().url(),
  pitch: z.string().min(20).max(1000).trim(),
});

const UpdateDialog = ({ pitchId }: {pitchId: string}) => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [pitch, setPitch] = useState("");
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const router  = useRouter();

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const fetchedData = await client.fetch(QUERY_BY_ID, { id: pitchId });
        setData(fetchedData);
        form.reset(fetchedData);
        setPitch(fetchedData.pitch);
      };
      fetchData();
    }
  }, [pitchId, open]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      pitch: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await updatePitch(pitchId, formData);
      toast.toast({ title: "Success", description: "Pitch updated successfully!" });
      setIsPending(false);
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.toast({ title: "Error", description: "Failed to update pitch.", variant: "destructive" });
      setIsPending(false);
    }
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="rounded-3xl bg-green-500/90 hover:bg-green-500 px-2 py-1">Update Post</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Post</SheetTitle>
          <SheetDescription>Make changes to your post and save.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {(["title", "category", "image"] as Array<keyof typeof formSchema.shape>).map((field) => (
              <FormField key={field} control={form.control} name={field} render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field}</FormLabel>
                  <FormControl>
                    <Input placeholder={field} {...fieldProps} className="w-full rounded-full placeholder:uppercase" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            ))}
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} className="w-full rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="container" data-color-mode="light">
            <MDEditor value={pitch} onChange={(value) => {
              setPitch(value || "");
              form.setValue("pitch", value || "");
            }}   preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder: "Describe your idea...",
            }}
            previewOptions={{ disallowedElements: ["style"] }} />
            </div>
            <Button type="submit" disabled={isPending} className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {isPending ? "Loading ..." : "Submit Your Pitch"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateDialog;
