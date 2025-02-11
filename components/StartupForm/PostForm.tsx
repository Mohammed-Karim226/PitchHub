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
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500, { message: "Description must not exceed 500 characters." })
    .trim(),
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
  pitch: z
    .string()
    .min(20, { message: "Pitch must be at least 20 characters." })
    .max(1000, { message: "Pitch must not exceed 1000 characters." })
    .trim(),
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
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("image", values.image);
      formData.append("pitch", values.pitch);

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
<section className="flex flex-col justify-center items-center w-full">

              <div className="w-full flex z-0 justify-center flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600">
              
              <motion.div
  initial={{ opacity: 0, y: -50, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="relative w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden py-10"
>
  {/* Subtle background glow */}
  <div className="absolute inset-0 bg-gradient-to-t from-purple-700 via-transparent to-blue-500 opacity-40 blur-2xl" />

  {/* Floating Animated Icons */}
  <div className="flex justify-center items-center gap-8 mb-6 relative z-10">
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <Lightbulb className="text-yellow-300 w-12 h-12 drop-shadow-lg" />
    </motion.div>

    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [-8, 8, -8], rotate: [5, -5, 5] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.2 }}
    >
      <Rocket className="text-red-400 w-12 h-12 drop-shadow-lg" />
    </motion.div>

    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [-12, 12, -12], rotate: [-3, 3, -3] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.4 }}
    >
      <Presentation className="text-green-300 w-12 h-12 drop-shadow-lg" />
    </motion.div>
  </div>

  {/* Header and Description */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="text-2xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg"
  >
    Submit Your Startup Pitch 🚀
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.7 }}
    className="mt-4 text-lg md:text-xl text-gray-100 px-6 text-center"
  >
    Bring your ideas to life and share your vision with the world!
  </motion.p>
</motion.div>
               
              </div>
              
          <div className="flex z-10 w-full max-w-4xl px-6 py-8 bg-white justify-center items-center flex-col  rounded-t-2xl">
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
                        <FormLabel>{field.placeholder}</FormLabel>
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
                              className="w-full  h-[55px] rounded-full pl-12 focus:ring-2 focus:ring-purple-500"
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="w-full  h-[120px] rounded-2xl focus:ring-2 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="container" data-color-mode="light">
                  
                    <MDEditor
                      value={pitch}
                      onChange={(value) => {
                        setPitch(value || "");
                        form.setValue("pitch", value || "");
                      }}
                      preview="edit"
                      height={300}
                      style={{ borderRadius: 20, overflow: "hidden" }}
                      textareaProps={{
                        placeholder: "Describe your idea...",
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
          
       </section> 
  );
};

export default PostForm;
