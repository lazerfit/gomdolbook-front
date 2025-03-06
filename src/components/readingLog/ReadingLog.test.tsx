import { setupServer } from "msw/node";
import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect } from "vitest";
import { customRender } from "@/utils/CustomRender.tsx";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ReadingLog from "./ReadingLog.tsx";
import { http, HttpResponse } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const MOCK_RESPONSE = {
  title: "default",
  author: "default",
  pubDate: "default",
  cover: "default",
  publisher: "default",
  status: "default",
  note1: "default",
  note2: "default",
  note3: "default",
};

const server = setupServer(
  http.get("http://localhost:8080/api/v1/readingLog", ({ request }) => {
    const url = new URL(request.url);
    const isbn = url.searchParams.get("isbn");

    if (isbn === "9791194330424") {
      return new HttpResponse(JSON.stringify(MOCK_RESPONSE), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    return HttpResponse.error();
  }),
  http.options("http://localhost:8080/api/v1/readingLog", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers":
          "Content-Type , x-interceptors-internal-request-id",
      },
    });
  }),
  http.post("http://localhost:8080/api/v1/readingLog/update", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
  http.options("http://localhost:8080/api/v1/readingLog/update", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
  http.get("http://localhost:8080/api/v1/status/9791194330424", () => {
    return HttpResponse.json({ data: "READING" });
  }),
  http.post("http://localhost:8080/api/v1/status/9791194330424/update", ({ request }) => {
    const url = new URL(request.url);
    const param = url.searchParams.get("status");

    if (param === "FINISHED") {
      return new HttpResponse(JSON.stringify({ data: "FINISHED" }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    return HttpResponse.json({ data: "READING" });
  }),
  http.options("http://localhost:8080/api/v1/status/9791194330424", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("render", () => {
  beforeEach(() => {
    customRender(
      <MemoryRouter initialEntries={["/readingLog/9791194330424"]}>
        <Routes>
          <Route path="/readingLog/:isbn" element={<ReadingLog />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("렌더링 된다", async () => {
    const title = await screen.findByText("1. 무엇을 다룬 책인지 알아내기");
    expect(title).toBeTruthy();
  });

  it("note1 API 응답이 표시된다.", async () => {
    const note = await screen.findByText("default note1");
    expect(note).toBeTruthy();
  });

  it("modifyBtn 클릭하면 modal 창이 뜬다.", async () => {
    const btn = await screen.findByTestId("modifyBtn-note1");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    await waitFor(() => expect(screen.getByText("저장하기")).toBeTruthy());
  });

  it("threedot 버튼을 클릭한다.", async () => {
    const btn = await screen.findByText("상태변경");
    expect(btn).toBeTruthy();
    expect(await screen.findByText("읽는 중"));
    fireEvent.click(btn);
    const updateBtn = await screen.findByText("다 읽었어요");
    fireEvent.click(updateBtn);
  });
});
