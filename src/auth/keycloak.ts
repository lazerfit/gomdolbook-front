import Keycloak, { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:8081",
  realm: "gomdolbook",
  clientId: "gomdolbook",
};

const keycloak = new Keycloak(keycloakConfig);

export const keycloakInitOptions = {
  onLoad: "check-sso",
};

export default keycloak;
