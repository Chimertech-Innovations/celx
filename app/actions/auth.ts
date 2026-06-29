'use server'

import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validation'
import bcrypt from 'bcryptjs'
import { UserRoleEnum } from '@prisma/client'

export async function registerUser(data: {
  name: string
  email: string
  password: string
  confirmPassword: string
  role?: string
  affiliation?: string
  country?: string
}) {
  try {
    const validated = registerSchema.parse(data)

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email: validated.email } })
    if (existing) {
      return { error: 'An account with this email already exists.' }
    }

    const hashedPassword = await bcrypt.hash(validated.password, 12)

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: (validated.role as UserRoleEnum) || 'AUTHOR',
        affiliation: validated.affiliation,
        country: validated.country,
      },
    })

    return { success: true, userId: user.id }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'Registration failed. Please try again.' }
  }
}
