import { beforeEach, expect, vi } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.js";
import { customRender } from "@/test-utils/CustomRender.tsx";
import CollectionBookMetaDetail from "../CollectionBookMetaDetail.tsx";
import * as MS from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const onClose = vi.fn();

const render = () => {
  return customRender(<CollectionBookMetaDetail isbn={"1234567890"} onClose={onClose} />);
};

describe("render", () => {
  beforeEach(() => {
    server.resetHandlers();
    MS.MOCK_SERVER_BOOK_RESPONSE(server, "1234567890");
    MS.MOCK_SERVER_COLLECTION_BOOK_LIST(server);
    MS.MOCK_SERVER_COLLECTION_DETAIL_RESPONSE(server);
    MS.MOCK_SERVER_IS_EXIST_BOOK_IN_COLLECTION(server, "1234567890", "name");
    MS.MOCK_SERVER_ADD_BOOK_TO_COLLECTION(server, "name");
    MS.MOCK_SERVER_REMOVE_BOOK_FROM_COLLECTION(server, "undefined", "name");
    render();
  });

  it("책 표지 렌더링 된다.", async () => {
    const bookCover = await screen.findByAltText("책표지");
    expect(bookCover).toBeTruthy();
  });

  it("제거하기 렌더링 된다.", async () => {
    const removeButton = await screen.findByText("제거하기");
    expect(removeButton).toBeTruthy();
  });

  it("제거하기 버튼 클릭 시 책이 제거되고 onClose가 호출된다.", async () => {
    const removeButton = await screen.findByText("제거하기");
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
