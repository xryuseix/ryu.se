import { initializeTestEnvironment, getTestEnv } from "@/../test/utils";
import { usersTest } from "@/../test/rules/firestore/collections/user";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

describe("firestore.rules", () => {
  beforeAll(async () => {
    await initializeTestEnvironment("ryu-se-test");
  });
  afterAll(async () => {
    await getTestEnv().cleanup();
  });
  afterEach(async () => {
    await getTestEnv().clearFirestore();
  });
  usersTest();
  // TODO
});
