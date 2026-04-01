import { z } from "zod";

import { createResponseEnvelopeSchema } from "./envelope.js";
import { SchemaDescriptorSchema } from "./meta.js";

export type ContractDefinition<TSchema extends z.ZodTypeAny> = {
  descriptor: z.infer<typeof SchemaDescriptorSchema>;
  schema: TSchema;
  response: ReturnType<typeof createResponseEnvelopeSchema<TSchema>>;
};

export function defineContract<TSchema extends z.ZodTypeAny>(
  descriptor: z.infer<typeof SchemaDescriptorSchema>,
  schema: TSchema
): ContractDefinition<TSchema> {
  return {
    descriptor,
    schema,
    response: createResponseEnvelopeSchema(schema)
  };
}

export function parseWithContract<TSchema extends z.ZodTypeAny>(
  contract: ContractDefinition<TSchema>,
  value: unknown
): z.infer<TSchema> {
  return contract.schema.parse(value);
}
