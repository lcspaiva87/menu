/* eslint-disable no-undef */
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { UserAdminSchema } from '../../models/userAdmin'
import { z } from 'zod'
const prisma = new PrismaClient()

async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, password, quantityTables } = UserAdminSchema.parse(
      request.body,
    )

    // Verificar se o email já está sendo usado
    const existingUser = await prisma.userAdmin.findUnique({ where: { email } })
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already exists' })
    }

    const user = await prisma.userAdmin.create({
      data: {
        name,
        email,
        password,
        quantityTables,
      },
    })

    reply.status(200).send({ message: 'User registered successfully', user })
  } catch (error) {
    console.error(error)
    reply.status(400).send({ message: error })
  }
}
async function editUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    })
    const { id } = paramsSchema.parse(request.params)

    const { name, email, password, quantityTables } = UserAdminSchema.parse(
      request.body,
    )

    // Verificar se o email já está sendo usado por outro usuário
    const existingUser = await prisma.userAdmin.findFirst({
      where: {
        email,
        NOT: {
          id,
        },
      },
    })
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already exists' })
    }

    const updatedUser = await prisma.userAdmin.update({
      where: { id },
      data: {
        name,
        email,
        password,
        quantityTables,
      },
    })

    reply
      .status(200)
      .send({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    console.error(error)
    reply.status(400).send({ message: error })
  }
}
export { registerUser, editUser }
