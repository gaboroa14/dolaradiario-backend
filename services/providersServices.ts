import {
  getAllProviders,
  getOneProvider,
} from "../repositories/providerRepository.ts";
import { Status } from "https://deno.land/std@0.94.0/http/http_status.ts";

export async function getProviders(ctx: any) {
  const response = await getAllProviders();
  ctx.response.body = response;
  ctx.response.status = response.success
    ? Status.OK
    : Status.InternalServerError;
}

export async function getProvider(ctx: any) {
  const response = await getOneProvider(parseInt(ctx?.params.id));
  ctx.response.body = response;
}
