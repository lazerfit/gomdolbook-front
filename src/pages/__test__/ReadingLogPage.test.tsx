import { beforeEach, expect, vi } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.js";
import { customRender, describe } from "@/test-utils/CustomRender.tsx";
import ReadingLogPage from "@/pages/ReadingLogPage.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as MS from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/readingLog/isbn"]}>
      <Routes>
        <Route element={<ReadingLogPage />} path={"/readingLog/:isbn"} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("success toast popup", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_READING_STATUS_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_READINGLOG_RESPONSE(server);
    MS.MOCK_SERVER_UPDATE_READINGLOG(server);
    render();
  });

  it("note, noteText, rating 렌더링 된다.", async () => {
    const note3 = await screen.findByText("3. 비평하기");
    const note3Text = await screen.findByText("note3");
    const stars = await screen.findAllByTestId("filled-star");
    expect(note3).toBeTruthy();
    expect(note3Text).toBeTruthy();
    expect(stars.length).toBe(5);
  });

  it("modify 버튼 누르면 modal 창이 뜨고 저장하기 버튼을 누르면 성공 토스트 팝업이 뜬다.", async () => {
    const button = await screen.findByTestId("modifyBtn-note3");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    const saveButton = await screen.findByText("저장하기");
    expect(saveButton).toBeTruthy();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("성공적으로 저장하였어요.")).toBeTruthy();
    });
  });
});

describe("error toast popup", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_READING_STATUS_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_READINGLOG_RESPONSE(server);
    MS.MOCK_SERVER_UPDATE_READINGLOG_ERROR(server);
    render();
  });

  it("modify 버튼 누르면 modal 창이 뜨고 저장하기 버튼을 누르면 실패 토스트 팝업이 뜬다.", async () => {
    const button = await screen.findByTestId("modifyBtn-note3");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    const saveButton = await screen.findByText("저장하기");
    expect(saveButton).toBeTruthy();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("다시 시도해주세요.")).toBeTruthy();
    });
  });
});
