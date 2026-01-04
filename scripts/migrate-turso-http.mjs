import fs from "fs";
import path from "path";

const url = process.env.DATABASE_URL;
const authToken = (process.env.TURSO_AUTH_TOKEN || "").trim();

if (!url || !authToken) {
  console.error("Error: DATABASE_URL and TURSO_AUTH_TOKEN must be set.");
  process.exit(1);
}

// Convert libsql:// to https://
const httpUrl = url.replace("libsql://", "https://");

console.log("Connecting to HTTP API:", httpUrl);

async function main() {
  const migrationPath = path.join(process.cwd(), "prisma/migrations/20251230070322_models/migration.sql");
  let sql = fs.readFileSync(migrationPath, "utf-8");

  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Found ${statements.length} statements to execute.`);

  for (const statement of statements) {
    try {
      // Use the root endpoint instead of /v1/pipeline for AWS regions
      const response = await fetch(httpUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statements: [statement],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();
      
      // Handle the different response format of the legacy/AWS endpoint
      const result = Array.isArray(data) ? data[0] : data;
      
      if (result && result.error) {
        if (result.error.message.includes("already exists")) {
            console.log("Skipping (already exists).");
            continue;
        }
        throw new Error(`SQL Error: ${result.error.message}`);
      }
      
      console.log("Executed statement successfully.");
    } catch (e) {
      console.error(`Failed to execute statement: "${statement.substring(0, 50)}..."`);
      console.error(e);
      process.exit(1);
    }
  }

  console.log("Migration applied successfully!");
}

main();