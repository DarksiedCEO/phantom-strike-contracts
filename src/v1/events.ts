import { z } from "zod";

import { defineContract } from "../common/registry.js";
import { AuditMetadataSchema } from "../common/meta.js";
import {
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  ServiceNameSchema,
  SignalStatusSchema,
  UuidSchema,
  WorkflowDispositionSchema
} from "../common/primitives.js";

export const SignalEventTypeSchema = z.enum([
  "signal.ingested",
  "signal.normalized",
  "signal.scored",
  "signal.review.requested",
  "signal.escalated"
]);

export const SignalEventSchema = z.object({
  event_id: UuidSchema,
  event_type: SignalEventTypeSchema,
  signal_id: UuidSchema,
  prior_signal_status: SignalStatusSchema.optional(),
  resulting_signal_status: SignalStatusSchema.optional(),
  workflow_disposition: WorkflowDispositionSchema.optional(),
  occurred_at: IsoDateTimeSchema,
  created_at: IsoDateTimeSchema,
  producer: ServiceNameSchema,
  payload_version: z.literal("v1"),
  payload: z.record(z.unknown()).optional(),
  idempotency_key: NonEmptyStringSchema,
  audit: AuditMetadataSchema
});

export const SignalEventContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "signal-event",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  SignalEventSchema
);

export type SignalEventType = z.infer<typeof SignalEventTypeSchema>;
export type SignalEvent = z.infer<typeof SignalEventSchema>;
