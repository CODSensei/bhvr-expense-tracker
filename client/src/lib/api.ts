import { type ApiRoutes } from "../../../server/src/app";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");
export const api = client.api;
