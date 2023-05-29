import { db } from "./lib/firebase";

db.settings({ timestampsInSnapshot: true });

export { main } from "./redirect";
