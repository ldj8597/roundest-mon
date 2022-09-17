import Loader from "@/components/Loader";
import { trpc } from "@/utils/trpc";
import Image from "next/future/image";
import { NextPageWithLayout } from "./_app";

const Results: NextPageWithLayout = () => {
  const { data, isLoading } = trpc.useQuery(["pokemon.ranking"]);

  return (
    <div className="max-w-2xl mx-auto py-5 space-y-10">
      <h1 className="text-4xl font-bold text-center">Ranking</h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="border divide-y">
        {data &&
          data.map((pokemon, index) => (
            <div
              key={pokemon.id}
              className="relative pl-10 pr-5 py-1 flex items-center justify-between"
            >
              <span className="absolute h-1/3 aspect-square border-r border-b rounded-br left-0 top-0 flex items-center justify-center bg-slate-500">
                {index + 1}
              </span>
              <div className="flex items-center gap-10">
                <div className="w-20 aspect-square">
                  <Image
                    src={pokemon.spriteUrl}
                    alt=""
                    width={80}
                    height={80}
                  />
                </div>
                <span className="capitalize text-lg font-semibold">
                  {pokemon.name}
                </span>
              </div>
              <div className="text-lg font-semibold">
                {(
                  (pokemon._count.votesWon /
                    Math.max(
                      1,
                      pokemon._count.votesWon + pokemon._count.votesLost
                    )) *
                  100
                ).toFixed(2)}
                %
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Results;
