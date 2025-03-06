import { z } from "zod";

export const CreateUserSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});
