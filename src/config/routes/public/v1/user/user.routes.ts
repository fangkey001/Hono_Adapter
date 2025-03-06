import { Hono } from "hono";
import { UserRepositoryImpl } from "@/infrastructure/repositories/userRepositoryImpl";
import { UserController } from "@/application/controllers/user/userController";
import { GetAllUser } from "@/core/domain/use-cases/user/getAllUser";

const userRouter = new Hono();

const userRepository = new UserRepositoryImpl();
const getAllUser = new GetAllUser(userRepository);
const userController = new UserController(getAllUser);

userRouter.get("/", (context) => userController.index(context));

export default userRouter;
