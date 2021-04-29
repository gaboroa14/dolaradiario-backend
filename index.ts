import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/routes.ts";
import { fetchAPI } from "./fetch/apiFetching.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

console.log("\nrunning server...");

const app = new Application();

app.use(oakCors());
app.use(router.routes());

console.log("starting scraping server...")

fetchAPI()

console.log(`server running on port ${argPort ? Number(argPort) : DEFAULT_PORT}\nhttp://localhost:${argPort ? Number(argPort) : DEFAULT_PORT}`);

await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
