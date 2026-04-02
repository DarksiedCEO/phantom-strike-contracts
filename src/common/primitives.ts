import { z } from "zod";

export const ContractVersionSchema = z.literal("v1");
export const SemVerSchema = z.string().regex(/^\d+\.\d+\.\d+$/, "Expected semantic version.");
export const UuidSchema = z.string().uuid();
export const NonEmptyStringSchema = z.string().trim().min(1);
export const IsoDateTimeSchema = z.string().datetime({ offset: true });
export const UrlSchema = z.string().url();
export const Sha256Schema = z.string().regex(/^[a-fA-F0-9]{64}$/, "Expected SHA-256 digest.");
export const DedupeKeySchema = z.string().trim().min(8).max(256);
export const TraceIdSchema = z.string().trim().min(8).max(128);

export const ServiceNameSchema = z.enum([
  "contracts",
  "core",
  "workflows",
  "intel",
  "console"
]);

export const EnvironmentSchema = z.enum(["local", "dev", "staging", "production"]);

export const ConfidenceLevelSchema = z.enum(["low", "medium", "high", "critical"]);
export const ConfidenceBandSchema = z.enum(["low", "guarded", "elevated", "confirmed"]);
export const RiskLevelSchema = z.enum(["low", "medium", "high", "critical"]);
export const ReviewStatusSchema = z.enum(["pending", "in_review", "approved", "rejected", "overridden"]);
export const WorkflowDispositionSchema = z.enum([
  "promote",
  "hold",
  "escalate",
  "suppress",
  "archive"
]);
export const SignalDecisionDispositionSchema = z.enum([
  "promote",
  "hold",
  "suppress",
  "escalate"
]);
export const SourceTypeSchema = z.enum(["osint", "internal", "partner", "human", "synthetic"]);
export const SourceCollectionMethodSchema = z.enum([
  "manual_entry",
  "api_pull",
  "web_scrape",
  "partner_feed",
  "sensor_ingest",
  "analyst_upload"
]);
export const SourceReliabilityTierSchema = z.enum(["unverified", "low", "medium", "high", "trusted"]);
export const AuthenticityAssessmentSchema = z.enum([
  "unknown",
  "suspected_authentic",
  "verified_authentic",
  "manipulated",
  "spoofed"
]);
export const GateNameSchema = z.enum([
  "confidence_gate",
  "authenticity_gate",
  "provenance_gate",
  "escalation_gate"
]);
export const GateStateSchema = z.enum(["open", "review", "blocked", "approved"]);
export const GraveyardCategorySchema = z.enum([
  "false_positive",
  "signal_decay",
  "source_failure",
  "workflow_breakdown",
  "operator_drift",
  "model_deception"
]);
export const AuditSeveritySchema = z.enum(["notice", "warning", "critical"]);
export const RecommendedDispositionSchema = z.enum([
  "approve",
  "queue_review",
  "escalate",
  "suppress",
  "reject"
]);
export const RestraintActionSchema = z.enum([
  "pause_workflow",
  "require_human_review",
  "block_distribution",
  "quarantine_signal",
  "rollback_state"
]);
export const SignalCategorySchema = z.enum(["anomaly", "campaign", "entity", "threat", "lead"]);
export const SignalStatusSchema = z.enum([
  "draft",
  "triaged",
  "validated",
  "escalated",
  "suppressed",
  "resolved"
]);
export const SignalSeveritySchema = z.enum(["informational", "low", "medium", "high", "critical"]);

export type ContractVersion = z.infer<typeof ContractVersionSchema>;
export type SemVer = z.infer<typeof SemVerSchema>;
export type Uuid = z.infer<typeof UuidSchema>;
export type NonEmptyString = z.infer<typeof NonEmptyStringSchema>;
export type IsoDateTime = z.infer<typeof IsoDateTimeSchema>;
export type ServiceName = z.infer<typeof ServiceNameSchema>;
export type Environment = z.infer<typeof EnvironmentSchema>;
export type ConfidenceLevel = z.infer<typeof ConfidenceLevelSchema>;
export type ConfidenceBand = z.infer<typeof ConfidenceBandSchema>;
export type RiskLevel = z.infer<typeof RiskLevelSchema>;
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;
export type WorkflowDisposition = z.infer<typeof WorkflowDispositionSchema>;
export type SignalDecisionDisposition = z.infer<typeof SignalDecisionDispositionSchema>;
export type SourceType = z.infer<typeof SourceTypeSchema>;
export type SourceCollectionMethod = z.infer<typeof SourceCollectionMethodSchema>;
export type SourceReliabilityTier = z.infer<typeof SourceReliabilityTierSchema>;
export type AuthenticityAssessment = z.infer<typeof AuthenticityAssessmentSchema>;
export type GateName = z.infer<typeof GateNameSchema>;
export type GateState = z.infer<typeof GateStateSchema>;
export type GraveyardCategory = z.infer<typeof GraveyardCategorySchema>;
export type AuditSeverity = z.infer<typeof AuditSeveritySchema>;
export type RecommendedDisposition = z.infer<typeof RecommendedDispositionSchema>;
export type RestraintAction = z.infer<typeof RestraintActionSchema>;
export type SignalCategory = z.infer<typeof SignalCategorySchema>;
export type SignalStatus = z.infer<typeof SignalStatusSchema>;
export type SignalSeverity = z.infer<typeof SignalSeveritySchema>;
