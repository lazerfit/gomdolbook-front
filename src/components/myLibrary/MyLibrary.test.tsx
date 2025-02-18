import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import MyLibrary from "./MyLibrary.tsx";

const MOCK_LIBRARY_RESPONSE = [
  {
    cover: "cover1",
    title: "title1",
  },
  {
    cover: "cover2",
    title: "title2",
  },
];

const server = setupServer(
  http.get("http://localhost:8080/api/v1/Library?status=READING", () => {
    return HttpResponse.json(MOCK_LIBRARY_RESPONSE);
  }),
);

beforeAll(() => server.listen());
