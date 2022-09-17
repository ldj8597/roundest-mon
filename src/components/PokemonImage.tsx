import Image from "next/future/image";
import { useState } from "react";
import clsx from "clsx";

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

export default PokemonImage;
