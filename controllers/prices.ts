import { getAllPrices } from "../repositories/pricesRepository.ts";

export async function getPrices(ctx: any) {
  const response = await getAllPrices();
  ctx.response.body = response;
}