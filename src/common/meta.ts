import { z } from "zod";

import {
  AuthenticityAssessmentSchema,
  ContractVersionSchema,
  EnvironmentSchema,
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  ServiceNameSchema,
  Sha256Schema,
  SourceCollectionMethodSchema,
  SourceReliabilityTierSchema,
  SourceTypeSchema,
  TraceIdSchema,
  UuidSchema
} from "./primitives.js";

export const SchemaDescriptorSchema = z.object({
  contractVersion: ContractVersionSchema,
  schemaName: NonEmptyStringSchema,
  schemaRevision: z.number().int().nonnegative(),
  packageVersion: z.string().regex(/^\d+\.\d+\.\d+(-[\w.-]+)?$/)
});

export const TraceContextSchema = z.object({
  request_id: UuidSchema,
  trace_id: TraceIdSchema,
  correlation_id: UuidSchema,
  actor_service: ServiceNameSchema,
  environment: EnvironmentSchema
});

export const SourceReferenceSchema = z.object({
  source_id: UuidSchema,
  source_type: SourceTypeSchema,
  source_locator: NonEmptyStringSchema,
  original_url: z.string().url().optional(),
  collection_method: SourceCollectionMethodSchema,
  collected_at: IsoDateTimeSchema,
  reliability_tier: SourceReliabilityTierSchema,
  authenticity_assessment: AuthenticityAssessmentSchema,
  ingestion_version: z.string().regex(/^\d+\.\d+\.\d+(-[\w.-]+)?$/),
  content_fingerprint: Sha256Schema.optional()
});

export const AuditMetadataSchema = z.object({
  schema: SchemaDescriptorSchema,
  trace: TraceContextSchema,
  recorded_at: IsoDateTimeSchema,
  tags: z.array(NonEmptyStringSchema).default([])
});

export type SchemaDescriptor = z.infer<typeof SchemaDescriptorSchema>;
export type TraceContext = z.infer<typeof TraceContextSchema>;
export type SourceReference = z.infer<typeof SourceReferenceSchema>;
export type AuditMetadata = z.infer<typeof AuditMetadataSchema>;
