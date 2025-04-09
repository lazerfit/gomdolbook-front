import { beforeEach, expect, vi } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.ts";
import { customRender } from "@/test-utils/CustomRender.tsx";
import SearchResult from "../SearchResult.tsx";
import * as MS from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const mockCloseFn = vi.fn();

const render = () => {
  return customRender(<SearchResult onClose={mockCloseFn} text="test" />);
};

describe("render", () => {
  beforeEach(() => {
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_NEW_STATUS_RESPONSE(server, "isbn");
    MS.MOCK_SERVER_COLLECTION_BOOK_LIST(server);
    MS.MOCK_SERVER_BOOK_LIST_RESPONSE(server);
    render();
  });

  it("result Description 렌더링된다.", async () => {
    const desc = await screen.findByText("desc");

    expect(desc).toBeTruthy();
  });

  it("book desc 누르면 bookDetail 화면으로 넘어간고 뒤고가기 버튼을 누르면 돌아온다.", async () => {
    const desc = await screen.findByText("desc");
    expect(desc).toBeTruthy();
    fireEvent.click(desc);

    const title = await screen.findByText("default title");
    expect(title).toBeTruthy();

    const button = await screen.findByTestId("backBtn");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByTestId("backBtn")).toBeNull();
    });
  });
});
