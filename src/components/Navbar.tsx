import Link from "next/link";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
