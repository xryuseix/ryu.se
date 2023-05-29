import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getConverter, serverTimestamp } from "@/lib/firebase";
import type { UserDocumentData } from "@/../functions/src/shared/types/user";

export const usersRef = () =>
  collection(getFirestore(), "users").withConverter(
    getConverter<UserDocumentData>()
  );

export const getUser = async (uid: string) => {
  const snapshot = await getDoc(doc(usersRef(), uid));
  const isExist = snapshot.exists();
  const user = snapshot.data();
  return { isExist, user };
};

const isExistShortId = async (shortId: string) => {
  const shortIdQuery = query(usersRef(), where("shortId", "==", shortId));
  const snapshot = await getDocs(shortIdQuery);
  snapshot.forEach((_doc) => {
    return true;
  });
  return false;
};

export const addUser = async ({
  uid,
  displayName,
  email,
}: {
  uid: string;
  displayName: string | null;
  email: string | null;
}) => {
  for (let i = 1; i <= uid.length; i++) {
    const shortId = uid.slice(0, i);
    const isExist = await isExistShortId(shortId);
    if (!isExist) {
      const user = {
        createdAt: serverTimestamp(),
        name: displayName,
        email: email,
        shortId: shortId,
      };
      await setDoc(doc(usersRef(), uid), user);
      return true;
    }
  }
  return false;
};
