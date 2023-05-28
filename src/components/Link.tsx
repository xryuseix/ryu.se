import { format } from "date-fns";
import { useUsers } from "@/contexts/UsersContext";
import { LoadingScreen } from "./LoadingScreen";
import { Link as LinkType } from "@/../functions/src/shared/types/link";
import { Timestamp } from "firebase/firestore";
import { useState, ChangeEvent } from "react";
import { Tr, Td, Input, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon, CopyIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { handleCopy } from "@/components/CopyToClipboard";
import { updateLink, deleteLink } from "@/lib/link";
import { Tooltip } from "@chakra-ui/react";

export const Link = ({ link }: { link: LinkType }) => {
  const { loading } = useUsers();
  if (loading) return <LoadingScreen />;

  const toast = useToast();
  const fromDate = (date: Timestamp) =>
    format(date.toDate(), "yyyy-MM-dd HH:mm");

  const [changed, setChanged] = useState<boolean>(false);
  const [from, setFrom] = useState<string>(link.from);
  const [to, setTo] = useState<string>(link.to);
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
    if (!changed) return;
    updateLink(link.id, { from, to, expires, remarks });
    setChanged(false);
  };

  const handleDelete = () => {
    deleteLink(link.id);
  };

  return (
    <Tr>
      <Td p={0}>
        <Input value={fromDate(link.created)} p={0} disabled />
      </Td>
      <Td p={0}>
        <Input
          type="text"
          placeholder={link.from}
          value={from}
          onChange={(event) => {
            handleChange("from", event);
          }}
          p={0}
        />
      </Td>
      <Td p={0}>
        <Input
          type="text"
          placeholder={link.to}
          value={to}
          onChange={(event) => {
            handleChange("to", event);
          }}
          p={0}
        />
      </Td>
      <Td p={0}>
        <Input
          type="datetime-local"
          placeholder={link.expires ? fromDate(link.expires) : ""}
          value={expires ? fromDate(expires) : ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange("expires", event);
          }}
          p={0}
        />
      </Td>
      <Td p={0}>
        <Input value={fromDate(link.modified)} p={0} disabled />
      </Td>
      <Td p={0}>
        <Flex>
          <Spacer />
          <Tooltip label="Copy the redirect URL to the clipboard" fontSize="md">
            <IconButton
              aria-label="copy"
              icon={<CopyIcon />}
              onClick={() => handleCopy(toast, link.to)}
            />
          </Tooltip>
          <Spacer />
          <Tooltip label="Confirm changes" fontSize="md">
            <IconButton
              aria-label="edit"
              icon={<CheckCircleIcon />}
              onClick={handleUpdate}
              isDisabled={!changed}
            />
          </Tooltip>
          <Spacer />
          <Tooltip label="Delete this line" fontSize="md">
            <IconButton
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={handleDelete}
            />
          </Tooltip>
          <Spacer />
        </Flex>
      </Td>
      <Td p={0}>
        <Input
          type="text"
          placeholder={link.remarks ?? ""}
          value={remarks ?? ""}
          onChange={(event) => {
            handleChange("remarks", event);
          }}
          p={0}
        />
      </Td>
    </Tr>
  );
};
