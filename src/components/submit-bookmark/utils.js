import { z } from 'zod'

export const formSchema = z.object({
  url: z.string().url({
    message: 'Invalid URL.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  type: z.string().optional().or(z.literal(''))
})

export const deviceFormSchema = z.object({
  deviceName: z.string().min(3, {
    message: 'Device name must be at least 3 characters.'
  }),
  deviceType: z.string({
    required_error: 'Please select a device type.'
  }),
  rtspUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional()
})
