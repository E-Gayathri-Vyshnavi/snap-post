// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// If the above still fails, try this alternative:
// import Prisma from '@prisma/client';
// const PrismaClient = Prisma.PrismaClient;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.POSTGRES_PRISMA_URL,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;