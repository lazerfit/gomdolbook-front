import { fireEvent, render, screen } from "@testing-library/react";
import { expect, vi, beforeAll, describe } from "vitest";
import Header from "./Header.tsx";
import { BrowserRouter } from "react-router-dom";
import Theme from "@/styles/theme.tsx";

describe("Header Component", () => {
  beforeAll(() => {
    const isLoggedIn = false;
    const onLoggedIn = vi.fn();
    const onLoggedOut = vi.fn();

    render(
      <Theme>
        <div id="modal"></div>
        <Header
          isLoggedIn={isLoggedIn}
          onLoggedIn={onLoggedIn}
          onLoggedOut={onLoggedOut}
        />
      </Theme>,
      { wrapper: BrowserRouter },
    );
  });

  it("로그인 버튼을 클릭하면 로그인 모달의 닫기 버튼이 나타난다.", () => {
    const loginButton = screen.getByRole("button", { name: /Log in/ });
    fireEvent.click(loginButton);
    expect(screen.getByRole("button", { name: /카카오로 시작하기/ })).toBeTruthy();
  });
});
