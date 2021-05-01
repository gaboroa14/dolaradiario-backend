import Price from "../models/Price.ts";
import client from "../config/database.ts";
import { ID } from "../config/config.ts";
import { RepositoryResponse } from "../models/RepositoryResponse.ts";

export async function getLastPricesByAllProviders(): Promise<
  Price[]
> {
  try {
    const result: any = await client.queryObject(
      `select * from 
      (
      select provider_id, price_value, date, status, price_id, row_number() over(partition by provider_id order by price_id desc, provider_id) as rn
      from price
      ) t
      where rn = 1
      `,
    );
    const arreglo: Price[] = result.rows.map((price: any) => {
      return new Price(
        price.price_id,
        parseFloat(price.price_value),
        price.provider_id,
        price.date,
        price.status,
      );
    });
    const numeros: number[] = arreglo.map((precio) => precio.value);
    let promedio: number = 0;
    numeros.forEach((numero) => promedio += numero);
    promedio = Math.round(promedio / arreglo.length * 100) / 100;
    arreglo.push(new Price(-1, promedio, ID.PROMEDIO, new Date(), "a"));
    return arreglo;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function getLastMonthPrices() : Promise<Price[]>{
  try {
    const result: any = await client.queryObject(
      `SELECT price_value, date, provider_id
      FROM price
      WHERE date >= now()- interval '1' month
        and date <= now()
      ORDER BY provider_id, date
      `,
    );
    const prices : Price[] = result.map((price : any) => {
      new Price(-1, price.price_value,price.provider_id, price.date,'a')
    })
    return prices;
  } catch (error) {
    console.log(error);
  }
  return [];
}