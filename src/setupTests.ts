import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useKeycloak } from '@react-keycloak/web';
import Modal from 'react-modal';

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

vi.mock('react-tooltip');

//Modal
if (document.getElementById('root') === null) {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

Modal.setAppElement('#root');

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;
