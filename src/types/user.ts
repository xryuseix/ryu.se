import { Timestamp, WithId } from "@/lib/firebase";

export type UserDocumentData = {
  createdAt: Timestamp;
  name: string | null;
  email: string | null;
};
export type User = WithId<UserDocumentData>;
