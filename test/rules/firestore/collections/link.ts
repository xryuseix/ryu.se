import {
  assertSucceeds,
  assertFails,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { Timestamp } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getTestEnv, setCollection } from "@/../test/utils";
import { userFactory } from "@/../test/factories/user";
import { linkFactory } from "@/../test/factories/link";

const user = userFactory.build({ id: "user-id" });
const other = userFactory.build({ id: "other-id" });
const users = [user, other];

const userLink = linkFactory.build({
  id: "user-link-id",
  userId: user.id,
});
const otherLink = linkFactory.build({
  id: "other-link-id",
  userId: other.id,
});
const links = [userLink, otherLink];

export const linksTest = () => {
  describe("links", () => {
    let env: RulesTestEnvironment;
    beforeEach(async () => {
      env = getTestEnv();
      await env.withSecurityRulesDisabled(async (context) => {
        const adminDb = context.firestore();
        await setCollection(adminDb.collection("users"), users);
        await setCollection(adminDb.collection("links"), links);
      });
    });
    describe("未認証の場合", () => {
      let db: firebase.firestore.Firestore;
      beforeEach(() => {
        db = env.unauthenticatedContext().firestore();
      });
      it("読み込みできない(get)", async () => {
        const ref = db.collection("links").doc(userLink.id);
        await assertFails(ref.get());
      });
      it("読み込みできない(list)", async () => {
        const ref = db.collection("links");
        await assertFails(ref.get());
      });
      it("作成できない", async () => {
        const newLink = linkFactory.build();
        const ref = db.collection("links");
        await assertFails(ref.add(newLink));
      });
      it("更新できない", async () => {
        const ref = db.collection("links").doc(userLink.id);
        await assertFails(ref.update({ content: "違う内容" }));
      });
      it("削除できない", async () => {
        const ref = db.collection("links").doc(userLink.id);
        await assertFails(ref.delete());
      });
    });
    describe("認証済の場合", () => {
      describe("自分のデータの場合", () => {
        let db: firebase.firestore.Firestore;
        beforeEach(() => {
          db = env.authenticatedContext(user.id).firestore();
        });
        it("読み込みできる", async () => {
          const ref = db.collection("links").doc(userLink.id);
          await assertSucceeds(ref.get());
        });
        it("作成できる", async () => {
          const newLink = linkFactory.build({ userId: user.id });
          const ref = db.collection("links");
          await assertSucceeds(ref.doc(newLink.id).set(newLink));
        });
        it("更新できる", async () => {
          const ref = db.collection("links").doc(userLink.id);
          await assertSucceeds(
            ref.update({
              updatedAt: Timestamp.fromDate(new Date()),
              remark: "更新内容",
            })
          );
        });
        it("削除できる", async () => {
          const ref = db.collection("links").doc(userLink.id);
          await assertSucceeds(ref.delete());
        });
      });
      describe("自分以外のデータの場合", () => {
        let db: firebase.firestore.Firestore;
        beforeEach(() => {
          db = env.authenticatedContext(user.id).firestore();
        });
        it("読み込みできない", async () => {
          const ref = db.collection("links").doc(otherLink.id);
          await assertFails(ref.get());
        });
        it("作成できない", async () => {
          const newLink = linkFactory.build({ userId: other.id });
          const ref = db.collection("links");
          await assertFails(ref.doc(newLink.id).set(newLink));
        });
        it("更新できない", async () => {
          const ref = db.collection("links").doc(otherLink.id);
          await assertFails(
            ref.update({
              updatedAt: Timestamp.fromDate(new Date()),
              remark: "更新内容",
            })
          );
        });
        it("削除できない", async () => {
          const ref = db.collection("links").doc(otherLink.id);
          await assertFails(ref.delete());
        });
      });
    });
  });
};
