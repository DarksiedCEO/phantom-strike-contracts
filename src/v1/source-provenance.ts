import { z } from "zod";

import { defineContract } from "../common/registry.js";
import { AuditMetadataSchema, SourceReferenceSchema } from "../common/meta.js";
import {
  DedupeKeySchema,
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  UuidSchema
} from "../common/primitives.js";

export const SourceProvenanceSchema = z.object({
  provenance_id: UuidSchema,
  signal_id: UuidSchema,
  source: SourceReferenceSchema,
  observed_at: IsoDateTimeSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema,
  collector: NonEmptyStringSchema,
  chain_of_custody: z.array(
    z.object({
      stage: NonEmptyStringSchema,
      actor: NonEmptyStringSchema,
      occurred_at: IsoDateTimeSchema,
      note: NonEmptyStringSchema.optional()
    })
  ),
  dedupe_key: DedupeKeySchema,
  audit: AuditMetadataSchema
});

export const SourceProvenanceContract = defineContract(
  {
    contractVersion: "v1",
    schemaName: "source-provenance",
    schemaRevision: 0,
    packageVersion: "0.1.0"
  },
  SourceProvenanceSchema
);

export type SourceProvenance = z.infer<typeof SourceProvenanceSchema>;
