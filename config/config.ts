export const DOLAR_TODAY_API: string =
  "https://s3.amazonaws.com/dolartoday/data.json";
export const PETRO_API: string = "https://petroapp-price.petro.gob.ve/price/";
export const AIRTM_API: string = "https://rates.airtm.io/amount/VES/BANK/";

export const ID = {
  DOLARTODAY: 1,
  MONITORDOLAR: 2,
  BCV: 3,
  PETRO: 4,
  PROMEDIO: 5,
  AIRTM: 6,
  WHICH: (n: number) => {
    switch (n) {
      case 1:
        return "DolarToday";

      case 2:
        return "MonitorDolar";

      case 3:
        return "BCV";

      case 4:
        return "Petro";

      case 6:
        return "AirTM";
    }
  },
};
