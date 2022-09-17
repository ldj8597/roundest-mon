import Loader from "@/components/Loader";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Footer from "@/components/Footer";
import Vote from "@/components/Vote";

export type VoteFunction = (winnerId: number) => void;

const Home: NextPage = () => {
  const client = trpc.useContext();

  const { data: pair, isFetching } = trpc.useQuery(["pokemon.get-pair"], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate, isLoading: submitting } = trpc.useMutation("pokemon.vote", {
    onSuccess() {},
  });

  const vote: VoteFunction = (winnerId) => {
    if (submitting) return;
    if (!pair) return;

    if (winnerId === pair.firstPokemon.id) {
      mutate({ winnerId: winnerId, loserId: pair.secondPokemon.id });
    } else {
      mutate({ winnerId: winnerId, loserId: pair.firstPokemon.id });
    }
    client.invalidateQueries(["pokemon.get-pair"]);
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
      {!submitting && !isFetching && pair && (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-24 sm:py-0">
          <Vote candidates={pair} vote={vote} />
        </div>
      )}

      {submitting && (
        <div className="absolute h-screen w-full top-0 left-0 flex justify-center items-center">
          <Loader />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
