import { getOptionsForVote } from "@/utils/getRandomPokemon";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const [first, second] = getOptionsForVote();
    setFirst(first);
    setSecond(second);
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center mb-10">Which Pokémon is Rounder?</h2>
      <div className="max-w-2xl mx-auto flex flex-col px-32 sm:px-0 sm:flex-row justify-between gap-5 sm:gap-10 sm:items-center">
        {/* First Mon */}
        <div className="flex-1 flex flex-col gap-5 items-center">
          <div className="text-2xl font-bold">{first}</div>
          <div className="w-full aspect-square border">First</div>
          <button className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300">
            Rounder
          </button>
        </div>

        <div className="text-4xl font-bold text-center">VS</div>

        {/* Second Mon */}
        <div className="flex-1 flex flex-col gap-5 items-center">
          <div className="text-2xl font-bold">{second}</div>
          <div className="w-full aspect-square border">Second</div>
          <button className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300">
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
