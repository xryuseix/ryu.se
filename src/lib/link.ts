import {
  getFirestore,
  collection,
  query,
  orderBy,
  DocumentReference,
  doc,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { getConverter, serverTimestamp } from "@/lib/firebase";
import type { LinkDocumentData } from "@/../functions/src/shared/types/link";

const linksRef = () =>
  collection(getFirestore(), "links").withConverter(
    getConverter<LinkDocumentData>()
  );

export const linksQuery = (userId: string | undefined) => {
  return query(linksRef(), where("userId", "==", userId), orderBy("created", "asc"));
}

export const setLink = async (
  ref: DocumentReference,
  link: LinkDocumentData
) => {
  return setDoc(ref, link, { merge: true });
};

export const addLink = async (
  userId: string,
  from: string,
  to: string,
  expires: Timestamp | null,
  remarks: string | null
) => {
  const linkRef = doc(linksRef());

  return setLink(linkRef, {
    created: serverTimestamp(),
    modified: serverTimestamp(),
    userId,
    from,
    to,
    expires: expires ?? null,
    remarks,
  });
};
