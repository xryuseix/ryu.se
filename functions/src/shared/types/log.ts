import { WithId } from "./firebase";

export type AccessLogDocumentData = {
  accessedAt: Date;
  userId: string | null;
  from: string;
  to: string | null;
  referer: string | undefined;
  userAgent: string | undefined;
  ip: string | undefined;
};

export type AccessLog = WithId<AccessLogDocumentData>;
