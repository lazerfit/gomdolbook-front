import { beforeEach, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { customRender } from "@/test-utils/CustomRender.tsx";
import NotFoundPage from "../NotFoundPage.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/test"]}>
      <Routes>
        <Route element={<div>index 페이지 입니다.</div>} path={"/"} />
        <Route element={<NotFoundPage />} path={"*"} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("render", () => {
  beforeEach(() => {
    render();
  });

  it("back 버튼이 렌더링 되고 Back 버튼 클릭시 index 페이지로 이동한다.", async () => {
    const button = await screen.findByText("Back");
    expect(button).toBeTruthy();

    fireEvent.click(button);

    expect(await screen.findByText("index 페이지 입니다.")).toBeTruthy();
  });
});
