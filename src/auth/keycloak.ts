import Keycloak, { KeycloakConfig } from 'keycloak-js';
import { setToken } from '@/api/services/config/Interceptor';
import type { AuthClientEvent } from '@react-keycloak/core';

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
const homepageUrl = import.meta.env.VITE_BASE_URL;

const keycloakConfig: KeycloakConfig = {
  url: keycloakUrl,
  realm: 'gomdolbook',
  clientId: 'gomdolbook',
};

const keycloak = new Keycloak(keycloakConfig);

export const keycloakInitOptions = {
  onLoad: 'check-sso',
};

export const eventHandler = async (event: AuthClientEvent) => {
  switch (event) {
    case 'onTokenExpired':
      if (!keycloak.authenticated) {
        await keycloak.logout({ redirectUri: homepageUrl });
      }
      try {
        const refreshed = await keycloak.updateToken(-1);
        if (refreshed) {
          setToken(keycloak.idToken!);
        } else {
          await keycloak.logout({ redirectUri: homepageUrl });
        }
      } catch (error) {
        console.log('토큰 갱신 실패', error);
        await keycloak.logout({ redirectUri: homepageUrl });
      }
      break;
    default:
      break;
  }
};

export default keycloak;
