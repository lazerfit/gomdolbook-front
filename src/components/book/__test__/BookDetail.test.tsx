import BookDetail from "../BookDetail.tsx";
import { server } from "@/test-utils/setupHttp.ts";
import * as MS from "@/test-utils/mockServerResponses.ts";
import { customRender } from "@/test-utils/CustomRender.tsx";
import { vi, beforeEach, expect, it, describe } from "vitest";
import { fireEvent, waitFor, screen } from "@testing-library/react";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const mockRefetch = vi.fn().mockResolvedValue(Promise.resolve("refetch called"));
const mockOnClose = vi.fn();

const render = () => {
  return customRender(
    <>
      <BookDetail isbn="isbn" onClose={mockOnClose} />
    </>,
    { refetch: mockRefetch },
  );
};

const buttons = ["읽는 중", "읽을 예정", "읽기 완료"];

describe("bookStatus === NEW", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_COLLECTION_BOOK_LIST(server);
    MS.MOCK_SERVER_BOOK_SAVE(server);
    MS.MOCK_SERVER_NEW_STATUS_RESPONSE(server, "isbn");
    render();
  });

  it("컴포넌트 생성 시 book 정보를 렌더링한다.", async () => {
    const status = await screen.findByText("desc");
    expect(status).toBeTruthy();
  });

  it.each(buttons)("%s 버튼 클릭하면 토스트 팝업 뜬다.", async (label) => {
    const button = await screen.findByText(label);
    expect(button).toBeTruthy();
    fireEvent.click(button);
    const toast = await screen.findByText("내 서재에 성공적으로 저장하였어요.");
    expect(toast).toBeTruthy();
  });
});

describe("bookStatus === READING", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_COLLECTION_BOOK_LIST(server);
    MS.MOCK_SERVER_READING_STATUS_RESPONSE(server, "isbn");
    render();
  });

  it("읽는 중 버튼만 나온다.", async () => {
    const readingButton = await screen.findByText("읽는 중");
    expect(readingButton).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByText("읽을 예정")).toBeNull();
    });
  });

  it("상태변경 버튼을 클릭한다.", async () => {
    const button = await screen.findByText("상태변경");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    buttons.forEach((label) => {
      const button = screen.queryByText(label);
      expect(button).toBeTruthy();
    });
  });
});
