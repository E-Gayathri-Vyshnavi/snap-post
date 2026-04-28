// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({
    // We explicitly pass the URL here for Prisma 7
    datasourceUrl: process.env.POSTGRES_PRISMA_URL, 
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;