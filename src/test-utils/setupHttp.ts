import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { cleanup } from '@testing-library/react';
import { handlers } from '@/test-utils';

export const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
  server.use(...handlers);
});
afterEach(() => {
  cleanup();
});
afterAll(() => {
  server.close();
});
