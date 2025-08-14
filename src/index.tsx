import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/services/config/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import keycloak, { keycloakInitOptions, eventHandler } from './auth/keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { setToken } from '@/api/services/config/Interceptor';
import { StrictMode } from 'react';
import './styles/globals.css';
import Theme from '@/styles/theme';

const root = createRoot(document.getElementById('root')!);
root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakInitOptions}
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onEvent={eventHandler}
    onTokens={tokens => {
      setToken(tokens.idToken!);
    }}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StrictMode>
        <Theme>
          <App />
        </Theme>
      </StrictMode>
    </QueryClientProvider>
  </ReactKeycloakProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
void reportWebVitals(console.log);
