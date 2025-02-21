import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, describe, vi } from "vitest";
import BookDetails from "../BookDetailsInModal.tsx";
import Toast from "@/ui/Toast.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { testQueryClient } from "@/api/services/config/testQueryClient.ts";
import Theme from "@/styles/theme.tsx";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const MOCK_STATUS_RESPONSE = {
  data: "READING",
};

const MOCK_NEW_STATUS_RESPONSE = {
  data: "NEW",
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

const server = setupServer(
  http.get("http://localhost:8080/api/v1/status/isbn", () => {
    return HttpResponse.json(MOCK_STATUS_RESPONSE);
  }),
  http.get("http://localhost:8080/api/v1/book/isbn", () => {
    return HttpResponse.json(MOCK_BOOK_RESPONSE);
  }),
  http.post("http://localhost:8080/api/v1/book/save?email=test@daum.net", () => {
    return HttpResponse.json({ data: "OK" });
  }),
);

beforeAll(() => server.listen());
beforeEach(() => {
  const mockOnClose = vi.fn();
  const onCloseToast = vi.fn();
  const isToastVisible = false;
  render(
    <Theme>
      <QueryClientProvider client={testQueryClient}>
        <div id="modal"></div>
        <BookDetails isbn="isbn" onClose={mockOnClose} />
        <Toast
          isVisible={isToastVisible}
          isError={false}
          onChangeVisibility={onCloseToast}
          message={{
            success: "내 서재에 성공적으로 저장하였어요.",
            error: "다시 시도해주세요.",
          }}
        />
      </QueryClientProvider>
    </Theme>,
  );
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api test", () => {
  it("컴포넌트 생성 시 status를 렌더링한다.", async () => {
    const status = await screen.findByTestId("readingStatus");
    expect(status).toBeTruthy();
    expect(screen.queryByText("읽을 예정")).toBeNull();
  });

  it("컴포넌트 생성 시 book 정보를 렌더링한다.", async () => {
    const status = await screen.findByText("desc");
    expect(status).toBeTruthy();
  });
});
