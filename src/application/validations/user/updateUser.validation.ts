import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.number().int().positive("Invalid user ID"),
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
