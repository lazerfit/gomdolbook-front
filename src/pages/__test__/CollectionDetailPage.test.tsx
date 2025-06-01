import { beforeEach, expect, vi } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.js";
import { customRender } from "@/test-utils/CustomRender.tsx";
import CollectionDetailPage from "../CollectionDetailPage.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as MS from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/collections/test"]}>
      <Routes>
        <Route element={<CollectionDetailPage />} path={"/collections/:name"} />
        <Route element={<div>삭제 후 collections redirect</div>} path={"/collections"} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("render", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_COLLECTION_DETAIL_RESPONSE(server);
    MS.MOCK_SERVER_COLLECTION_BOOK_LIST(server);
    MS.MOCK_SERVER_COLLECTION_DETAIL_DELETE(server, "test");
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "default");
    MS.MOCK_SERVER_IS_EXIST_BOOK_IN_COLLECTION(server, "default", "test");
    MS.MOCK_SERVER_IS_EXIST_BOOK_IN_COLLECTION(server, "isbn", "test");
    render();
  });

  it("book cover 렌더링 된다.", async () => {
    const bookCover = await screen.findByAltText("책 표지");
    expect(bookCover).toBeTruthy();
  });

  it("표지 클릭하면 modal 창이 뜬다.", async () => {
    const bookCover = await screen.findByAltText("책 표지");
    fireEvent.click(bookCover);
    const modal = await screen.findByText("제거하기");
    expect(modal).toBeTruthy();
  });

  it("threedot 렌더링 된다, 삭제하기 버튼 누르면 modal창이 뜨고 삭제버튼을 누르면 삭제 후 redirect한다.", async () => {
    const threedot = await screen.findByTestId("threedot");
    expect(threedot).toBeTruthy();
    const deleteCollection = await screen.findByText("삭제하기");
    fireEvent.click(deleteCollection);

    const modal = await screen.findByText("정말 삭제하시겠습니까?");

    expect(modal).toBeTruthy();

    const confirm = await screen.findByText("삭제");
    fireEvent.click(confirm);

    await waitFor(() => {
      expect(screen.queryByText("삭제 후 collections redirect")).toBeTruthy();
    });
  });
});
