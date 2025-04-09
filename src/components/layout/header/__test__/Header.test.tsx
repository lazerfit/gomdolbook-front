import { beforeEach, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.js";
import { customRender, describe } from "@/test-utils/CustomRender.tsx";
import Header from "../Header.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { setAuthenticated } from "../../../../../__mocks__/@react-keycloak/web.js";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<Header />} path={"/"} />
        <Route element={<div>라이브러리입니다.</div>} path={"/library/reading"} />
        <Route element={<div>컬렉션입니다.</div>} path={"/collections"} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("유저 로그인 했을 때", () => {
  beforeEach(() => {
    render();
  });

  it("header site logo 렌더링 된다.", async () => {
    const logo = await screen.findByTestId("site-logo");

    expect(logo).toBeTruthy();
  });

  it("library 클릭하면 이동한다.", async () => {
    const library = await screen.findByText("Library");
    expect(library).toBeTruthy();

    fireEvent.click(library);

    expect(screen.findByText("라이브러리입니다.")).toBeTruthy();
  });

  it("collection 클릭하면 이동한다.", async () => {
    const collection = await screen.findByText("Collections");
    expect(collection).toBeTruthy();

    fireEvent.click(collection);

    expect(screen.findByText("컬렉션입니다.")).toBeTruthy();
  });

  it("menu 클릭하면 dropdown 내려온다.", async () => {
    const menu = await screen.findByText("menu");
    fireEvent.click(menu);

    expect(await screen.findByText("Log out")).toBeTruthy();
  });
});

describe("유저 로그인 하지 않았을 때", async () => {
  beforeEach(() => {
    server.resetHandlers();
    setAuthenticated(false);
    render();
  });

  it("login 버튼이 렌더링 된다.", async () => {
    const loginButton = await screen.findByText("Log in");
    expect(loginButton).toBeTruthy();
  });

  it("login 버튼 클릭 시 로그인 모달창이 팝업된다.", async () => {
    const loginButton = await screen.findByText("Log in");
    fireEvent.click(loginButton);

    expect(await screen.findByText("로그인/회원가입")).toBeTruthy();
  });
});
