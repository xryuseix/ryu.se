import { Timestamp, WithId } from "@/lib/firebase";

export type LinkDocumentData = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  to: string;
  expiresAt: Timestamp | null;
  private: boolean;
  remarks: string | null;
};

export type Link = WithId<LinkDocumentData>;
