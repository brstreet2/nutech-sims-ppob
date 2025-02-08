import fs from "fs";
import path from "path";
import { query } from "../db";

const runDDL = async () => {
  const ddlPath = path.join(__dirname, "schema.sql");
  const ddl = fs.readFileSync(ddlPath, "utf-8");

  try {
    await query(ddl);
    console.log("DDL executed successfully.");
  } catch (error) {
    console.error("Error executing DDL:", error);
  }
};

runDDL().then(() => process.exit());
