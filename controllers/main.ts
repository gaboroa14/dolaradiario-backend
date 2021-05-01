import { getLastPricesByAllProviders, getLastMonthPrices } from "../repositories/mainRepository.ts";
import { getAllProviders } from "../repositories/providerRepository.ts";
import { RepositoryResponse } from "../models/RepositoryResponse.ts";
import Provider from "../models/Provider.ts";
import Price from "../models/Price.ts";

export async function getIndex(ctx: any) {
  const prices = await getLastPricesByAllProviders();
  const providers = await getAllProviders();
  ctx.response.body = new RepositoryResponse("500", true, {
    prices: prices,
    providers: providers.data,
  }, "Éxito consultando");
}

export async function getHistory(ctx: any){
  const prices : Price[] = await getLastMonthPrices();
  const providers : RepositoryResponse = await getAllProviders();
  const response : any = providers.data.map((provider : Provider) => {
    return{provider: provider.id, prices: prices.filter((price : Price) => price.provider_id = provider.id)}
  })
  ctx.response.body = new RepositoryResponse("500", true, 
    response, "Éxito consultando");
}
