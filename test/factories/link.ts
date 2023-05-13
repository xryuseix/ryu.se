import { Factory } from "fishery";
import { Timestamp } from "firebase/firestore";
import { Link } from "@/types/link";

export const linkFactory = Factory.define<Link>(({ sequence }) => ({
  createdAt: Timestamp.fromDate(new Date()),
  id: sequence.toString(),
  to: "/example",
  expiresAt: null,
  private: false,
  remarks: "テスト用のリンクです。",
}));
