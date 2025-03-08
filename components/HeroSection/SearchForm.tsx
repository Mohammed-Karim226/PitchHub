import Form from "next/form";
import { Search, X } from "lucide-react"; // Import the search icon from lucide-react or similar
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action={"/"}
      scroll={false}
      className="bg-white search-form flex justify-between items-center border-2 rounded-full border-slate-300 p-3 w-[700px] max-sm:w-[320px] h-16"
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="Search..."
        className="w-full h-full outline-none text-slate-500 text-xl"
      />

      <div className="flex justify-center items-center gap-2">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="ml-2 p-2 text-slate-500 hover:text-slate-700"
        >
          <Search size={24} />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
