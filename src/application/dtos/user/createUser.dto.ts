import { z } from "zod";
import { CreateUserSchema } from "@/application/validations/user/createUser.validation";

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
