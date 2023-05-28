import {
  getFirestore,
  collection,
  query,
  orderBy,
  doc,
  setDoc,
  Timestamp,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getConverter, serverTimestamp } from "@/lib/firebase";
import type { LinkDocumentData } from "@/../functions/src/shared/types/link";

const linksRef = () =>
  collection(getFirestore(), "links").withConverter(
    getConverter<LinkDocumentData>()
  );

export const linksQuery = (userId: string | undefined) => {
  return query(
    linksRef(),
    where("userId", "==", userId),
    orderBy("created", "asc")
  );
};

export const addLink = async (
  userId: string,
  from: string,
  to: string,
  expires: Timestamp | null,
  remarks: string | null
) => {
  const linkRef = doc(linksRef());
  const link: LinkDocumentData = {
    created: serverTimestamp(),
    modified: serverTimestamp(),
    userId,
    from,
    to,
    expires: expires ?? null,
    remarks,
  };
  return setDoc(linkRef, link, { merge: true });
};

export const deleteLink = async (linkId: string) => {
  const linkRef = doc(linksRef(), linkId);
  return deleteDoc(linkRef);
};
