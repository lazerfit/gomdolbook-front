import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/services/config/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import keycloak, { keycloakInitOptions } from "./auth/keycloak.ts";
import { ReactKeycloakProvider } from "@react-keycloak/web";

const root = createRoot(document.getElementById("root")!);
root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ReactKeycloakProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
void reportWebVitals(console.log);
