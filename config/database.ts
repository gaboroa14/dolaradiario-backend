import { Client } from "https://deno.land/x/postgres@v0.14.2/mod.ts";

console.log("connecting to database...")

const client = new Client(Deno.env.toObject().DATABASE)

console.log("connection completed")

await client.connect()

export default client
