import { z } from 'zod'

const UserAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  quantityTables: z.number().int(),
})

export { UserAdminSchema }
