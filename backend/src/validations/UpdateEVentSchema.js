
import { z } from 'zod';

export const updateEventSchema = z.object({
  profiles: z.array(z.string()).optional(),
  timezone: z.string().optional(),
  startTime: z.string().datetime().optional(), 
  endTime: z.string().datetime().optional(),
})
.refine((data) => {
  if (data.startTime && data.endTime) {
    return new Date(data.endTime) > new Date(data.startTime);
  }
  return true;
}, {
  message: "End time must be strictly after start time",
  path: ["endTime"]
});