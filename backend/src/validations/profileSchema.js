import {z} from "zod"

export const profileSchema=z.object({
    name:z.string({required_error: "Email is required to register"})
    .min(2,'Name must be atleast 2 characters')
    .trim(),
    role: z
    .enum(['user', 'admin'])
    .optional(),
    defaultTimezone:z.string().optional()
})