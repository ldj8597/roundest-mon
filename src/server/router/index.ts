import { createRouter } from "./context";
import superjson from "superjson";
import { pokemonRouter } from "./pokemon";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("pokemon.", pokemonRouter);

export type AppRouter = typeof appRouter;
