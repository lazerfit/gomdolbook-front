import { vi } from 'vitest';

let isAuthenticated = true;

export const setAuthenticated = (value: boolean) => {
  isAuthenticated = value;
};

export const useKeycloak = () => ({
  keycloak: {
    authenticated: isAuthenticated,
    login: vi.fn(),
    logout: vi.fn(),
  },
  initialized: true,
});
