import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  return {
    prisma,
  };
}

type Context = inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
