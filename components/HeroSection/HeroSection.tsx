"use client";

import SearchForm from "./SearchForm";

const HeroSection = ({ query }: { query?: string }) => {
  return (
    <section className="w-full relative h-[531px] flex flex-col justify-center items-center py-12 max-sm:py-3">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-90" />
        <div className="absolute inset-0 bg-[url('/path-to-texture.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>

      <div className="flex z-10 justify-center items-center flex-col gap-4">
        <p className="flex justify-center items-center px-4 py-2 bg-yellow-400 rounded-sm text-base font-medium">
          Pitch, Vote, And Grow
        </p>
        <div className="bg-slate-950/90 w-[970px] max-sm:w-[390px]  h-[160px] flex justify-center items-center py-2 rounded-md">
          <h1 className="text-6xl max-sm:text-xl text-center font-bold text-white">
            Pitch Your Startup, Connect with Entrepreneurs
          </h1>
        </div>
        <p className="text-gray-900 text-xl text-center max-sm:text-lg max-sm:font-normal font-medium">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </div>
    </section>
  );
};

export default HeroSection;
