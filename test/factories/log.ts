import { Factory } from "fishery";
import { Timestamp } from "firebase/firestore";
import { AccessLog } from "@/../functions/src/shared/types/log";

export const logFactory = Factory.define<AccessLog>(({ sequence }) => ({
  id: sequence.toString(),
  accessedAt: Timestamp.fromDate(new Date()),
  userId: "",
  from: "not_found_path",
  to: null,
  referer: "example.com",
  userAgent: "Mozilla/5.0",
  ip: "127.0.0.1",
}));
