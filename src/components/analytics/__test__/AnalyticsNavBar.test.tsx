import { beforeEach, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "@/test-utils/CustomRender.tsx";
import AnalyticsNavBar from "../AnalyticsNavBar.tsx";
import { MemoryRouter } from "react-router-dom";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/analytics/calendar"]}>
      <AnalyticsNavBar />
    </MemoryRouter>,
  );
};

describe("render", () => {
  beforeEach(() => {
    render();
  });

  it("navBar 렌더링 된다.", async () => {
    const navBar = await screen.findByTestId("status-tap-navigation");
    expect(navBar).toBeTruthy();
  });
});
