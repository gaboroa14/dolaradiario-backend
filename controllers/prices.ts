import { getAllPrices, insertNewPrice } from "../repositories/pricesRepository.ts";
import { Status } from "https://deno.land/std@0.94.0/http/http_status.ts";
import Price from "../models/Price.ts";

export async function getPrices(ctx: any) {
  const response = await getAllPrices();
  ctx.response.body = response;
}

export async function insertPrices(ctx:any){
    const price = await ctx.request.body().value
    const response = await insertNewPrice(new Price(0, parseInt(price.value), price.provider, new Date(),'a'))
    ctx.response.body = response;
}