import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { WalletProvider } from "./contexts/WalletContext.tsx";
import { FriendProvider } from "./contexts/FriendContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <WalletProvider>
          <FriendProvider>
            <App />
          </FriendProvider>
        </WalletProvider>
    </BrowserRouter>
  </StrictMode>
);
