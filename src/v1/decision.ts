import { z } from "zod";

import { defineContract } from "../common/registry.js";
import {
  ConfidenceBandSchema,
  NonEmptyStringSchema,
  ServiceNameSchema,
  SignalDecisionDispositionSchema,
  TraceIdSchema,
  UuidSchema
} from "../common/primitives.js";

export const SignalDecisionSchema = z.object({
  signal_id: UuidSchema,
  baseline_confidence: z.number().min(0).max(1),
  confidence_delta: z.number().min(-1).max(1),
  updated_confidence: z.number().min(0).max(1),
  confidence_band: ConfidenceBandSchema,
  disposition: SignalDecisionDispositionSchema,
  reasoning: NonEmptyStringSchema,
  trace_id: TraceIdSchema,
  correlation_id: UuidSchema
});

export const DecisionSubmissionResultSchema = z.object({
  signal_id: UuidSchema,
  submitted: z.boolean(),
  target_service: ServiceNameSchema,
  target_endpoint: NonEmptyStringSchema,
  trace_id: TraceIdSchema,
  correlation_id: UuidSchema
});

export const SignalDecisionRecordSchema = z.object({
  signal_id: UuidSchema,
  baseline_confidence: z.number().min(0).max(1),
  confidence_delta: z.number().min(-1).max(1),
  updated_confidence: z.number().min(0).max(1),
  confidence_band: ConfidenceBandSchema,
  disposition: SignalDecisionDispositionSchema,
  reasoning: NonEmptyStringSchema,
  trace_id: TraceIdSchema,
  correlation_id: UuidSchema
});

export const SignalDecisionContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "signal-decision",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  SignalDecisionSchema
);

export const DecisionSubmissionResultContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "decision-submission-result",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  DecisionSubmissionResultSchema
);

export const SignalDecisionRecordContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "signal-decision-record",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  SignalDecisionRecordSchema
);

export type SignalDecision = z.infer<typeof SignalDecisionSchema>;
export type DecisionSubmissionResult = z.infer<typeof DecisionSubmissionResultSchema>;
export type SignalDecisionRecord = z.infer<typeof SignalDecisionRecordSchema>;
