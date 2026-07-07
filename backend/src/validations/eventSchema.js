import z from "zod";

export const eventSchema = z.object({
  payload:z.object({
    profiles: z
      .array(z.string(), { required_error: 'Profile array is required' })
      .min(1, 'At least one profile must be selected'),
    timezone: z
      .string({ required_error: 'Timezone is required' })
      .min(1, 'Timezone cannot be empty'),
    startTime: z
      .string({ required_error: 'Start time is required' })
      .datetime({ message: 'Start time must be a valid UTC datetime string' }),
    endTime: z
      .string({ required_error: 'End time is required' })
      .datetime({ message: 'End time must be a valid UTC datetime string' }),
  })
  .refine((data) => new Date(data.startTime) < new Date(data.endTime), {
    message: 'End time cannot be before or equal to start time',
    path: ['endTime'],
  })
})
  
