import { z } from "zod";
import { UpdateUserSchema } from "@/application/validations/user/updateUser.validation";

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
