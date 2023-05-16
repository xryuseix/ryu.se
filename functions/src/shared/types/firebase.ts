import { Timestamp as _Timestamp } from "firebase/firestore";

export type WithId<T> = T & { id: string };
export type Timestamp = _Timestamp;
