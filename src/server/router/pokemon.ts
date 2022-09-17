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
    async resolve({ ctx }) {
      const [firstId, secondId] = getOptionsForVote();

      let first = await ctx.prisma.pokemon.findUnique({
        where: {
          id: firstId,
        },
      });

      if (!first) {
        const pokemon = await api.getPokemonById(firstId);
        if (pokemon) {
          first = await ctx.prisma.pokemon.create({
            data: {
              id: firstId,
              name: pokemon.forms[0].name,
              spriteUrl: pokemon.sprites.front_default!,
            },
          });
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
          });
        }
      }

      let second = await ctx.prisma.pokemon.findUnique({
        where: {
          id: secondId,
        },
      });

      if (!second) {
        const pokemon = await api.getPokemonById(secondId);
        if (pokemon) {
          second = await ctx.prisma.pokemon.create({
            data: {
              id: secondId,
              name: pokemon.forms[0].name,
              spriteUrl: pokemon.sprites.front_default!,
            },
          });
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
          });
        }
      }

      return {
        firstPokemon: first,
        secondPokemon: second,
      };
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
  })
  .query("ranking", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.pokemon.findMany({
          include: {
            _count: {
              select: {
                votesWon: true,
                votesLost: true,
              },
            },
          },
          orderBy: {
            votesWon: {
              _count: "desc",
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    },
  });
