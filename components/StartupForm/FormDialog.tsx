"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Image, Lightbulb, Presentation, Rocket, Type } from "lucide-react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const FormDialog = () => {
  const [pitch, setPitch] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
      await createPitch(formData, pitch);

      setIsPending(false);
      toast.toast({
        title: "Success",
        description: "Your startup pitch has been submitted successfully!",
      });
      form.reset();
      setPitch("");
    } catch (error: unknown) {
      const err = error as Error;
      toast.toast({
        title: "Error",
        description: `There was an issue submitting your startup pitch, ${err.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-gradient-to-r rounded-lg from-blue-500 text-white to-purple-600 text-xl font-normal px-2 py-1">
        Create Startup
      </DialogTrigger>
      <DialogTitle>
        <DialogContent className="overflow-auto h-full pt-12 pb-4 no-scrollbar">
          <DialogHeader>
            <DialogDescription>
              <div className="w-full flex z-0 justify-center flex-col items-center bg-gradient-to-r rounded-t-lg from-blue-500 to-purple-600">
                {isHydrated && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center flex flex-col justify-center items-center mt-4 py-6"
                  >
                    <div className="flex justify-center items-center gap-6 mb-6">
                      <Lightbulb className="text-yellow-300 w-10 h-10 animate-bounce" />
                      <Rocket className="text-red-400 w-10 h-10 animate-bounce delay-150" />
                      <Presentation className="text-green-300 w-10 h-10 animate-bounce delay-300" />
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-md">
                      Submit Your Startup Pitch
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-100">
                      Bring your ideas to life and share your vision with the
                      world!
                    </p>
                  </motion.div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
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
                    placeholder: "Image/Link",
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
                  {isHydrated && (
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
                  )}
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
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default FormDialog;
