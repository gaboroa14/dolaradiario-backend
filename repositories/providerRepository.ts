import Provider from "../models/Provider.ts";
import { RepositoryResponse } from "../models/RepositoryResponse.ts";
import client from "../config/database.ts";

export async function getAllProviders(): Promise<RepositoryResponse> {
  try {
    const result = await client.queryArray(
      "SELECT * FROM provider WHERE status='a' ORDER BY id",
    );
    const providers: Provider[] = result.rows.map((provider: any) => {
      return new Provider(
        provider[0],
        provider[1],
        provider[2],
        provider[3],
        provider[4],
      );
    });
    return new RepositoryResponse("200", true, providers, "Éxito consultando");
  } catch (error) {
    console.log(error);
    return new RepositoryResponse("500", false, error, "Internal Server Error");
  }
}

export async function getOneProvider(id: number): Promise<RepositoryResponse> {
  try {
    const result = await client.queryObject(
      "SELECT * FROM provider WHERE id=$1 AND status='a'",
      id,
    );
    const provider: any = result.rows;
    return new RepositoryResponse(
      "200",
      true,
      new Provider(
        provider[0],
        provider[1],
        provider[2],
        provider[3],
        provider[4],
      ),
      "Éxito consultando",
    );
  } catch (error) {
    console.log(error);
    return new RepositoryResponse("500", false, error, "Internal Server Error");
  }
}
