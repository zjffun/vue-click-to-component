import fs from "fs";

function resolve(path) {
  return new URL(path, import.meta.url);
}

const client = fs.readFileSync(resolve("../client.js"), "utf8");

const clientForceEnable = client.replace(
  'process.env.NODE_ENV === "development"',
  "true"
);

fs.writeFileSync(resolve("../client-force-enable.js"), clientForceEnable);

fs.copyFileSync(
  resolve("../client.d.ts"),
  resolve("../client-force-enable.d.ts")
);
