import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useKeycloak } from '@react-keycloak/web';

type UseKeycloakResult = ReturnType<typeof useKeycloak>;

export const mockNavigate = vi.fn();
export const mockUseKeycloak = vi.fn<() => UseKeycloakResult>();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => mockUseKeycloak(),
}));
