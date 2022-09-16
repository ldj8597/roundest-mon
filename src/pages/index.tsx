import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Image from "next/future/image";
const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["pokemon.get-pair"]);

  console.log(data);

  if (isLoading) return <div>...Loading</div>;

  const first = data?.[0];
  const second = data?.[1];

  return (
    <div>
      <h2 className="text-2xl text-center mb-10">Which Pokémon is Rounder?</h2>
      <div className="max-w-2xl mx-auto flex flex-col px-32 sm:px-0 sm:flex-row justify-between gap-5 sm:gap-10 sm:items-center">
        {/* First Mon */}
        <div className="flex-1 flex flex-col gap-5 items-center">
          <div className="text-2xl font-bold">{first?.forms[0].name}</div>
          <div className="relative w-full aspect-square">
            <Image
              src={`${first?.sprites.back_default}`}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw,
              50vw"
              priority
            />
          </div>
          <button className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300">
            Rounder
          </button>
        </div>

        <div className="text-4xl font-bold text-center">VS</div>

        {/* Second Mon */}
        <div className="flex-1 flex flex-col gap-5 items-center">
          <div className="text-2xl font-bold">{second?.forms[0].name}</div>
          <div className="relative w-full aspect-square">
            <Image
              src={`${second?.sprites.back_default}`}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw,
              50vw"
              priority
            />
          </div>
          <button className="bg-white text-zinc-700 font-semibold px-5 py-2 rounded-full hover:scale-105 duration-300">
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
