import RecommendedStartups from "@/components/RecommendedStartups/RecommendedStartups";
import HeroSection from "../../components/HeroSection/HeroSection";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <section className="flex bg-white flex-col justify-center items-center gap-1">
      <HeroSection query={query} />
      <RecommendedStartups query={query} params={{ search: query || null }} />
    </section>
  );
}
