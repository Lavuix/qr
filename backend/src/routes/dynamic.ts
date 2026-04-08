import type { FastifyPluginAsync } from "fastify";
import { dynamicStore } from "../services/dynamicStore.js";

export const dynamicRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /r/:id — redirect to target URL (stub: analytics + dynamic QR)
  fastify.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const record = await dynamicStore.get(request.params.id);
    if (!record) {
      return reply.status(404).send({ error: "QR not found" });
    }
    await dynamicStore.incrementClicks(record.id);
    return reply.redirect(record.targetUrl, 302);
  });

  // GET /r/:id/stats — analytics stub
  fastify.get<{ Params: { id: string } }>("/:id/stats", async (request, reply) => {
    const record = await dynamicStore.get(request.params.id);
    if (!record) {
      return reply.status(404).send({ error: "QR not found" });
    }
    return reply.send({
      id: record.id,
      targetUrl: record.targetUrl,
      clicks: record.clicks,
      createdAt: record.createdAt,
    });
  });
};
