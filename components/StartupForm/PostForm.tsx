"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lightbulb, Presentation, Rocket, Type, Image } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";


import { createPitch } from "@/lib/actions";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must not exceed 100 characters." })
    .trim(),
  description: z
    .string().optional(),
  category: z
    .string()
    .regex(/^[A-Za-z\s]+$/, { message: "Category must only contain letters." })
    .min(3, { message: "Category must be at least 3 characters." }),
  image: z
    .string()
    .url({ message: "Please provide a valid URL for the image." })
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("Content-Type");

        return !!contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  pitch: z.string().optional(),
});

const PostForm = () => {
  const [pitch, setPitch] = useState("");
  const [isPending, setIsPending] = useState(false);

  const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
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
      formData.append("title", values.title);
      if(values.description) {
        formData.append("description", values.description);
      }
      formData.append("category", values.category);
      formData.append("image", values.image);
      if(values.pitch) {
        formData.append("pitch", values.pitch);
      }

      await formSchema.parseAsync(Object.fromEntries(formData));
      const result = await createPitch(formData, pitch);

      setIsPending(false);
      toast.toast({
        title: "Success",
        description: "Your startup pitch has been submitted successfully!",
      });
      form.reset();
      setPitch("");
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "There was an issue submitting your startup pitch.",
        variant: "destructive",
      });
    }
  };

  return (
<section className="flex justify-between items-center w-full">

            
              
          <div className="flex w-1/2 z-10 max-sm:w-full max-w-4xl px-12 max-sm:px-7 py-8 bg-white justify-center items-center flex-col  rounded-t-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                {[
                  {
                    name: "title" as const,
                    placeholder: "Title",
                    icon: <Type />,
                  },
                  {
                    name: "category" as const,
                    placeholder: "Category",
                    icon: <Lightbulb />,
                  },
                  {
                    name: "image" as const,
                    placeholder: "Image",
                    icon: <Image width={24} height={24} />,
                  },
                ].map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-slate-500">{field.placeholder}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            {field.icon && (
                              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {field.icon}
                              </span>
                            )}
                            <Input
                              placeholder={field.placeholder}
                              {...fieldProps}
                              className="w-full placeholder:text-slate-400 h-[55px] rounded-full pl-12 focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-slate-500">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short description of your startup (or leave blank to auto-generate a compelling one!)"
                          {...field}
                          className="w-full placeholder:text-slate-400 h-[120px] rounded-2xl focus:ring-2 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="container gap-2 w-full flex flex-col justify-start items-start" data-color-mode="light">
                  <p className="text-base font-medium text-slate-500">Details</p>
                    <MDEditor
                      value={pitch}
                      onChange={(value) => {
                        setPitch(value || "");
                        form.setValue("pitch", value || "");
                      }}
                      preview="edit"
                      height={300}
                      style={{ borderRadius: 20, overflow: "hidden", width: "100%" }}
                      textareaProps={{
                        placeholder: "Write your startup pitch here (or leave blank to auto-generate a detailed, professional pitch!)",
                      }}
                      previewOptions={{ disallowedElements: ["style"] }}
                    />
                
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-[55px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white uppercase shadow-md"
                >
                  {isPending ? "Loading ...." : " Submit Your Pitch"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="w-1/2 max-sm:hidden flex z-0 justify-center flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600">
              
              hello
                
               </div>
       </section> 
  );
};

export default PostForm;
