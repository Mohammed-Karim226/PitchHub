"use client";

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const handleReset = () => {
    if (typeof document !== "undefined") {
      const form = document.querySelector(".search-form") as HTMLFormElement;
      if (form) form.reset();
    }
  };

  return (
    <button
      type="reset"
      onClick={handleReset}
      className="ml-2 p-2 text-slate-500 hover:text-slate-700 "
    >
      <Link href={"/"}>
        <X size={24} className="max-sm:size-[18px]" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
