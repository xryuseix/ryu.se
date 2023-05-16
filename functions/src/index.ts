import * as admin from "firebase-admin";

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshot: true });

export { main } from "./redirect";
