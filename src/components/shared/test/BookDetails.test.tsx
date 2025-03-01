import { screen } from "@testing-library/react";
import { beforeEach, expect, it, describe, vi } from "vitest";
import BookDetails from "../BookDetails.tsx";
import Toast from "@/ui/Toast.tsx";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { customRender } from "@/utils/CustomRender.tsx";

const MOCK_STATUS_RESPONSE = {
  data: "READING",
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
const mockOnClose = vi.fn();
const onCloseToast = vi.fn();
const isToastVisible = false;

const server = setupServer(
  http.get("http://localhost:8080/api/v1/status/isbn", () => {
    return HttpResponse.json(MOCK_STATUS_RESPONSE);
  }),
  http.get("http://localhost:8080/api/v1/book/isbn", () => {
    return HttpResponse.json(MOCK_BOOK_RESPONSE);
  }),
  http.post("http://localhost:8080/api/v1/book/save", ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (email === "test@gmail.com") {
      return HttpResponse.json({ data: "OK" });
    }

    return HttpResponse.error();
  }),
);

beforeAll(() => server.listen());
beforeEach(() => {
  customRender(
    <>
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
    </>,
    { refetch: mockRefetch },
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

describe("collection이 아니다.", () => {
  it("threedot이 렌더링되지 않는다.", () => {
    const threedotBtn = screen.queryByTestId("threedot");
    expect(threedotBtn).toBeFalsy();
  });
});
