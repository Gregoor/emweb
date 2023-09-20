import fs from "fs";

import { zodToJsonSchema } from "zod-to-json-schema";

import { configSchema } from "./index";

fs.writeFileSync(
  "emweb.schema.json",
  JSON.stringify(zodToJsonSchema(configSchema), null, 2),
);
