import { beforeEach, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { customRender } from "@/test-utils/CustomRender.tsx";
import LibraryStatusNav from "../LibraryStatusNav.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/library/reading"]}>
      <Routes>
        <Route element={<LibraryStatusNav />} path={"/library/reading"} />
        <Route element={<div>to_read_page</div>} path={"/library/to_read"} />
        <Route element={<div>finished_page</div>} path={"/library/finished"} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("render", () => {
  beforeEach(() => {
    render();
  });

  it("library label 렌더링 된다.", async () => {
    const label = await screen.findByText("읽는 중");
    expect(label).toBeTruthy();
  });

  it("library to_read label 클릭 시 페이지 이동한다.", async () => {
    const label = await screen.findByText("읽을 예정");
    expect(label).toBeTruthy();
    fireEvent.click(label);

    expect(await screen.findByText("to_read_page")).toBeTruthy();
  });

  it("library finished label 클릭 시 페이지 이동한다.", async () => {
    const label = await screen.findByText("읽기 완료");
    expect(label).toBeTruthy();
    fireEvent.click(label);

    expect(await screen.findByText("finished_page")).toBeTruthy();
  });
});
