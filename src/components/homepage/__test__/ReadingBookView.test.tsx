import { beforeEach, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.ts";
import { customRender } from "@/test-utils/CustomRender.tsx";
import ReadingBooksView from "@/components/homepage/ReadingBooksView.tsx";
import { MemoryRouter } from "react-router-dom";
import * as MR from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const render = () => {
  return customRender(
    <MemoryRouter initialEntries={["/"]}>
      <ReadingBooksView />
    </MemoryRouter>,
  );
};

describe("render", () => {
  beforeEach(() => {
    MR.MOCK_SERVER_READING_LIBRARY_BOOK_LIST(server);
    render();
  });

  it("searchBar book, searchBar 렌더링 된다.", async () => {
    const bar = await screen.findByPlaceholderText("ISBN, NAME, AUTHOR ...");
    const book = await screen.findByText("title");

    expect(bar).toBeTruthy();
    expect(book).toBeTruthy();
  });
});
