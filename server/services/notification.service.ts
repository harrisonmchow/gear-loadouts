import { prisma } from "@/lib/prisma";
import type { z } from "zod";
import type { pushSubscriptionSchema } from "@/lib/validators";

export async function savePushSubscription(
  userId: string,
  data: z.infer<typeof pushSubscriptionSchema>
) {
  await prisma.pushSubscription.upsert({
    where: { userId },
    update: { endpoint: data.endpoint, p256dh: data.p256dh, auth: data.auth },
    create: {
      userId,
      endpoint: data.endpoint,
      p256dh: data.p256dh,
      auth: data.auth,
    },
  });

  return { success: true };
}
