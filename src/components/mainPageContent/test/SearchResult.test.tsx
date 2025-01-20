import { useGetBookSearchResult } from "@/hooks/queries/useBook";
import { beforeEach, beforeAll, afterAll, afterEach, describe } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { bypass, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { testQueryClient } from "@/api/services/config/testQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const MOCK_BOOK_SEARCH_RESULT = {
  data: [
    {
      title: "title",
      author: "author",
      pubDate: "pubDate",
      description: "desc",
      isbn13: "isbn",
      cover: "cover",
      categoryName: "cate",
      publisher: "pub",
    },
    {
      title: "title1",
      author: "author1",
      pubDate: "pubDate1",
      description: "desc1",
      isbn13: "isbn1",
      cover: "cover1",
      categoryName: "cate1",
      publisher: "pub1",
    },
  ],
};

const server = setupServer();

beforeAll(() => server.listen());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
};

describe("useGetBookSearchResult", () => {
  beforeEach(() => testQueryClient.clear());
  afterEach(() => server.resetHandlers());

  it("should fetch book search result data successfully", async () => {
    server.use(
      http.get("http://localhost:8080/api/v1/book/search?q=java", () => {
        return HttpResponse.json(MOCK_BOOK_SEARCH_RESULT);
      }),
    );
    const { result } = renderHook(() => useGetBookSearchResult("java"), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.data.length).toBe(2);
    expect(result.current.data?.data[0].title).toBe("title");
    expect(result.current.data?.data[1].title).toBe("title1");
  });

  it("should handle error correctly", async () => {
    server.use(
      http.get("http://localhost:8080/api/v1/book/search", async ({ request }) => {
        const url = new URL(request.url);
        url.searchParams.set("q", "error");
        const proxyRequest = new Request(url, request);
        await fetch(bypass(proxyRequest));
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      }),
    );
    const { result } = renderHook(() => useGetBookSearchResult("error"), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
  });
});
