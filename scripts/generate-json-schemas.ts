import fs from "node:fs";
import path from "node:path";

import { zodToJsonSchema } from "zod-to-json-schema";

import { z } from "zod";

import { PhantomStrikeResponseSchemas, PhantomStrikeSchemas } from "../src/index.js";

const root = path.resolve(import.meta.dirname, "..");
const checkOnly = process.argv.includes("--check");

type SchemaGroup = Record<string, z.ZodTypeAny>;

function writeJson(outPath: string, value: unknown) {
  const serialized = JSON.stringify(value, null, 2) + "\n";

  if (checkOnly) {
    const current = fs.readFileSync(outPath, "utf8");
    if (current !== serialized) {
      throw new Error(`Schema drift detected: ${outPath}`);
    }
    return;
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, serialized, "utf8");
}

function writeSchemaGroup(baseDir: string, group: SchemaGroup) {
  for (const [name, schema] of Object.entries(group)) {
    const jsonSchema = zodToJsonSchema(schema, {
      target: "jsonSchema7",
      name
    });
    writeJson(path.join(baseDir, `${name}.json`), jsonSchema);
  }
}

try {
  writeSchemaGroup(path.join(root, "schemas", "v1"), PhantomStrikeSchemas);
  writeSchemaGroup(path.join(root, "schemas", "v1", "responses"), PhantomStrikeResponseSchemas);
  if (!checkOnly) {
    console.log("PhantomStrike schemas generated.");
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
