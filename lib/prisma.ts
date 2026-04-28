// lib/prisma.ts
import type { PrismaClient as PrismaClientType } from "@prisma/client";
import * as PrismaModule from "@prisma/client";

// Use the module's exported PrismaClient
const PrismaClient = PrismaModule.PrismaClient;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;