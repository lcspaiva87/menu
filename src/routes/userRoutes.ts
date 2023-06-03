// routes/userRoutes.ts

import { FastifyInstance } from 'fastify'
import { registerUser } from '../controller/user/userController'

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerUser)
}

export default userRoutes
