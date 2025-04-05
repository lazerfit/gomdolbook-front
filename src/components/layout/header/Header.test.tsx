import { fireEvent, screen, waitFor } from "@testing-library/react";
import { expect, describe, vi } from "vitest";
import Header from "./Header.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { customRender } from "@/utils/CustomRender.tsx";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "@/auth/keycloak.ts";
import MyLibraryPage from "@/pages/MyLibraryPage.tsx";
import Collection from "@/pages/MyCollectionPage.tsx";

vi.mock("@react-keycloak/web", async (importOrigianl) => {
  return {
    ...(await importOrigianl<typeof import("@react-keycloak/web")>()),
    useKeycloak: () => ({
      keycloak: {
        authenticated: true,
        token: "__test__-token",
        idToken: "__test__-token",
        login: vi.fn(),
        logout: vi.fn(),
      },
    }),
    ReactKeycloakProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe("Header Component", () => {
  beforeEach(() => {
    customRender(
      <MemoryRouter initialEntries={["/"]}>
        <ReactKeycloakProvider authClient={keycloak}>
          <Routes>
            <Route path="/library/reading" element={<MyLibraryPage />} />
            <Route path="/collections" element={<Collection />} />
            <Route path="/" element={<Header />} />
          </Routes>
        </ReactKeycloakProvider>
      </MemoryRouter>,
    );
  });

  it("렌더링이 된다.", async () => {
    expect(await screen.findByText("gomdolbook")).toBeTruthy();
  });

  it("MyLibraryPage 클릭", async () => {
    const btn = await screen.findByText("Library");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.getByText("읽을 예정")).toBeTruthy();
    });
  });
});
