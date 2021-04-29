import { getAllPrices, insertNewPrice } from "../repositories/pricesRepository.ts";
import { Status } from "https://deno.land/std@0.94.0/http/http_status.ts";
import Price from "../models/Price.ts";

export async function getPrices(ctx: any) {
  const response = await getAllPrices();
  ctx.response.body = response;
}