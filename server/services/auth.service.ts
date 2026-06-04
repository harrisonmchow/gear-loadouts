import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ConflictError } from "@server/lib/errors";
import type { z } from "zod";
import type { signupSchema } from "@/lib/validators";

export async function signup(data: z.infer<typeof signupSchema>) {
  const { username, email, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    const field = existingUser.email === email ? "Email" : "Username";
    throw new ConflictError(`${field} already taken`);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { username, email, passwordHash },
  });

  return { id: user.id, username: user.username };
}
