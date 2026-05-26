import fs from "node:fs";
import Ajv2020, { type ErrorObject } from "ajv/dist/2020";
import addFormats from "ajv-formats";

export class SchemaValidationError extends Error {
  constructor(
    message: string,
    public readonly schemaId: string,
    public readonly errors: ErrorObject[],
  ) {
    super(message);
    this.name = "SchemaValidationError";
  }
}

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const validatorCache = new Map<string, ReturnType<typeof ajv.compile>>();

export function validateAgainstSchema<T>(data: unknown, schemaPath: string): T {
  let validate = validatorCache.get(schemaPath);
  let schemaId = schemaPath;
  if (!validate) {
    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8")) as object;
    schemaId = (schema as { $id?: string }).$id ?? schemaPath;
    validate = ajv.compile(schema);
    validatorCache.set(schemaPath, validate);
  } else {
    schemaId = (validate.schema as { $id?: string })?.$id ?? schemaPath;
  }

  if (!validate(data)) {
    const errors = validate.errors ?? [];
    const summary = errors
      .slice(0, 5)
      .map((e) => `${e.instancePath || "(root)"} ${e.message ?? "invalid"}`)
      .join("; ");
    throw new SchemaValidationError(
      `Schema validation failed for ${schemaId}: ${summary}`,
      schemaId,
      errors,
    );
  }

  return data as T;
}
