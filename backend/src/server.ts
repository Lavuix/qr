import Fastify from "fastify";
import cors from "@fastify/cors";
import { qrRoutes } from "./routes/qr.js";
import { dynamicRoutes } from "./routes/dynamic.js";

const server = Fastify({ logger: true });

await server.register(cors, {
  origin: ["http://localhost:5173", "http://localhost:4173"],
  methods: ["GET", "POST", "OPTIONS"],
});

await server.register(qrRoutes, { prefix: "/api" });
await server.register(dynamicRoutes, { prefix: "/r" });

server.get("/health", async () => ({ status: "ok" }));

try {
  await server.listen({ port: 3001, host: "0.0.0.0" });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
