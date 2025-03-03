import { customRender } from "@/utils/CustomRender.tsx";
import BookDetailButtonActions from "../BookDetailButtonActions.tsx";
import { vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const showToast = vi.fn();
const showErrorTest = vi.fn();
const statusUpdate = vi.fn();
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
};

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe("collection redner test", () => {
  server.use(
    http.post("http://localhost:8080/api/v1/collection/name/book/add", () => {
      return HttpResponse.json({ data: "OK" });
    }),
  );
  beforeEach(() => {
    customRender(
      <BookDetailButtonActions
        showToast={showToast}
        showErrorToast={showErrorTest}
        bookData={MOCK_BOOK_RESPONSE}
        statusRefetch={statusUpdate}
        status="EMPTY"
      />,
      { params: { isCollection: true, name: "name" } },
    );
  });

  it("렌더링이 된다.", async () => {
    const btn = await screen.findByText("추가하기");
    expect(btn).toBeTruthy();
  });

  it("추가하기 버튼을 클릭하면 toast가 나타난다.", async () => {
    const btn = await screen.findByText("추가하기");
    fireEvent.click(btn);
    expect(screen.findByText("성공적으로 서재에 저장하였습니다.")).toBeTruthy();
  });
});

describe("Non-collection render", () => {
  server.use(
    http.post("http://localhost:8080/api/v1/book/save", ({ request }) => {
      const url = new URL(request.url);
      const email = url.searchParams.get("email");

      if (email === "test@gmail.com") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.error();
    }),
  );
  beforeEach(() => {
    customRender(
      <BookDetailButtonActions
        showToast={showToast}
        showErrorToast={showErrorTest}
        bookData={MOCK_BOOK_RESPONSE}
        statusRefetch={statusUpdate}
        status="NEW"
      />,
    );
  });

  it("렌더링이 된다.", async () => {
    const btn = await screen.findByText("읽는 중");
    expect(btn).toBeTruthy();
  });

  it("읽는 중 버튼을 클릭하면 toast가 나타난다.", async () => {
    const btn = await screen.findByText("읽는 중");
    fireEvent.click(btn);
    expect(screen.findByText("성공적으로 서재에 저장하였습니다.")).toBeTruthy();
  });
});
