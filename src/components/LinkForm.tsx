import { format } from "date-fns";
import { useState, ChangeEvent } from "react";
import { addLink } from "@/lib/link";
import { useAuth } from "@/contexts/AuthContext";
import { Timestamp } from "firebase/firestore";

export const LinkForm = () => {
  const { user } = useAuth();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [expires, setExpires] = useState<Timestamp | null>(null);
  const [remarks, setRemarks] = useState<string | null>(null);

  const handleClick = async () => {
    if (!user || !from || !to) return;

    await addLink(user.uid, from, to, expires, remarks);
    setFrom("");
    setTo("");
    setExpires(null);
    setRemarks(null);
  };

  return (
    <>
      <input
        aria-label="from-input"
        type="text"
        placeholder="ABC"
        value={from}
        required
        onChange={(event) => setFrom(event.currentTarget.value)}
      />
      <input
        aria-label="to-input"
        type="text"
        placeholder="https://example.com"
        value={to}
        required
        onChange={(event) => setTo(event.currentTarget.value)}
      />
      <input
        aria-label="expires-input"
        type="datetime-local"
        value={expires ? format(expires.toDate(), "yyyy-MM-dd HH:mm") : ""}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setExpires(Timestamp.fromDate(new Date(event.target.value)));
        }}
      />
      <input
        aria-label="remarks-input"
        type="text"
        placeholder="remarks"
        value={remarks || ""}
        onChange={(event) => setRemarks(event.currentTarget.value)}
      />
      <button onClick={handleClick} disabled={!from || !to}>
        作成！
      </button>
    </>
  );
};
