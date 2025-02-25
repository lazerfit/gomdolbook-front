import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, describe, vi } from "vitest";
import Theme from "@/styles/theme.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { testQueryClient } from "@/api/services/config/testQueryClient.ts";
import BookList from "../BookList.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BookTracker from "@/pages/ReadingLog.tsx";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import RefetchContextProvider from "@/api/contexts/RefetchProvider.tsx";

const MOCK_BOOK_WITH_READINGLOG = {
  data: [
    {
      cover: "cover",
      title: "title",
      isbn: "isbn",
      isReadingLogExists: true,
    },
  ],
};

const MOCK_BOOK_WITHOUT_READINGLOG = {
  data: [
    {
      cover: "cover",
      title: "title",
      isbn: "isbn",
      isReadingLogExists: false,
    },
  ],
};

const MOCK_BOOK_RESPONSE = {
  data: {
    title: "title",
    author: "author",
    pubDate: "pubDate",
    description: "desc",
    isbn13: "isbn",
    cover: "cover",
    categoryName: "cate",
    publisher: "pub",
  },
};

const mockRefetch = vi.fn().mockResolvedValue(Promise.resolve("refetch called"));

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("BookList With ReadingLog", () => {
  beforeEach(() => {
    render(
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter initialEntries={["/collection/test-name"]}>
            <Routes>
              <Route
                path="/collection/:name"
                element={<BookList data={MOCK_BOOK_WITH_READINGLOG} />}
              />
              <Route path="/books/:id" element={<BookTracker />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Theme>,
    );
  });

  it("Book이 렌더링된다.", async () => {
    const title = await screen.findByText("title");
    expect(title).toBeTruthy();
  });

  it("cover를 클릭하면 readingLog로 간다.", async () => {
    const cover = await screen.findByAltText("책 표지");
    fireEvent.click(cover);
    await waitFor(() =>
      expect(screen.getByText("1. 무엇을 다룬 책인지 알아내기")).toBeTruthy(),
    );
  });
});

describe("BookList Without ReadingLog", () => {
  beforeEach(() => {
    render(
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <RefetchContextProvider refetch={mockRefetch}>
            <div id="modal"></div>
            <MemoryRouter initialEntries={["/collection/test-name"]}>
              <Routes>
                <Route
                  path="/collection/:name"
                  element={<BookList data={MOCK_BOOK_WITHOUT_READINGLOG} />}
                />
                <Route path="/books/:id" element={<BookTracker />} />
              </Routes>
            </MemoryRouter>
          </RefetchContextProvider>
        </QueryClientProvider>
      </Theme>,
    );

    server.use(
      http.get("http://localhost:8080/api/v1/book/isbn", () => {
        return HttpResponse.json(MOCK_BOOK_RESPONSE);
      }),
      http.get("http://localhost:8080/api/v1/status/isbn", () => {
        return HttpResponse.json("NEW");
      }),
    );
  });

  it("Book이 렌더링된다.", async () => {
    const title = await screen.findByText("title");
    expect(title).toBeTruthy();
  });

  it("cover를 클릭하면 모달창이 뜬다.", async () => {
    const cover = await screen.findByAltText("책 표지");
    fireEvent.click(cover);
    await waitFor(() => expect(screen.getByText("기본정보")).toBeTruthy());
  });
});
