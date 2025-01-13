import { renderHook, waitFor, render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, expect, it, describe, vi } from "vitest";
import BookDetails from "../BookDetailsInModal";
import Toast from "@/ui/Toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { testQueryClient } from "@/api/services/config/testQueryClient";
import Theme from "@/styles/theme";
import { useBookQuery } from "@/hooks/queries/useBook";
import nock, { cleanAll } from "nock";

describe("화면", () => {
  const mockOnClose = vi.fn();
  const onCloseToast = vi.fn();
  const isToastVisible = false;
  beforeEach(() => {
    cleanAll();
    render(
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <div id="modal"></div>
          <BookDetails isbn=" " onClose={mockOnClose} />
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

  it("컴포넌트 생성 시 초기 데이터 api 불러옴", async () => {
    nock("http://localhost:8080")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/api/v1/book/isbn")
      .reply(200, {
        title: "title",
        author: "author",
        pubDate: "pubDate",
        description: "description",
        isbn13: "isbn13",
        cover: "cover",
        categoryName: "categoryName",
        publisher: "publisher",
      });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useBookQuery("isbn"), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(false));
    await waitFor(() => expect(result.current.data?.title).toEqual("title"));
  });

  it("누르면 뒤로 감", () => {
    const button = screen.getByTestId("backBtn");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("읽는 중 클릭", () => {
    const button = screen.getByText("읽는 중");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByText("내 서재에 성공적으로 저장하였어요.")).toBeTruthy();
  });

  it("읽을 예정 클릭", () => {
    const button = screen.getByText("읽을 예정");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByText("내 서재에 성공적으로 저장하였어요.")).toBeTruthy();
  });

  it("읽기 완료 클릭", () => {
    const button = screen.getByText("읽기 완료");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByText("내 서재에 성공적으로 저장하였어요.")).toBeTruthy();
  });
});
