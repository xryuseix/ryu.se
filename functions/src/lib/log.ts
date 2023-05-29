import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v2";
import { AccessLogDocumentData } from "../shared/types/log";

const logsCollentionRef = admin.firestore().collection("logs");

export const addLog = async (
  request: functions.https.Request,
  userId: string | null,
  from: string,
  to: string | null
) => {
  const clientIp = request.headers["fastly-client-ip"] ?? "";
  const log: AccessLogDocumentData = {
    accessedAt: new Date(),
    userId: userId,
    from: from,
    to: to,
    // TODO: fix
    referer: request.headers["referer"] ?? "",
    userAgent: request.headers["user-agent"],
    // TODO: fix
    ip: typeof clientIp === "string" ? clientIp : clientIp.join(" | "),
  };
  await logsCollentionRef.add(log);
};
