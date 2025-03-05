import { Hono } from "hono";
import publicV1Router from "./v1";

const router = new Hono();

router.route("/v1", publicV1Router);

export default router;
