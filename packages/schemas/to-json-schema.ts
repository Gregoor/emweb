import fs from "fs";

import { zodToJsonSchema } from "zod-to-json-schema";

import * as schemas from "./index";

if (fs.existsSync("json")) {
  fs.rmSync("json", { recursive: true });
}

fs.mkdirSync("json");
for (const [name, schema] of Object.entries(schemas)) {
  fs.writeFileSync(
    `json/${name}.schema.json`,
    JSON.stringify(zodToJsonSchema(schema), null, 2),
  );
}
