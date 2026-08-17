import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

const databaseUrl = process.env.DATABASE_URL;
const useNeonHttp =
	process.env.DATABASE_DRIVER === "neon" ||
	databaseUrl.includes("neon.tech") ||
	databaseUrl.includes("neon.database");

export const db = useNeonHttp
	? drizzleNeon(neon(databaseUrl))
	: drizzlePg(new Pool({ connectionString: databaseUrl }));
