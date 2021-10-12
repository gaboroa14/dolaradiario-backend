import {
  getLastMonthPrices,
  getLastPricesByAllProviders,
} from "../repositories/mainRepository.ts";
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

export async function getHistory(ctx: any) {
  const prices: Price[] = await getLastMonthPrices();
  const providers: RepositoryResponse = await getAllProviders();
  const response: any = providers.data.map((provider: Provider) => {
    if (provider.id !== 5){
    return {
      provider: provider.description,
      prices: prices.filter((price: Price) => price.provider_id === provider.id)
        .map((price: Price) => {
          const fecha : string = price.date.toLocaleString("es-VE", {timeZone: "America/Caracas", year: 'numeric', month: 'numeric', day: 'numeric'});
          if (fecha.substr(3) == "9/2021") price.value = Math.round(price.value / 10000)/100;
          return { price: price.value, date: fecha};
        }),
    };}
  });
  response.pop();
  ctx.response.body = new RepositoryResponse(
    "200",
    true,
    response,
    "Éxito consultando",
  );
}
