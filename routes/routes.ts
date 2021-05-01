import { Router } from "https://deno.land/x/oak/mod.ts";
import { getProviders, getProvider } from "../services/providersServices.ts";
import { getPrices } from "../services/pricesServices.ts";
import { getIndex, getHistory } from "../services/mainServices.ts";

const router: Router = new Router();

router
  .get("/providers", getProviders)
  .get("/providers/:id", getProvider)
  .get("/prices", getPrices)
  .get("/main", getIndex)
  .get("/history", getHistory)
  .get("/", (ctx) => {
    ctx.response.body = "¿Qué se te perdió, cachorro? Si quieres ver el precio del dólar entra a https://dolaradiar.io jiji"
  });

export default router;
