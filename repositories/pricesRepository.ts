import Price from "../models/Price.ts";
import client from "../config/database.ts";
import { ID } from "../config/config.ts";
import { RepositoryResponse } from "../models/RepositoryResponse.ts";

export async function insertNewPrice(
  price: Price,
): Promise<RepositoryResponse> {
  try {
    const result = await client.queryArray(
      "INSERT INTO price VALUES ($1, $2, $3, 'a')",
      price.value,
      price.provider_id,
      price.date,
    );
    console.log(`new ${ID.WHICH(price.provider_id)} price recorded`);
    return new RepositoryResponse("200", true, result.rows, "Éxito agregando");
  } catch (error) {
    console.log(error);
    return new RepositoryResponse("500", false, error, "Internal Server Error");
  }
}

export async function getAllPrices(): Promise<RepositoryResponse> {
  try {
    const result = await client.queryArray(
      "SELECT * FROM price WHERE status='a' ORDER BY price_id DESC LIMIT 20",
    );
    const prices: Price[] = result.rows.map((price: any) => {
      return new Price(price[4], price[0], price[1], price[2], price[3]);
    });
    return new RepositoryResponse("200", true, prices, "Éxito consultando");
  } catch (error) {
    console.log(error);
    return new RepositoryResponse("500", false, error, "Internal Server Error");
  }
}

export async function getLastPetroPrice(): Promise<{ petro: number }> {
  const result_ptr: any = await client.queryObject(
    `SELECT price_value FROM price WHERE provider_id = ${ID.PETRO} AND status='a' ORDER BY price_id DESC LIMIT 1`,
  );
  let valor_ptr: number;
  result_ptr.rows.length !== 0
    ? valor_ptr = parseFloat(result_ptr?.rows[0].price_value)
    : valor_ptr = 0;
  return { petro: valor_ptr };
}

export async function getLastMonitorDolarPrice(): Promise<{ monitor: number }> {
  const result_md: any = await client.queryObject(
    `SELECT price_value FROM price WHERE provider_id = ${ID.MONITORDOLAR} AND status='a' ORDER BY price_id DESC LIMIT 1`,
  );
  let valor_md: number;
  result_md.rows.length !== 0
    ? valor_md = parseFloat(result_md?.rows[0].price_value)
    : valor_md = 0;
  return { monitor: valor_md };
}

export async function getLastPrices(): Promise<
  { dolarToday: number; BCV: number }
> {
  try {
    const result_dt: any = await client.queryObject(
      `SELECT price_value FROM price WHERE provider_id = ${ID.DOLARTODAY} AND status='a' ORDER BY price_id DESC LIMIT 1`,
    );
    let valor_dt: number;
    result_dt.rows.length !== 0
      ? valor_dt = parseFloat(result_dt?.rows[0].price_value)
      : valor_dt = 0;

    const result_bcv: any = await client.queryObject(
      `SELECT price_value FROM price WHERE provider_id = ${ID.BCV} AND status='a' ORDER BY price_id DESC LIMIT 1`,
    );
    let valor_bcv: number;
    result_bcv.rows.length !== 0
      ? valor_bcv = parseFloat(result_bcv?.rows[0].price_value)
      : valor_bcv = 0;

    return { dolarToday: valor_dt, BCV: valor_bcv };
  } catch (error) {
    console.log(error);
  }
  return { dolarToday: -1, BCV: -1 };
}
