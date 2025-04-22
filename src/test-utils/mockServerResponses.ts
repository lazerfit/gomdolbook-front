import { http, HttpResponse } from "msw";
import { type SetupServer } from "msw/node";
import * as MR from "./mockResponses.ts";

export const apiBaseUrl = "http://localhost:8080/api/v1";

export const MOCK_SERVER_NEW_STATUS_RESPONSE = (server: SetupServer, isbn: string) => {
  server.use(
    http.get(`${apiBaseUrl}/status/${isbn}`, () => {
      return HttpResponse.json(MR.MOCK_NEW_STATUS_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_READING_STATUS_RESPONSE = (
  server: SetupServer,
  isbn: string,
) => {
  server.use(
    http.get(`${apiBaseUrl}/status/${isbn}`, () => {
      return HttpResponse.json(MR.MOCK_READING_STATUS_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_BOOK_RESPONSE = (server: SetupServer, isbn: string) => {
  server.use(
    http.get(`${apiBaseUrl}/book/${isbn}`, () => {
      return HttpResponse.json(MR.MOCK_BOOK_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_BOOK_SAVE = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/book/save`, () => {
      return HttpResponse.json({ data: "OK" });
    }),
    http.options(`${apiBaseUrl}/book/save`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};

export const MOCK_SERVER_BOOK_SAVE_ERROR = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/book/save`, () => {
      return HttpResponse.json({ status: 404, errors: "[error]" }, { status: 404 });
    }),
    http.options(`${apiBaseUrl}/book/save`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};

export const MOCK_SERVER_COLLECTION_EMPTY_LIST_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/collection/list`, () => {
      return HttpResponse.json({ data: "[]" });
    }),
  );
};

export const MOCK_SERVER_BOOK_LIST_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/book/search`, ({ request }) => {
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
    http.get(`${apiBaseUrl}/book/Library`, ({ request }) => {
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
    http.get(`${apiBaseUrl}/collection/list`, () => {
      return HttpResponse.json(MR.MOCK_COLLECTION_LIST_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_CREATE_COLLECTION = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/collection/create`, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("name");

      if (query === "test") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.json({ data: "ERROR" });
    }),
    http.options(`${apiBaseUrl}/collection/create`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};

export const MOCK_SERVER_UPDATE_RATING = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/readingLog/rating/update`, ({ request }) => {
      const url = new URL(request.url);
      const queryIsbn = url.searchParams.get("isbn");
      const queryStar = url.searchParams.get("star");

      if (queryIsbn === "isbn" && queryStar === "5") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.json({ data: "ERROR" });
    }),
    http.options(`${apiBaseUrl}/readingLog/rating/update`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};

export const MOCK_SERVER_COLLECTION_DETAIL_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/collection/test`, () => {
      return HttpResponse.json(MR.MOCK_COLLECTION_DETAIL_RESPONSE);
    }),
  );
};

export const MOCK_SERVER_COLLECTION_DETAIL_DELETE = (server: SetupServer) => {
  server.use(
    http.delete(`${apiBaseUrl}/collection/delete`, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("name");

      if (query === "test") {
        return HttpResponse.json({ data: "OK" });
      }

      return HttpResponse.json({ data: "ERROR" });
    }),
    http.options(`${apiBaseUrl}/collection/delete`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};

export const MOCK_SERVER_READINGLOG_RESPONSE = (server: SetupServer) => {
  server.use(
    http.get(`${apiBaseUrl}/readingLog`, ({ request }) => {
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
    http.post(`${apiBaseUrl}/readingLog/update`, () => {
      return HttpResponse.json({ data: "OK" });
    }),
    http.options(`${apiBaseUrl}/readingLog/update`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};

export const MOCK_SERVER_UPDATE_READINGLOG_ERROR = (server: SetupServer) => {
  server.use(
    http.post(`${apiBaseUrl}/readingLog/update`, () => {
      return HttpResponse.json({ status: 400, errors: ["error"] }, { status: 400 });
    }),
    http.options(`${apiBaseUrl}/readingLog/update`, () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Credentials": "true",
        },
      });
    }),
  );
};
