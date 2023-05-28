import { useCollectionData } from "@/hooks/useCollectionData";
import { linksQuery } from "@/lib/link";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Link } from "@/components/Link";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

export const Links = () => {
  const { user } = useAuth();
  const [links, loading] = useCollectionData(linksQuery(user?.uid));

  if (loading) return <LoadingScreen />;

  return (
    <Box bg={"#FFFFFF"} shadow="md" rounded="md" p={4}>
      <Table
        variant="simple"
        overflowX="scroll"
        whiteSpace="nowrap"
        display="block"
      >
        <Thead>
          <Tr>
            <Th minW={150}>Created</Th>
            <Th minW={100}>From</Th>
            <Th minW={200}>To</Th>
            <Th minW={150}>Updated</Th>
            <Th minW={150}>Expires</Th>
            <Th minW={100}>Actions</Th>
            <Th minW={100}>Remark</Th>
          </Tr>
        </Thead>
        <Tbody>
          {links?.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
