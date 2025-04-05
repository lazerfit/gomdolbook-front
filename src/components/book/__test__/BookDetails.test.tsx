import { screen } from "@testing-library/react";
import BookDetail from "../BookDetail.tsx";
import Toast from "@/ui/Toast.tsx";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  customRender,
  beforeEach,
  expect,
  it,
  describe,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from "@/utils/CustomRender.tsx";

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

    if (email === "__test__@gmail.com") {
      return HttpResponse.json({ data: "OK" });
    }

    return HttpResponse.error();
  }),
);

beforeAll(() => server.listen());
beforeEach(() => {
  customRender(
    <>
      <BookDetail isbn="isbn" onClose={mockOnClose} />
      <Toast
        onShow={isToastVisible}
        onError={false}
        onClose={onCloseToast}
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

describe("api __test__", () => {
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
