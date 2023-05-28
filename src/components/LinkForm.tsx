import { format } from "date-fns";
import { useState, ChangeEvent } from "react";
import { addLink } from "@/lib/link";
import { useAuth } from "@/contexts/AuthContext";
import { Timestamp } from "firebase/firestore";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { LoginScreen } from "./LoginScreen";

type focusT = {
  from: boolean;
  to: boolean;
  expires: boolean;
};

export const LinkForm = () => {
  const { user } = useAuth();
  if (!user) return <LoginScreen />;

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("https://");
  const [expires, setExpires] = useState<Timestamp | null>(null);
  const [remarks, setRemarks] = useState<string | null>(null);
  const [focus, setFocus] = useState<focusT>({
    from: false,
    to: false,
    expires: false,
  });

  const error = {
    from: {
      condition: () => focus.from && !from.match(/^[a-zA-Z0-9_.@#!=]+$/),
      message:
        "送信元URLは1文字以上で、半角英数字と記号「.@#!=_」のみ使用できます。",
    },
    to: {
      condition: () => {
        if (!focus.to) return false;
        try {
          new URL(to);
          return false;
        } catch (err) {
          return true;
        }
      },
      message: "送信先URLが不正です。",
    },
    expires: {
      condition: () =>
        focus.expires && expires !== null && expires.toDate() < new Date(),
      message: "有効期限が過去の日付です。",
    },
  };

  const handleClick = async () => {
    if (
      error.from.condition() ||
      error.to.condition() ||
      error.expires.condition()
    ) {
      return;
    }
    await addLink(user.uid, from, to, expires, remarks);
    setFrom("");
    setTo("https://");
    setExpires(null);
    setRemarks(null);
    setFocus({ from: false, to: false, expires: false });
  };

  return (
    <Box bg={"#FFFFFF"} shadow="md" rounded="md" p={4}>
      <FormControl isInvalid={error.from.condition()} isRequired>
        <FormLabel htmlFor="from-input">From</FormLabel>
        <Input
          type="text"
          placeholder="ABC"
          value={from}
          onChange={(event) => {
            setFocus({ ...focus, from: true });
            setFrom(event.target.value);
          }}
        />
        {error.from.condition() && (
          <FormErrorMessage>{error.from.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl mt={2} isInvalid={error.to.condition()} isRequired>
        <FormLabel htmlFor="to-input">To</FormLabel>
        <Input
          type="text"
          placeholder="https://example.com"
          value={to}
          onChange={(event) => {
            setFocus({ ...focus, to: true });
            setTo(event.currentTarget.value);
          }}
        />
        {error.to.condition() && (
          <FormErrorMessage>{error.to.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl mt={2} isInvalid={error.expires.condition()}>
        <FormLabel htmlFor="expires-input">Expires</FormLabel>
        <Input
          type="datetime-local"
          value={expires ? format(expires.toDate(), "yyyy-MM-dd HH:mm") : ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFocus({ ...focus, expires: true });
            setExpires(Timestamp.fromDate(new Date(event.target.value)));
          }}
        />
        {error.expires.condition() && (
          <FormErrorMessage>{error.expires.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl mt={2}>
        <FormLabel htmlFor="remarks-input">Remarks</FormLabel>
        <Input
          type="text"
          placeholder="remarks"
          value={remarks || ""}
          onChange={(event) => setRemarks(event.currentTarget.value)}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        variant="outline"
        mt={4}
        onClick={handleClick}
        isDisabled={!from || !to}
      >
        Create!
      </Button>

      <Box mt={6}>
        <code>{`https://ryuse.dev/${from} -> ${to}`}</code>
      </Box>
    </Box>
  );
};
