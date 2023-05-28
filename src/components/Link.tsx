import { format, set } from "date-fns";
import { useUsers } from "@/contexts/UsersContext";
import { LoadingScreen } from "./LoadingScreen";
import { Link as LinkType } from "@/../functions/src/shared/types/link";
import { Timestamp } from "firebase/firestore";
import { useState, ChangeEvent } from "react";

export const Link = ({ link }: { link: LinkType }) => {
  const { usersById, loading } = useUsers();
  if (loading) return <LoadingScreen />;

  const user = usersById[link.id];
  const fromDate = (date: Timestamp) =>
    format(date.toDate(), "yyyy-MM-dd HH:mm");

  const [changed, setChanged] = useState<boolean>(false);
  const [from, setFrom] = useState<string>(link.from);
  const [to, setTo] = useState<string>(link.to);
  const [modified, setModified] = useState<Timestamp>(link.modified);
  const [expires, setExpires] = useState<Timestamp | null>(link.expires);
  const [remarks, setRemarks] = useState<string | null>(link.remarks);

  const handleChange = (
    type: "from" | "to" | "expires" | "remarks",
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    switch (type) {
      case "from":
        setChanged(link.from !== value);
        setFrom(value);
        break;
      case "to":
        setChanged(link.to !== value);
        setTo(value);
        break;
      case "expires":
        setChanged(link.expires !== Timestamp.fromDate(new Date(value)));
        setExpires(Timestamp.fromDate(new Date(value)));
        break;
      case "remarks":
        setChanged(link.remarks !== value);
        setRemarks(value);
        break;
      default:
        throw new Error(type satisfies never);
    }
  };

  const handleUpdate = () => {
    setModified(Timestamp.now());
    alert("TODO: implement");
  };

  return (
    <tr>
      <td>
        <input value={fromDate(link.created)} disabled />
      </td>
      <td>
        <input
          type="text"
          placeholder={link.from}
          value={from}
          onChange={(event) => {
            handleChange("from", event);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder={link.to}
          value={to}
          onChange={(event) => {
            handleChange("to", event);
          }}
        />
      </td>
      <td>
        <input value={fromDate(link.modified)} disabled />
      </td>
      <td>
        <input
          type="datetime-local"
          placeholder={link.expires ? fromDate(link.expires) : ""}
          value={expires ? fromDate(expires) : ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange("expires", event);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder={link.remarks ?? ""}
          value={remarks ?? ""}
          onChange={(event) => {
            handleChange("remarks", event);
          }}
        />
      </td>
      <td>
        <button onClick={handleUpdate} disabled={!changed}>
          更新
        </button>
        <button onClick={handleUpdate} disabled={!changed}>
          削除
        </button>
      </td>
    </tr>
  );
};
