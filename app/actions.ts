"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;

  if (!title) return;

  await prisma.post.create({
    data: {
      title,
      status: "draft",
    },
  });

  revalidatePath("/dashboard");
}

export async function deletePost(id: string) {
  if (!id) return;

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
}