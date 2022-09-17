import { VoteFunction } from "@/pages";
import { inferQueryOutput } from "@/utils/trpc";
import { Pokemon } from "@prisma/client";
import PokemonImage from "./PokemonImage";

type Props = {
  pokemon: Pokemon;
  vote: VoteFunction;
};

const Candidate = ({ pokemon, vote }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="text-2xl font-bold capitalize -mb-5">{pokemon.name}</div>
      <PokemonImage src={`${pokemon.spriteUrl}`} />
      <button
        onClick={() => vote(pokemon.id)}
        className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300"
      >
        Rounder
      </button>
    </div>
  );
};

export default Candidate;
