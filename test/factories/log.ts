import { Factory } from "fishery";
import { Timestamp } from "firebase/firestore";
import { AccessLog } from "@/types/log";

export const logFactory = Factory.define<AccessLog>(({ sequence }) => ({
  accessedAt: Timestamp.fromDate(new Date()),
  id: sequence.toString(),
  path: "not_found_path",
  found: false,
  referer: "example.com",
  userAgent: "Mozilla/5.0",
  ip: "127.0.0.1"
}));
