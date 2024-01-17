import * as functions from "firebase-functions/v2";
import { UserDocumentData } from "./shared/types/user";
import { LinkDocumentData } from "./shared/types/link";
import { CollectionReference, db, getCollectionData } from "./lib/firebase";
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
      response.redirect("https://l.ryuse.dev");
      return;
    }

    // https://l.ryuse.dev/:uId/:lId
    const shortId = path.dirname(request.path).replaceAll("/", "");
    let uId: string | undefined = undefined;
    const lId = path.basename(request.path);
    if (shortId !== "") {
      const usersQuery = (
        db.collection("users") as CollectionReference<UserDocumentData>
      ).where("shortId", "==", shortId);
      const users = await getCollectionData<UserDocumentData>(usersQuery);

      if (users.length == 0) {
        response.status(404);
        response.send(`user ${shortId} is not found.`);
        addLog(request, null, lId, null);
        return;
      }
      uId = users[0].id;
    } else {
      uId = process.env.ADMIN_GOOGLE_USER_ID ?? "";
    }

    const links = await getCollectionData<LinkDocumentData>(
      linksQuery(uId, lId)
    );
    if (!links || links.length == 0) {
      response.status(404);
      response.send(`link ${lId} is not found`);
      addLog(request, uId, lId, null);
      return;
    }

    const link: LinkDocumentData = links[0];
    if (link.expires && link.expires.toMillis() < Date.now()) {
      response.status(410);
      response.send(`link ${lId} is expired`);
      addLog(request, uId, lId, null);
      return;
    }

    const to = link.to;
    response.status(307);
    response.redirect(to);
    addLog(request, uId, lId, to);
  }
);
