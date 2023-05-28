import { useCollectionData } from "@/hooks/useCollectionData";
import { linksQuery } from "@/lib/link";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Link } from "@/components/Link";
import { useAuth } from "@/contexts/AuthContext";

export const Links = () => {
  const { user } = useAuth();
  const [links, loading] = useCollectionData(linksQuery(user?.uid));

  if (loading) return <LoadingScreen />;

  return (
    <div id="links" className="links">
      <table>
        <thead>
          <tr>
            <th>作成日</th>
            <th>送信元URL</th>
            <th>送信先URL</th>
            <th>変更日</th>
            <th>有効期限</th>
            <th>備考</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links?.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
