// lib/prisma.ts
import * as Prisma from "@prisma/client";

// Use the Prisma namespace to get the type
const PrismaClient = Prisma.PrismaClient;

const globalForPrisma = global as unknown as { prisma: InstanceType<typeof PrismaClient> };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;