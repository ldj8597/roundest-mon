import Loader from "@/components/Loader";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Footer from "@/components/Footer";
import Vote from "@/components/Vote";

export type VoteFunction = ({
  winnerId,
  loserId,
}: {
  winnerId: number;
  loserId: number;
}) => void;

const Home: NextPage = () => {
  const client = trpc.useContext();

  const { data } = trpc.useQuery(["pokemon.get-pair"], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate, isLoading } = trpc.useMutation("pokemon.vote");

  const vote: VoteFunction = ({ winnerId, loserId }) => {
    if (isLoading) return;

    console.log(winnerId, loserId);
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
