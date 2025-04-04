import { fireEvent, screen } from "@testing-library/react";
import { customRender, beforeEach, expect, it, describe } from "@/utils/CustomRender.tsx";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MyLibrary from "../MyLibrary.tsx";

describe("rendering __test__", () => {
  beforeEach(() => {
    customRender(
      <MemoryRouter initialEntries={["/library/reading"]}>
        <Routes>
          <Route path="/library/to_read" element={<MyLibrary />} />
          <Route path="/library/finished" element={<MyLibrary />} />
          <Route path="/library/reading" element={<MyLibrary />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("렌더링이 제대로 된다.", async () => {
    const btn = await screen.findByText("읽는 중");
    expect(btn).toBeTruthy();
  });

  it("읽을 예정 클릭 후 Route가 바뀐다.", async () => {
    const btn = await screen.findByText("읽을 예정");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
  });
});
