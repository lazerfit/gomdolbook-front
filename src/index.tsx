import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/services/config/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import keycloak, { keycloakInitOptions, eventHandler } from "./auth/keycloak.ts";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { setToken } from "@/api/services/config/Interceptor.ts";
import { StrictMode } from "react";

const root = createRoot(document.getElementById("root")!);
root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakInitOptions}
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onEvent={eventHandler}
    onTokens={(tokens) => {
      setToken(tokens.idToken!);
    }}
  >
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </QueryClientProvider>
  </ReactKeycloakProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
void reportWebVitals(console.log);
