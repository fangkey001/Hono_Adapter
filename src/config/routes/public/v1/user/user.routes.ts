import { Hono } from "hono";
import { UserRepositoryImpl } from "@/infrastructure/repositories/userRepositoryImpl";
import { UserController } from "@/application/controllers/user/userController";
import { GetUserAll } from "@/core/domain/use-cases/user/getAllUser";

const userRouter = new Hono();

const userRepository = new UserRepositoryImpl();
const getUserAll = new GetUserAll(userRepository);
const userController = new UserController(getUserAll);

userRouter.get("/", (context) => userController.index(context));

export default userRouter;
