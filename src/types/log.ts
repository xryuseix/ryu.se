import { Timestamp, WithId } from '@/lib/firebase';

export type AccessLogDocumentData = {
  accessedAt: Timestamp;
  path: string;
  found: boolean;
  referer: string | null;
  userAgent: string | null;
  ip: string | null;
};

export type AccessLog = WithId<AccessLogDocumentData>;