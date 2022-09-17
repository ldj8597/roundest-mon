import { z } from "zod";
import { createRouter } from "./context";
import { PokemonClient } from "pokenode-ts";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { TRPCError } from "@trpc/server";

const api = new PokemonClient();

export const pokemonRouter = createRouter()
  .query("by-id", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await api.getPokemonById(input.id);
    },
  })
  .query("get-pair", {
    async resolve() {
      const [firstId, secondId] = getOptionsForVote();
      const first = await api.getPokemonById(firstId);
      const second = await api.getPokemonById(secondId);

      return [first, second];
    },
  })
  .mutation("vote", {
    input: z.object({
      winnerId: z.number().int().positive(),
      loserId: z.number().int().positive(),
    }),
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.vote.create({
          data: {
            ...input,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    },
  });
