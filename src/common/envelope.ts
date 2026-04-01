import { z } from "zod";

import { AuditMetadataSchema } from "./meta.js";
import { ConfidenceBandSchema, NonEmptyStringSchema, TraceIdSchema } from "./primitives.js";

export const ErrorDetailSchema = z.object({
  code: NonEmptyStringSchema,
  message: NonEmptyStringSchema,
  details: z.record(z.unknown()).optional(),
  trace_id: TraceIdSchema,
  retryable: z.boolean().default(false)
});

export const ApiResponseMetaSchema = z.object({
  audit: AuditMetadataSchema,
  confidence_band: ConfidenceBandSchema.optional(),
  warnings: z.array(NonEmptyStringSchema).default([])
});

export const createSuccessEnvelopeSchema = <TPayload extends z.ZodTypeAny>(payload: TPayload) =>
  z.object({
    success: z.literal(true),
    meta: ApiResponseMetaSchema,
    data: payload
  });

export const createErrorEnvelopeSchema = () =>
  z.object({
    success: z.literal(false),
    meta: ApiResponseMetaSchema,
    error: ErrorDetailSchema
  });

export const createResponseEnvelopeSchema = <TPayload extends z.ZodTypeAny>(payload: TPayload) =>
  z.union([createSuccessEnvelopeSchema(payload), createErrorEnvelopeSchema()]);

export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type ApiResponseMeta = z.infer<typeof ApiResponseMetaSchema>;
