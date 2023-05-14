import { Timestamp, WithId } from "@/lib/firebase";

export type LinkDocumentData = {
  created: Timestamp;
  modified: Timestamp;
  from: string;
  to: string;
  expires: Timestamp | null;
  remarks: string | null;
};

export type Link = WithId<LinkDocumentData>;
