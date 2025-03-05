import { Hono } from "hono";
import publicRoute from "./routes/public";

const app = new Hono().basePath("/api");

app.route("/public", publicRoute);

const port = 4000;
export default {
  port,
  fetch: app.fetch,
};
