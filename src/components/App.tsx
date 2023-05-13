import { LinkForm } from "./LinkForm";
import { Links } from "./Links";
import { Logs } from "./Logs";

export const App = () => {
  return (
    <div>
      <h1>URL shortener</h1>
      <div>
        <LinkForm />
        <Links />
        <Logs />
      </div>
    </div>
  );
};