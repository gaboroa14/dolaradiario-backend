# dolaradiario-backend

Backend for the backend server of Dolar a Diario, a platform to check for the current Venezuelan price as reported by three different sources: DolarToday, BCV and MonitorDolar. Allows also for Petro integration but it's disabled by default.

## How to run

Make sure you config a PostgreSQL Database in config/database.ts. Also, configure a valid Twitter Developer API credentials object in fetch/apiFetching.ts. Then, run as follow:

`deno run --allow-net --allow-read --allow-env --unstable index.ts`

## How it works

Every 30 minutes, at xx:05 or xx:35, it'll contact the DolarToday API and Twitter API to check for price changes in DolarToday, BCV and MonitorDolar prices. If found, it'll store them in a local database. If found and it's already recorded in the database, then it won't record it.

Server offers two main endpoints:

>/main sends you an object with the most recent prices by providers and a list of all providers.<br>
>/history sends you an object list with all the prices recorded in the last 30 days.

Both of them work as GET requests.
