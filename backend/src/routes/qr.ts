import type { FastifyPluginAsync } from "fastify";
import { generateQRSvg } from "../services/qrService.js";
import type { QRGenerateRequest, QRGenerateResponse } from "shared";

const qrBodySchema = {
  type: "object",
  required: ["config"],
  properties: {
    config: {
      type: "object",
      required: ["content", "options", "customization"],
      properties: {
        content: { type: "object" },
        options: {
          type: "object",
          required: ["size", "margin", "errorCorrection"],
          properties: {
            size: { type: "number", minimum: 100, maximum: 2000 },
            margin: { type: "number", minimum: 0, maximum: 20 },
            errorCorrection: { type: "string", enum: ["L", "M", "Q", "H"] },
          },
        },
        customization: {
          type: "object",
          required: ["foregroundColor", "backgroundColor", "roundedModules"],
          properties: {
            foregroundColor: { type: "string" },
            backgroundColor: { type: "string" },
            roundedModules: { type: "boolean" },
            logoDataUrl: { type: ["string", "null"], maxLength: 5_000_000 },
          },
        },
      },
    },
  },
} as const;

export const qrRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: QRGenerateRequest; Reply: QRGenerateResponse }>(
    "/qr",
    { schema: { body: qrBodySchema } },
    async (request, reply) => {
      const svg = await generateQRSvg(request.body.config);
      return reply.send({ svg });
    }
  );
};
