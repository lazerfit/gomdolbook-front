import { http, HttpResponse } from "msw";
import { type SetupServer } from "msw/node";
import * as MR from "./mockResponses.ts";

export const apiBaseUrl = "http://localhost:8080/api";

const httpOptions = (uri: string) => {
  return http.options(`${apiBaseUrl}/${uri}`, () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Credentials": "true",
      },
    });
  });
};

export const MOCK_SERVER_NEW_STATUS_RESPONSE = (server: SetupServer, isbn: string) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/status/${isbn}`, () => {
      return HttpResponse.json(MR.MOCK_NEW_STATUS_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_READING_STATUS_RESPONSE = (
  server: SetupServer,
  isbn: string,
) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/status/${isbn}`, () => {
      return HttpResponse.json(MR.MOCK_READING_STATUS_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_BOOK_RESPONSE = (server: SetupServer, isbn: string) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/book/${isbn}`, () => {
      return HttpResponse.json(MR.MOCK_BOOK_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_BOOK_SAVE = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/v1/book/save`, () => {
      return HttpResponse.json({ data: "OK" });
    }),
    httpOptions("v1/book/save"),
  );
};

export const MOCK_SERVER_BOOK_SAVE_ERROR = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/v1/book/save`, () => {
      return HttpResponse.json({ status: 404, errors: "[error]" }, { status: 404 });
    }),
    httpOptions("v1/book/save"),
  );
};

export const MOCK_SERVER_COLLECTION_EMPTY_LIST_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v2/collections`, () => {
      return HttpResponse.json({ data: "[]" });
    }),
  );
};

export const MOCK_SERVER_BOOK_LIST_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/book/search`, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("q");

      if (query === "test") {
        return HttpResponse.json(MR.MOCK_BOOK_LIST_RESPONSE);
      }

      return HttpResponse.json({ data: [] });
    }),
  );
};

export const MOCK_SERVER_READING_LIBRARY_BOOK_LIST = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/book/Library`, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("status");

      if (query === "READING") {
        return HttpResponse.json(MR.MOCK_BOOK_LIST_RESPONSE);
      }

      return HttpResponse.json({ data: [] });
    }),
  );
};

export const MOCK_SERVER_COLLECTION_BOOK_LIST = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v2/collections`, () => {
      return HttpResponse.json(MR.MOCK_COLLECTION_LIST_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_CREATE_COLLECTION = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/v2/collections`, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("name");

      if (query === "test") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.json({ data: "ERROR" });
    }),
    httpOptions("v2/collections"),
  );
};

export const MOCK_SERVER_UPDATE_RATING = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/v1/readingLog/rating/update`, ({ request }) => {
      const url = new URL(request.url);
      const queryIsbn = url.searchParams.get("isbn");
      const queryStar = url.searchParams.get("star");

      if (queryIsbn === "isbn" && queryStar === "5") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.json({ data: "ERROR" });
    }),
    httpOptions("v1/readingLog/rating/update"),
  );
};

export const MOCK_SERVER_COLLECTION_DETAIL_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v2/collections/test`, () => {
      return HttpResponse.json(MR.MOCK_COLLECTION_DETAIL_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_COLLECTION_DETAIL_DELETE = (
  server: SetupServer,
  name: string,
) => {
  server.use(
    http.delete(`${apiBaseUrl}/v2/collections/${name}`, () => {
      return HttpResponse.json({ data: "OK" });
    }),
    httpOptions(`v2/collections/${name}`),
  );
};

export const MOCK_SERVER_READINGLOG_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/readingLog`, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("isbn");

      if (query === "isbn") {
        return HttpResponse.json(MR.MOCK_READINGLOG_RESPONSE);
      }

      return HttpResponse.json(MR.MOCK_READINGLOG_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_UPDATE_READINGLOG = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/v1/readingLog/update`, () => {
      return HttpResponse.json({ data: "OK" });
    }),
    httpOptions("v1/readingLog/update"),
  );
};

export const MOCK_SERVER_UPDATE_READINGLOG_ERROR = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/v1/readingLog/update`, () => {
      return HttpResponse.json({ status: 400, errors: ["error"] }, { status: 400 });
    }),
    httpOptions("v1/readingLog/update"),
  );
};

export const MOCK_FINISHED_BOOK_CALENDAR = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/v1/book/calendar/finished`, () => {
      return HttpResponse.json(MR.MOCK_FINISHED_BOOK_CALENDAR_RESPONSE);
    }),
    httpOptions("v1/book/calendar/finished"),
  );
};

export const MOCK_SERVER_IS_EXIST_BOOK_IN_COLLECTION = (
  server: SetupServer,
  isbn: string,
  name: string,
) => {
  server.use(
    http.get(`${apiBaseUrl}/v2/collections/${name}/book/${isbn}/exists`, () => {
      return HttpResponse.json({ data: true });
    }),
  );
};

export const MOCK_SERVER_ADD_BOOK_TO_COLLECTION = (server: SetupServer, name: string) => {
  server.use(
    http.post(`${apiBaseUrl}/v2/collections/${name}/book`, ({ request }) => {
      const url = new URL(request.url);
      const queryIsbn = url.searchParams.get("isbn");

      if (queryIsbn === "1234567890") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.json({ data: "ERROR" });
    }),
    httpOptions("v2/collections/test/book"),
  );
};

export const MOCK_SERVER_REMOVE_BOOK_FROM_COLLECTION = (
  server: SetupServer,
  isbn: string,
  name: string,
) => {
  server.use(
    http.delete(`${apiBaseUrl}/v2/collections/${name}/book/${isbn}`, () => {
      return HttpResponse.json({ data: "OK" });
    }),
    httpOptions(`v2/collections/test/book/${isbn}`),
  );
};
