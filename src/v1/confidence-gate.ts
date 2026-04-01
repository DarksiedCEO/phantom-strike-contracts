import { z } from "zod";

import { defineContract } from "../common/registry.js";
import { AuditMetadataSchema } from "../common/meta.js";
import {
  ConfidenceBandSchema,
  GateNameSchema,
  GateStateSchema,
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  RecommendedDispositionSchema,
  ReviewStatusSchema,
  RiskLevelSchema,
  UuidSchema
} from "../common/primitives.js";

export const ConfidenceFactorSchema = z.object({
  factor: NonEmptyStringSchema,
  weight: z.number().min(0).max(1),
  value: z.number().min(0).max(1),
  rationale: NonEmptyStringSchema
});

export const ConfidenceGateSchema = z.object({
  gate_id: UuidSchema,
  signal_id: UuidSchema,
  gate: GateNameSchema,
  gate_state: GateStateSchema,
  confidence_score: z.number().min(0).max(1),
  confidence_band: ConfidenceBandSchema,
  supporting_evidence_count: z.number().int().nonnegative(),
  contradicting_evidence_count: z.number().int().nonnegative(),
  source_diversity_score: z.number().min(0).max(1),
  authenticity_score: z.number().min(0).max(1),
  risk_level: RiskLevelSchema,
  recommended_disposition: RecommendedDispositionSchema,
  review_status: ReviewStatusSchema,
  inaction_justification_required: z.boolean(),
  occurred_at: IsoDateTimeSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema,
  factors: z.array(ConfidenceFactorSchema).min(1),
  reviewer_notes: NonEmptyStringSchema.optional(),
  audit: AuditMetadataSchema
});

export const ConfidenceGateContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "confidence-gate",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  ConfidenceGateSchema
);

export type ConfidenceFactor = z.infer<typeof ConfidenceFactorSchema>;
export type ConfidenceGate = z.infer<typeof ConfidenceGateSchema>;
