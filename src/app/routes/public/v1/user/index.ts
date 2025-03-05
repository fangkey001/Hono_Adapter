import { Hono } from "hono";
import userRouter from "./user.routes";

const router = new Hono();

router.route("/", userRouter);

export default router;
