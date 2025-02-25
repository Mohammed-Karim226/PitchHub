"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
    {
      id: 0,
      name: "Step 1",
      designation: "Title",
      content: (
        <p className = "bg-green-500/30 px-2 py-3 rounded-md">
          Start by providing the <Highlight>essential title</Highlight> about
          your startup, including the name, category, or key information that
          makes it unique.
        </p>
      ),
    },
    {
      id: 1,
      name: "Step 2",
      designation: "Category",
      content: (
        <p className = "bg-yellow-500/30 px-2 py-3 rounded-md">
          Give a <Highlight>Category</Highlight> of your startup.
          Explain the problem it solves category, how it works, and why it's a game-changer
          in the industry.
        </p>
      ),
    },
    {
      id: 2,
      name: "Step 3",
      designation: "Upload Image",
      content: (
        <p className = "bg-sky-500/30 px-2 py-3 rounded-md">
          Upload an <Highlight>eye-catching image</Highlight> or logo that
          represents your startup. A strong visual identity makes your pitch more
          memorable.
        </p>
      ),
    },
    {
      id: 3,
      name: "Step 4",
      designation: "Finalize Pitch",
      content: (
        <p className = "bg-red-500/30 px-2 py-3 rounded-md">
          Review all details and <Highlight>finalize your pitch</Highlight>.
          Ensure everything is perfect before submitting to attract potential
          investors and users.
        </p>
      ),
    },
  ];
  