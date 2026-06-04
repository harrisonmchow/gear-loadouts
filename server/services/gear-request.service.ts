import { prisma } from "@/lib/prisma";
import type { z } from "zod";
import type { gearRequestSchema } from "@/lib/validators";

export async function createGearRequest(
  userId: string,
  data: z.infer<typeof gearRequestSchema>
) {
  return prisma.gearRequest.create({
    data: {
      userId,
      name: data.name,
      category: data.category,
      link: data.link,
    },
  });
}
