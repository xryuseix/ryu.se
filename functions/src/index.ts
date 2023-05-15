import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions/v2";

export const main = functions.https.onRequest(
  {
    region: "asia-northeast1",
    memory: "512MiB",
    timeoutSeconds: 15,
    maxInstances: 10,
  },
  (request: functions.https.Request, response) => {
    logger.info(`request: ${request}`, { structuredData: true });
    if (request.path == "/") {
      response.redirect("ryuse.dev");
    } else {
      // TODO: ref database
      response.redirect(`https://example.com${request.path}`);
    }
  }
);
