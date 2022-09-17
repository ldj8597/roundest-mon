import { VoteFunction } from "@/pages";
import { inferQueryOutput } from "@/utils/trpc";
import Candidate from "./Candidate";

interface Props {
  candidates: inferQueryOutput<"pokemon.get-pair">;
  vote: VoteFunction;
}

const Vote = ({ candidates, vote }: Props) => {
  const [first, second] = candidates;

  return (
    <div className="w-full flex flex-col px-32 sm:px-0 sm:flex-row justify-between gap-20 sm:gap-10 sm:items-center">
      {/* First pokemon */}
      <Candidate pokemon={first} enemy={second} vote={vote} />

      <div className="text-4xl font-bold text-center">VS</div>

      {/* Second pokemon */}
      <Candidate pokemon={second} enemy={first} vote={vote} />
    </div>
  );
};

export default Vote;
