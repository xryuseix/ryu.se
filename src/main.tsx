import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { AuthProvider } from "./contexts/AuthContext";
import { UsersProvider } from "./contexts/UsersContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@/lib/firebase";

const colors = {
  styles: {
    global: {
      body: {
        backgroundColor: "#F6F7F9",
      },
    },
  },
};

const theme = extendTheme(colors);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);
