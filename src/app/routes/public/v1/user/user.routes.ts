import { Hono } from "hono";
import { UserController } from "@/controller/user/user.controller";

const userRouter = new Hono();
const userController = new UserController();

userRouter.get("/", (context) => userController.index(context));
userRouter.get("/:id", (context) => userController.getById(context));

export default userRouter;
