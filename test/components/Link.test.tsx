import { render, cleanup, screen, waitFor } from "@testing-library/react";
import { userFactory } from "@/../test/factories/user";
import { linkFactory } from "@/../test/factories/link";
import { Timestamp } from "firebase/firestore";

const sender = userFactory.build({
  id: "user-id",
  name: "テストユーザー",
  email: "abc@example.com",
});
vi.mock("@/context/UsersContext", () => {
  return {
    useUsers: { usersById: { "user-id": [sender] } },
  };
});
afterEach(() => cleanup());

describe("Link", async () => {
  const { Link } = await import("@/components/Link");

  const link = linkFactory.build({
    id: "example_id",
    created: Timestamp.fromDate(new Date("2022-07-01 11:11:11+09:00")),
    modified: Timestamp.fromDate(new Date("2022-07-02 22:22:22+09:00")),
    from: "abc",
    to: "example.com",
    expires: Timestamp.fromDate(new Date("2022-07-03 03:33:33+09:00")),
    remarks: "example_remarks",
  });

  it("loading中はloadingメッセージが表示される", () => {
    render(<Link link={link} />);
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("作成日が表示される", () => {
    render(<Link link={link} />);
    waitFor(() => expect(screen.getByText("2022-07-01 11:11")).toBeTruthy(), {
      timeout: 5000,
    });
  });

  it("転送元URLが表示される", () => {
    render(<Link link={link} />);
    waitFor(() => expect(screen.getByText("abc")).toBeTruthy(), {
      timeout: 5000,
    });
  });

  it("転送先URLが表示される", () => {
    render(<Link link={link} />);
    waitFor(() => expect(screen.getByText("2example.com")).toBeTruthy(), {
      timeout: 5000,
    });
  });

  it("変更日が表示される", () => {
    render(<Link link={link} />);
    waitFor(() => expect(screen.getByText("2022-07-02 22:22")).toBeTruthy(), {
      timeout: 5000,
    });
  });

  it("有効期限が表示される", () => {
    render(<Link link={link} />);
    waitFor(() => expect(screen.getByText("2022-07-03 03:33")).toBeTruthy(), {
      timeout: 5000,
    });
  });

  it("備考が表示される", () => {
    render(<Link link={link} />);
    waitFor(() => expect(screen.getByText("example_remarks")).toBeTruthy(), {
      timeout: 5000,
    });
  });
});
