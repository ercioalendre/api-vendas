import app from "./app";

const listenPort = process.env.APP_SERVER_PORT || 3000;

const appName = process.env.APP_NAME || "api-vendas";

app.listen(listenPort, () => {
  console.log(`[${appName}] Server is running on port ${listenPort}!`);
});
