import { db, CollectionReference, Query } from "./firebase";
import { LinkDocumentData } from "../shared/types/link";

const linksRef = db.collection(
  "links"
) as CollectionReference<LinkDocumentData>;

export const linksQuery = (
  userId: string,
  linkId: string
): Query<LinkDocumentData> =>
  linksRef.where("userId", "==", userId).where("from", "==", linkId);
