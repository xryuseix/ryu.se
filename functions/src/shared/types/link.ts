import { Timestamp, WithId } from "./firebase";

export type LinkDocumentData = {
  created: Timestamp;
  modified: Timestamp;
  userId: string;
  from: string;
  to: string;
  expires: Timestamp | null;
  remarks: string | null;
};

export type Link = WithId<LinkDocumentData>;
