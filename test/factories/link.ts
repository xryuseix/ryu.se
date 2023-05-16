import { Factory } from "fishery";
import { Timestamp } from "firebase/firestore";
import { Link } from "@/../functions/src/shared/types/link";

export const linkFactory = Factory.define<Link>(({ sequence }) => ({
  id: sequence.toString(),
  created: Timestamp.fromDate(new Date()),
  modified: Timestamp.fromDate(new Date()),
  userId: "tester",
  from: "/test",
  to: "/example",
  expires: null,
  remarks: "テスト用のリンクです。",
}));
