import { DOLAR_TODAY_API, ID, PETRO_API } from "../config/config.ts";
import {
  getLastMonitorDolarPrice,
  getLastPetroPrice,
  getLastPrices,
  insertNewPrice,
} from "../repositories/pricesRepository.ts";
import Price from "../models/Price.ts";
import SimpleTwitter from "https://deno.land/x/simple_twitter_deno@0.05/simple_twitter_deno.ts";
import "https://deno.land/x/dotenv/load.ts";

const simple_twitter = new SimpleTwitter(
  JSON.parse(Deno.env.toObject().TWITTER),
);

const params = {
  q: "from:monitordolarvla",
};

const fetchAPI = () => {
  console.log(
    `${new Date()} | checking for new DolarToday, BCV, MonitorDolar and Petro prices...`,
  );
  let precio: string = "";
  try {
    const dt: Promise<Response> = fetch(DOLAR_TODAY_API);
    dt.then((response) => {
      return response.json();
    }).then(async (data) => {
      const old_prices = await getLastPrices();
      const dolarTodayNew: number = parseFloat(data?.USD.transferencia);
      const BCVNew: number = parseFloat(data?.USD.promedio_real);
      old_prices.dolarToday !== dolarTodayNew
        ? await insertNewPrice(
          new Price(
            0,
            parseFloat(data?.USD.transferencia),
            ID.DOLARTODAY,
            new Date(),
            "a",
          ),
        )
        : console.log("DolarToday is up to date");
      old_prices.BCV !== BCVNew
        ? await insertNewPrice(
          new Price(
            0,
            parseFloat(data?.USD.promedio_real),
            ID.BCV,
            new Date(),
            "a",
          ),
        )
        : console.log("BCV is up to date");
    });
  } catch (error) {
    console.log(`error fetching BCV and DolarToday data: ${error}`);
  }

  // try {
  //   const ptr: Promise<Response> = fetch(PETRO_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ coins: ["PTR"], fiats: ["USD", "BS"] }),
  //   });

  //   ptr.then((response) => {
  //     return response.json();
  //   }).then(async (data) => {
  //     const valor: any = data.data.PTR;
  //     const p: number = Math.round((valor?.BS / valor?.USD) * 100) / 100;
  //     const old_petro = await getLastPetroPrice();
  //     old_petro.petro !== p
  //       ? await insertNewPrice(
  //         new Price(
  //           0,
  //           p,
  //           ID.PETRO,
  //           new Date(),
  //           "a",
  //         ),
  //       )
  //       : console.log("Petro is up to date");
  //   });
  // } catch (error) {
  //   console.log(`error fetching Petro data: ${error}`);
  // }

  try {
    simple_twitter.get("search/tweets", params, async function (
      error: any,
      tweets: any,
      response: any,
    ) {
      if (!error) {
        const fetchedTweets: any[] = tweets.statuses;
        let encontrado: boolean = false;
        let indice: number = 0;
        let precioFloat: number = 0;
        while (!encontrado && indice < fetchedTweets.length) {
          const texto: string = fetchedTweets[indice].text;
          const posicionBs: number = texto.indexOf("Bs.");
          if (posicionBs !== -1) {
            const precio = texto.substr(
              posicionBs + 4,
              texto.indexOf("\n") - 2,
            );
            const precioSinPuntos = precio.replaceAll(".", "").replaceAll(
              ",",
              ".",
            );
            precioFloat = parseFloat(precioSinPuntos);
            encontrado = true;
          }
          indice++;
        }
        const old_md = await getLastMonitorDolarPrice();
        old_md.monitor !== precioFloat
          ? await insertNewPrice(
            new Price(
              0,
              precioFloat,
              ID.MONITORDOLAR,
              new Date(),
              "a",
            ),
          )
          : console.log("MonitorDolar is up to date");
      }
    });
  } catch (error) {
    console.log(`error fetchin MonitorDolar price: ${error}`);
  }

  const ahorita: Date = new Date();
  console.log(ahorita.getHours())
  if (ahorita.getHours() < 22) {
    const time: number = new Date(
      ahorita.getFullYear(),
      ahorita.getMonth(),
      ahorita.getDate(),
      (ahorita.getMinutes() >= 35)
        ? ahorita.getHours() + 1
        : ahorita.getHours(),
      (ahorita.getMinutes() >= 35) ? 5 : 35,
      ahorita.getSeconds(),
      ahorita.getMilliseconds(),
    ).getTime() - ahorita.getTime();
    console.log(
      `finished fetching, sleeping for ${Math.round(time / 60000)} min...`,
    );
    setTimeout(fetchAPI, time);
  } else {
    console.log('its 10 pm, going to sleep for 9 hours...\nsee you at 7 am!');
    setTimeout(fetchAPI,32400000)
  }
};

export { fetchAPI };
