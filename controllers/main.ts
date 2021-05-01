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
    const preciosConDuplicado: any[] = prices.filter((price: Price) =>
      price.provider_id === provider.id
    )
      .map((price: Price) => {
        return {
          price: price.value,
          date: price.date.toLocaleString("es-VE", {
            timeZone: "America/Caracas",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        };
      });
    const preciosSinDuplicado: any[] = preciosConDuplicado.filter((
      price: Price,
    ) =>
      preciosSinDuplicado.findIndex((p: Price) => {
        price.date === p.date;
      }) === -1
    );
    return {
      provider: provider.id,
      prices: preciosSinDuplicado
    };
  });
  ctx.response.body = new RepositoryResponse(
    "200",
    true,
    response,
    "Éxito consultando",
  );
}
