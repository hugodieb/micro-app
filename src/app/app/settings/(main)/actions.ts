'use server'

import { auth } from "@/services/auth"
import { updateProfileSchema } from "./schema"
import { prisma } from "@/services/database"
import { date, z } from "zod"

export async function updateProfile(input: z.infer<typeof updateProfileSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Usuário não autorizado'
    }
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name
    }
  })
}