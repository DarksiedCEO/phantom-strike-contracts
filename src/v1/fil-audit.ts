import { z } from "zod";

import { defineContract } from "../common/registry.js";
import { AuditMetadataSchema } from "../common/meta.js";
import {
  AuditSeveritySchema,
  GraveyardCategorySchema,
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  RestraintActionSchema,
  ReviewStatusSchema,
  ServiceNameSchema,
  UuidSchema
} from "../common/primitives.js";

export const FilAuditOutcomeSchema = z.enum(["pass", "fail", "warning"]);

export const FilAuditEvidenceSchema = z.object({
  evidence_id: UuidSchema,
  kind: z.enum(["event", "document", "operator-note", "system-log"]),
  summary: NonEmptyStringSchema,
  attached_at: IsoDateTimeSchema
});

export const FilAuditSchema = z.object({
  audit_id: UuidSchema,
  signal_id: UuidSchema,
  outcome: FilAuditOutcomeSchema,
  audit_severity: AuditSeveritySchema,
  graveyard_category: GraveyardCategorySchema,
  detected_trigger: NonEmptyStringSchema,
  first_ignored_symptom: NonEmptyStringSchema,
  official_cause: NonEmptyStringSchema,
  actual_cause: NonEmptyStringSchema,
  last_healthy_signal: NonEmptyStringSchema,
  date_of_functional_death: IsoDateTimeSchema,
  recommended_restraint_action: RestraintActionSchema,
  requires_escalation: z.boolean(),
  review_status: ReviewStatusSchema,
  evaluated_by: ServiceNameSchema,
  occurred_at: IsoDateTimeSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema,
  findings: z.array(NonEmptyStringSchema).min(1),
  controls_checked: z.array(NonEmptyStringSchema).min(1),
  evidence: z.array(FilAuditEvidenceSchema).default([]),
  remediation_plan: NonEmptyStringSchema.optional(),
  audit: AuditMetadataSchema
});

export const FilAuditContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "fil-audit",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  FilAuditSchema
);

export type FilAuditOutcome = z.infer<typeof FilAuditOutcomeSchema>;
export type FilAuditEvidence = z.infer<typeof FilAuditEvidenceSchema>;
export type FilAudit = z.infer<typeof FilAuditSchema>;
