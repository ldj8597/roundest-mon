import Loader from "@/components/Loader";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Footer from "@/components/Footer";
import Vote from "@/components/Vote";

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
      {data && (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-24 sm:py-0">
          <Vote candidates={data} vote={vote} />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
