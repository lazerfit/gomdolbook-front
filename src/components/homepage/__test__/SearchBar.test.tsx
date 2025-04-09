import { beforeEach, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { server } from "@/test-utils/setupHttp.ts";
import { customRender } from "@/test-utils/CustomRender.tsx";
import SearchBar from "../SearchBar.tsx";
import * as MS from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(<SearchBar />);
};

describe("render", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_BOOK_LIST_RESPONSE(server);
    render();
  });

  it("placeholder 렌더링 된다.", async () => {
    const placeholder = await screen.findByPlaceholderText("ISBN, NAME, AUTHOR ...");

    expect(placeholder).toBeTruthy();
    screen.debug();
  });

  it("searchResult 글자 입력 후 엔터 누르면 modal 창이 뜬다.", async () => {
    const input = await screen.findByPlaceholderText("ISBN, NAME, AUTHOR ...");

    await userEvent.type(input, "test{enter}");

    const description = await screen.findByText("desc");
    expect(description).toBeTruthy();
  });
});
