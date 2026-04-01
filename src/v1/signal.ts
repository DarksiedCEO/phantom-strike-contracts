import { z } from "zod";

import { defineContract } from "../common/registry.js";
import { AuditMetadataSchema } from "../common/meta.js";
import {
  ConfidenceBandSchema,
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  SignalCategorySchema,
  SignalSeveritySchema,
  SignalStatusSchema,
  UuidSchema
} from "../common/primitives.js";

export const SignalScoreSchema = z.object({
  score: z.number().min(0).max(100),
  confidence_band: ConfidenceBandSchema,
  rationale: NonEmptyStringSchema,
  generated_at: IsoDateTimeSchema
});

export const SignalSchema = z.object({
  signal_id: UuidSchema,
  title: NonEmptyStringSchema,
  summary: NonEmptyStringSchema,
  category: SignalCategorySchema,
  status: SignalStatusSchema,
  severity: SignalSeveritySchema,
  observed_at: IsoDateTimeSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema,
  tags: z.array(NonEmptyStringSchema).default([]),
  scores: z.array(SignalScoreSchema).min(1),
  related_source_ids: z.array(UuidSchema).default([]),
  audit: AuditMetadataSchema
});

export const SignalContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "signal",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  SignalSchema
);

export type SignalScore = z.infer<typeof SignalScoreSchema>;
export type Signal = z.infer<typeof SignalSchema>;
