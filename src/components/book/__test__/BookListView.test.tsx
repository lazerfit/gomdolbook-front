import BookListView from "../BookListView.tsx";
import { screen, waitFor, cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LibraryResponse } from "@/api/services/types/booktypes.ts";
import * as MR from "@/test-utils/mockResponses.js";
import * as MS from "@/test-utils/mockServerResponses.ts";
import {
  customRender,
  beforeEach,
  expect,
  it,
  describe,
  beforeAll,
  afterAll,
  afterEach,
  fireEvent,
} from "@/test-utils/CustomRender.tsx";
import { vi } from "vitest";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const server = setupServer();
const mockRefetch = vi.fn().mockResolvedValue(Promise.resolve("refetch called"));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

const render = (bookList: LibraryResponse[]) => {
  return customRender(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<BookListView bookList={bookList} />} path={"/"} />
        <Route element={<div>this is bookDetail View</div>} path={"/readingLog/isbn"} />
      </Routes>
    </MemoryRouter>,
    { refetch: mockRefetch },
  );
};

describe("bookList.length > 0", () => {
  beforeEach(() => {
    server.resetHandlers();
    render(MR.MOCK_LIBRARY_RESPONSE_READING_STATUS);
  });

  it("Book 책 표지와 책 제목이 화면에 나타난다.", async () => {
    const bookTitle = await screen.findByText("title");
    const bookCover = await screen.findByAltText("책 표지");

    expect(bookCover).toBeTruthy();
    expect(bookTitle).toBeTruthy();
  });

  it("Book 책 표지 클릭하면 readingLog 페이지로 이동한다.", async () => {
    const bookCover = await screen.findByAltText("책 표지");
    fireEvent.click(bookCover);

    const banner = await screen.findByText("this is bookDetail View");

    expect(banner).toBeTruthy();
  });
});

describe("bookList.length > 0 && NEW status", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_NEW_STATUS_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_COLLECTION_EMPTY_LIST_RESPONSE(server);
    render(MR.MOCK_LIBRARY_RESPONSE_NEW_STATUS);
  });

  it("Book 책 표지와 책 제목이 화면에 나타난다.", async () => {
    const bookTitle = await screen.findByText("title");
    const bookCover = await screen.findByAltText("책 표지");

    expect(bookCover).toBeTruthy();
    expect(bookTitle).toBeTruthy();
  });

  it("Modal 열렸을 때, 뒤로가기 버튼 클릭하면 모달창이 닫힌다.", async () => {
    const bookCover = await screen.findByAltText("책 표지");
    fireEvent.click(bookCover);
    const backButton = await screen.findByTestId("closeButton");
    expect(backButton).toBeTruthy();

    fireEvent.click(backButton);

    await waitFor(() => expect(screen.queryByText("desc")).toBeNull());
  });
});

describe("로그인 안함", () => {
  beforeEach(() => {
    server.resetHandlers();
    render(MR.MOCK_LIBRARY_EMPTY_RESPONSE);
  });

  it("Book 비로그인 index 페이지가 렌더링된다.", async () => {
    const banner = await screen.findByText("책을 추가해 독서기록을 시작해보세요.");
    expect(banner).toBeTruthy();
  });
});
