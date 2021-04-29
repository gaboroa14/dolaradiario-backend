import { getLastPricesByAllProviders } from "../repositories/mainRepository.ts";
import { getAllProviders } from "../repositories/providerRepository.ts";
import { RepositoryResponse } from "../models/RepositoryResponse.ts";

export async function getIndex(ctx: any) {
  const prices = await getLastPricesByAllProviders();
  const providers = await getAllProviders();
  ctx.response.body = new RepositoryResponse("500", true, {
    prices: prices,
    providers: providers.data,
  }, "Éxito consultando");
}

export {};
