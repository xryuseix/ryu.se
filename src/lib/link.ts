import {
  getFirestore,
  collection,
  query,
  orderBy,
  DocumentReference,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getConverter, serverTimestamp } from "@/lib/firebase";
import type { LinkDocumentData } from "@/types/link";

export const collectionName = "links";

export const linksRef = () =>
  collection(getFirestore(), "links").withConverter(
    getConverter<LinkDocumentData>()
  );

export const linksQuery = () => query(linksRef(), orderBy("created", "asc"));

export const setLink = async (
  ref: DocumentReference,
  link: LinkDocumentData
) => {
  return setDoc(ref, link, { merge: true });
};

export const addLink = async (
  from: string,
  to: string,
  expires: Timestamp | null,
  remarks: string | null
) => {
  const linkRef = doc(linksRef());

  return setLink(linkRef, {
    created: serverTimestamp(),
    modified: serverTimestamp(),
    from,
    to,
    expires: expires ?? null,
    remarks,
  });
};
