import { beforeEach, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "@/test-utils/CustomRender.tsx";
import CalendarMonthly from "../CalendarMonthly.tsx";
import { MemoryRouter } from "react-router-dom";
import * as MR from "@/test-utils/mockServerResponses.ts";
import { server } from "@/test-utils/setupHttp.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/analytics/calendar"]}>
      <CalendarMonthly />
    </MemoryRouter>,
  );
};

describe("render", () => {
  beforeEach(() => {
    MR.MOCK_FINISHED_BOOK_CALENDAR(server);
    render();
  });

  it("calendar 렌더링 된다.", async () => {
    const navBar = await screen.findByTestId("calendar");
    expect(navBar).toBeTruthy();
  });
});
