// import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions/v2";
import { UserDocumentData } from "./shared/types/user";
import { LinkDocumentData } from "./shared/types/link";
import { getCollectionData, getDocumentData } from "./lib/firebase";
import { userRef } from "./lib/user";
import { linksQuery } from "./lib/link";
import path from "path";
import { addLog } from "./lib/log";

export const main = functions.https.onRequest(
  {
    region: "asia-northeast1",
    memory: "512MiB",
    timeoutSeconds: 15,
    maxInstances: 10,
  },
  async (request: functions.https.Request, response) => {
    if (request.path == "/") {
      response.status(301);
      response.redirect("https://ryuse.dev");
      return;
    }

    // https://ryuse.dev/:uId/:lId
    const _uId = path.dirname(request.path).replaceAll("/", "");
    // fix: admin以外のuseridを短くする
    // TODO: userIDの存在チェック
    // expires check
    const uId = _uId === "" ? process.env.ADMIN_GOOGLE_USER_ID ?? "" : _uId;
    const lId = path.basename(request.path);

    const user = await getDocumentData<UserDocumentData>(userRef(uId));

    // get link document data with linkQuery
    const links = await getCollectionData<LinkDocumentData>(
      linksQuery(user.id, lId)
    );

    if (!links || links.length == 0) {
      response.send(`link ${lId} is not found`);
      response.status(404);
      addLog(request, uId, lId, null);
    }
    const link:LinkDocumentData = links[0];

    if(link.expires && link.expires.toMillis() < Date.now()){
      response.send(`link ${lId} is expired`);
      response.status(410);
      addLog(request, uId, lId, null);
    }

    const to = link.to;
    response.status(307);
    response.redirect(to);
    addLog(request, uId, lId, to);
  }
);
