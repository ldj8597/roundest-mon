import { VoteFunction } from "@/pages";
import { inferQueryOutput } from "@/utils/trpc";
import PokemonImage from "./PokemonImage";

type Props = {
  pokemon: inferQueryOutput<"pokemon.by-id">;
  vote: VoteFunction;
};

const Candidate = ({ pokemon, vote }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="text-2xl font-bold capitalize -mb-5">
        {pokemon?.forms[0].name}
      </div>
      <PokemonImage src={`${pokemon.sprites.front_default}`} />
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
