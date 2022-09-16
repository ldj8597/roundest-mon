import Loader from "@/components/Loader";
import { inferQueryOutput, trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const Home: NextPage = () => {
  const client = trpc.useContext();
  const { data } = trpc.useQuery(["pokemon.get-pair"], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const vote = (winnerId: number) => {
    console.log(`${winnerId} wins`);
    client.invalidateQueries(["pokemon.get-pair"]);
  };

  const first = data?.[0];
  const second = data?.[1];

  return (
    <div className="py-5 h-screen flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-2xl text-center">Which Pokémon is Rounder?</h2>

      {/* Loader */}
      {!data && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Vote */}
      {first && second && (
        <div className="w-full max-w-2xl mx-auto flex items-center justify-center py-24 sm:py-0">
          <div className="w-full flex flex-col px-32 sm:px-0 sm:flex-row justify-between gap-20 sm:gap-10 sm:items-center">
            {/* First pokemon */}
            <div className="flex-1 flex flex-col items-center">
              <Candidate pokemon={first} />
              <button
                onClick={() => vote(first.id)}
                className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300"
              >
                Rounder
              </button>
            </div>

            <div className="text-4xl font-bold text-center">VS</div>

            {/* Second pokemon */}
            <div className="flex-1 flex flex-col items-center">
              <Candidate pokemon={second} />
              <button
                onClick={() => vote(second.id)}
                className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300"
              >
                Rounder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-center py-5">
        <div className="px-10 py-2 rounded-full bg-zinc-500 shadow-md flex gap-10">
          <Link href="/">
            <span className="text-xl font-semibold hover:scale-110 duration-300 cursor-pointer">
              Vote
            </span>
          </Link>
          <Link href="/results">
            <span className="text-xl font-semibold hover:scale-110 duration-300 cursor-pointer">
              Results
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const PokemonImage = ({ src }: { src: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 639px) 100vw,
              50vw"
        priority
        onLoadingComplete={() => setIsLoading(false)}
        className={clsx("duration-700 ease-in-out", {
          "scale-110 blur-2xl grayscale": isLoading,
        })}
      />
    </div>
  );
};

const Candidate = ({
  pokemon,
}: {
  pokemon: inferQueryOutput<"pokemon.by-id">;
}) => {
  return (
    <>
      <div className="text-2xl font-bold capitalize -mb-5">
        {pokemon.forms[0].name}
      </div>
      <PokemonImage src={`${pokemon.sprites.front_default}`} />
    </>
  );
};

export default Home;
