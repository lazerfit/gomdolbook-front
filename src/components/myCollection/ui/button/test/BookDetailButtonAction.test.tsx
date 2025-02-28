import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, describe, vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { testQueryClient } from "@/api/services/config/testQueryClient.ts";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import Theme from "@/styles/theme.tsx";
import BookDetailButtonActions from "../BookDetailButtonActions.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RefetchContextProvider from "@/api/contextProviders/RefetchProvider.tsx";

const server = setupServer();
const MOCK_BOOK_RESPONSE = {
  title: "title",
  author: "author",
  pubDate: "pubDate",
  description: "desc",
  isbn13: "isbn",
  cover: "cover",
  categoryName: "cate",
  publisher: "pub",
  status: "status",
};

const bookData = MOCK_BOOK_RESPONSE;
const isbn = "isbn";
const showToast = vi.fn();
const showErrorToast = vi.fn();
const mockRefetch = vi.fn().mockResolvedValue(Promise.resolve("refetch called"));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("버튼 클릭 후 에러 토스트가 호출된다.", () => {
  beforeAll(() => {
    server.use(
      http.post("http://localhost:8080/api/v1/book/save", () => {
        return HttpResponse.error();
      }),
      http.get("http://localhost:8080/api/v1/status/isbn", () => {
        return HttpResponse.json({ data: "NEW" });
      }),
    );
  });
  beforeEach(() => {
    render(
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <div id="modal"></div>
          <RefetchContextProvider refetch={mockRefetch}>
            <BookDetailButtonActions
              bookData={bookData}
              isbn={isbn}
              showToast={showToast}
              showErrorToast={showErrorToast}
            />
          </RefetchContextProvider>
        </QueryClientProvider>
      </Theme>,
    );
  });

  it("읽는 중 showErrorToast 호출", async () => {
    const btn = await screen.findByTestId("saveReadingLog");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(showErrorToast).toBeCalled());
  });

  it("읽을 예정 ~~", async () => {
    const btn = await screen.findByText("읽을 예정");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(showErrorToast).toBeCalled());
  });

  it("읽기 완료 ~~", async () => {
    const btn = await screen.findByText("읽기 완료");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(showErrorToast).toBeCalled());
  });
});

describe("버튼을 하나씩 클릭해본다", () => {
  beforeEach(() => {
    render(
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <div id="modal"></div>
          <RefetchContextProvider refetch={mockRefetch}>
            <BookDetailButtonActions
              isbn={isbn}
              bookData={bookData}
              showToast={showToast}
              showErrorToast={showErrorToast}
            />
          </RefetchContextProvider>
        </QueryClientProvider>
      </Theme>,
    );
    server.use(
      http.post("http://localhost:8080/api/v1/book/save", () => {
        return HttpResponse.json({ data: "OK" });
      }),
    );
  });
  it("버튼이 존재한다 그리고 읽는 중 버튼을 클릭하면 showToast가 호출된다.", async () => {
    const btn = await screen.findByText("읽는 중");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(showToast).toBeCalled());
  });

  it("읽을 예정 ~~", async () => {
    const btn = await screen.findByText("읽을 예정");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(showToast).toBeCalled());
  });

  it("읽기 완료 ~~", async () => {
    const btn = await screen.findByText("읽기 완료");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(showToast).toBeCalled());
  });
});

describe("컬렉션에 추가하기 버튼이 생긴다", () => {
  beforeEach(() => {
    render(
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter initialEntries={["/collection/test-name"]}>
            <Routes>
              <Route
                path="/collection/:name"
                element={
                  <RefetchContextProvider refetch={mockRefetch}>
                    <BookDetailButtonActions
                      isbn={isbn}
                      bookData={bookData}
                      showToast={showToast}
                      showErrorToast={showErrorToast}
                    />
                  </RefetchContextProvider>
                }
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Theme>,
    );
    server.use(
      http.post("http://localhost:8080/api/v1/collection/test-name/addBook", () => {
        return new HttpResponse(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
      }),
      http.options("http://localhost:8080/api/v1/collection/test-name/addBook", () => {
        return new HttpResponse(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }),
    );
  });

  it("추가하기 버튼이 생겼다", async () => {
    await waitFor(() => expect(screen.getByTestId("collectionBtn")).toBeTruthy());
  });

  it("추가하기 버튼 눌러 책 추가하기", async () => {
    const btn = await screen.findByTestId("collectionBtn");
    fireEvent.click(btn);

    await waitFor(() => expect(screen.getByTestId("saveReadingLog")).toBeTruthy());
  });

  it("추가하기 버튼 누르면 refetch가 일어난다.", async () => {
    const btn = await screen.findByTestId("collectionBtn");
    fireEvent.click(btn);

    await waitFor(() => expect(screen.getByTestId("saveReadingLog")).toBeTruthy());
    await waitFor(() => expect(mockRefetch).toBeCalledTimes(1));
  });
});
