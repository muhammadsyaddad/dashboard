import { z } from 'zod'

export const serverFormSchema = z.object({
  serverName: z.string().min(3, {
    message: 'Server name must be at least 3 characters.'
  })
})
