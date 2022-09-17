import Loader from "@/components/Loader";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Footer from "@/components/Footer";
import Vote from "@/components/Vote";

export type VoteFunction = (winnerId: number) => void;

const Home: NextPage = () => {
  const client = trpc.useContext();

  const { data: pair } = trpc.useQuery(["pokemon.get-pair"], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate, isLoading } = trpc.useMutation("pokemon.vote");

  const vote: VoteFunction = (winnerId) => {
    if (isLoading) return;
    if (!pair) return;

    if (winnerId === pair.firstPokemon.id) {
      console.log("first won");
    } else {
      console.log("second won");
    }
  };

  return (
    <div className="py-5 h-screen flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-2xl text-center">Which Pokémon is Rounder?</h2>

      {/* Loader */}
      {!pair && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Vote */}
      {pair && (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-24 sm:py-0">
          <Vote candidates={pair} vote={vote} />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
