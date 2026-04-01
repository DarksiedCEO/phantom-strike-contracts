import { z } from "zod";

import { createResponseEnvelopeSchema } from "./common/envelope.js";
import {
  ConfidenceGateContract,
  ConfidenceGateSchema,
  FilAuditContract,
  FilAuditSchema,
  SignalContract,
  SignalEventContract,
  SignalEventSchema,
  SignalSchema,
  SourceProvenanceContract,
  SourceProvenanceSchema
} from "./v1/index.js";

export * from "./common/envelope.js";
export * from "./common/meta.js";
export * from "./common/primitives.js";
export * from "./common/registry.js";
export * from "./v1/index.js";

export const PACKAGE_NAME = "@phantom-strike/contracts";
export const CURRENT_CONTRACT_VERSION = "v1" as const;

export const PhantomStrikeContracts = {
  v1: {
    confidenceGate: ConfidenceGateContract,
    filAudit: FilAuditContract,
    signal: SignalContract,
    signalEvent: SignalEventContract,
    sourceProvenance: SourceProvenanceContract
  }
} as const;

export const PhantomStrikeSchemas = {
  confidenceGate: ConfidenceGateSchema,
  filAudit: FilAuditSchema,
  signal: SignalSchema,
  signalEvent: SignalEventSchema,
  sourceProvenance: SourceProvenanceSchema
} satisfies Record<string, z.ZodTypeAny>;

export const PhantomStrikeResponseSchemas = {
  confidenceGate: createResponseEnvelopeSchema(ConfidenceGateSchema),
  filAudit: createResponseEnvelopeSchema(FilAuditSchema),
  signal: createResponseEnvelopeSchema(SignalSchema),
  signalEvent: createResponseEnvelopeSchema(SignalEventSchema),
  sourceProvenance: createResponseEnvelopeSchema(SourceProvenanceSchema)
} as const;

export function validateContract<
  TName extends keyof typeof PhantomStrikeContracts.v1
>(name: TName, payload: unknown) {
  const contract = PhantomStrikeContracts.v1[name];
  return contract.schema.parse(payload) as z.infer<(typeof contract)["schema"]>;
}
