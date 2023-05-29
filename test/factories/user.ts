import { Factory } from "fishery";
import { Timestamp } from "firebase/firestore";
import { User } from "@/../functions/src/shared/types/user";

export const userFactory = Factory.define<User>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  name: `テストユーザー${sequence}`,
  email: "abc@example.com",
  shortId: sequence.toString(),
}));
