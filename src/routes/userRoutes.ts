// routes/userRoutes.ts

import { FastifyInstance } from 'fastify'
import { editUser, registerUser } from '../controller/user/userController'

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerUser)
  fastify.put('/users/:id', editUser)
}

export default userRoutes
