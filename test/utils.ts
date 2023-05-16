import {
  initializeTestEnvironment as _initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { readFileSync } from "fs";
import firebase from "firebase/compat/app";
import { getConverter } from "@/lib/firebase";
import { WithId } from "@/../functions/src/shared/types/firebase";
import { DocumentData } from "firebase/firestore";

let testEnv: RulesTestEnvironment;
export const initializeTestEnvironment = async (projectId?: string) => {
  process.env.VITE_EMULATORS = "true";
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  testEnv = await _initializeTestEnvironment({
    projectId: projectId ?? "ryu-se-test",
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
    },
    hub: {
      host: "127.0.0.1",
      port: 4400,
    },
  });
};
export const getTestEnv = () => testEnv;
export const setCollection = <T extends DocumentData>(
  ref: firebase.firestore.CollectionReference,
  instances: WithId<T>[]
) =>
  Promise.all(
    instances.map((_) => ref.doc(_.id).set(getConverter<T>().toFirestore(_)))
  );
