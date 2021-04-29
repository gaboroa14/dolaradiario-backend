import { Router } from "https://deno.land/x/oak/mod.ts";
import { getProviders, getProvider } from "../controllers/providers.ts";
import { getPrices, insertPrices } from "../controllers/prices.ts";
import { getIndex } from "../controllers/main.ts";

const router: Router = new Router();

router
  .get("/providers", getProviders)
  .get("/providers/:id", getProvider)
  .get("/prices", getPrices)
  .get("/main", getIndex)
  .post("/prices", insertPrices)
  .get("/", (ctx) => {
    ctx.response.body = "¿Qué se te perdió, cachorro? Si quieres ver el precio del dólar entra a https://dolaradiar.io jiji"
  });

export default router;
