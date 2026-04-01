import { describe, expect, it } from "vitest";

import {
  ConfidenceGateSchema,
  CURRENT_CONTRACT_VERSION,
  PhantomStrikeContracts,
  PhantomStrikeResponseSchemas,
  validateContract
} from "../src/index.js";

describe("phantom-strike contracts", () => {
  it("locks the current contract version to v1", () => {
    expect(CURRENT_CONTRACT_VERSION).toBe("v1");
    expect(PhantomStrikeContracts.v1.confidenceGate.descriptor.contractVersion).toBe("v1");
  });

  it("parses a confidence gate payload through the shared registry", () => {
    const payload = {
      gate_id: "3e26e8ca-4214-4931-a32d-a11c7c7d70d0",
      signal_id: "df1eab71-aa5f-4ce2-9915-64ccf314e3b9",
      gate: "confidence_gate",
      gate_state: "review",
      confidence_score: 0.93,
      confidence_band: "confirmed",
      supporting_evidence_count: 3,
      contradicting_evidence_count: 1,
      source_diversity_score: 0.82,
      authenticity_score: 0.9,
      risk_level: "high",
      recommended_disposition: "queue_review",
      review_status: "in_review",
      inaction_justification_required: true,
      occurred_at: "2026-03-31T12:00:00Z",
      created_at: "2026-03-31T12:00:00Z",
      updated_at: "2026-03-31T12:05:00Z",
      factors: [
        {
          factor: "multi-source-corroboration",
          weight: 0.7,
          value: 0.95,
          rationale: "Three independent sources agree."
        }
      ],
      audit: {
        schema: {
          contractVersion: "v1",
          schemaName: "confidence-gate",
          schemaRevision: 0,
          packageVersion: "0.1.0"
        },
        trace: {
          request_id: "0b315677-0912-4f5a-a25e-24d33c841d88",
          trace_id: "trace-001-alpha",
          correlation_id: "e5b11411-2732-486f-9d0a-f4144ea20395",
          actor_service: "core",
          environment: "dev"
        },
        recorded_at: "2026-03-31T12:00:00Z",
        tags: ["contract-test"]
      }
    };

    expect(validateContract("confidenceGate", payload)).toEqual(ConfidenceGateSchema.parse(payload));
  });

  it("keeps the response envelope deterministic", () => {
    const envelope = {
      success: false,
      meta: {
        audit: {
          schema: {
            contractVersion: "v1",
            schemaName: "signal",
            schemaRevision: 0,
            packageVersion: "0.1.0"
          },
          trace: {
            request_id: "0b315677-0912-4f5a-a25e-24d33c841d88",
            trace_id: "trace-001-alpha",
            correlation_id: "e5b11411-2732-486f-9d0a-f4144ea20395",
            actor_service: "core",
            environment: "dev"
          },
          recorded_at: "2026-03-31T12:00:00Z",
          tags: []
        },
        warnings: [],
        confidence_band: "guarded"
      },
      error: {
        code: "SIGNAL_VALIDATION_FAILED",
        message: "Signal payload failed validation.",
        details: {
          field: "signal_id"
        },
        trace_id: "trace-001-alpha",
        retryable: false
      }
    };

    expect(() => PhantomStrikeResponseSchemas.signal.parse(envelope)).not.toThrow();
  });
});
