import { beforeEach, expect, vi } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.js";
import { customRender } from "@/test-utils/CustomRender.tsx";
import CollectionListView from "../CollectionListView.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as MS from "@/test-utils/mockServerResponses.ts";
import { userEvent } from "@testing-library/user-event";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/collections"]}>
      <Routes>
        <Route element={<CollectionListView />} path={"/collections"} />
        <Route element={<div>collection Detail</div>} path={"/collections/name"} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("유저 로그인 했을 때", () => {
  beforeEach(() => {
    MS.MOCK_SERVER_COLLECTION_BOOK_LIST(server);
    MS.MOCK_SERVER_CREATE_COLLECTION(server);
    render();
  });

  it("collection book cover, 새로 추가하기 렌더링 된다.", async () => {
    const bookCover = await screen.findByAltText("책 표지");
    const createNew = await screen.findByText("새로 추가하기");

    expect(createNew).toBeTruthy();
    expect(bookCover).toBeTruthy();
  });

  it("addButton 클릭하면 input 창이 뜨고 collection을 새로 생성하면 input 창이 닫힌다.", async () => {
    const createNew = await screen.findByText("새로 추가하기");
    fireEvent.click(createNew);

    const input = await screen.findByPlaceholderText("이름을 입력하세요");
    expect(input).toBeTruthy();
    await userEvent.type(input, "test{enter}");

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("이름을 입력하세요")).toBeNull();
    });
  });

  it("book cover 클릭 시 collection Detail 페이지로 이동한다.", async () => {
    const bookCover = await screen.findByAltText("책 표지");
    fireEvent.click(bookCover);

    const collectionDetail = await screen.findByText("collection Detail");
    expect(collectionDetail).toBeTruthy();
  });
});
