import { http, HttpResponse } from 'msw';
import * as MR from '@/test-utils/mockResponses';
import { HttpStatusCode } from 'axios';

const apiBaseUrl = 'http://localhost:8080/api';

export const handlers = [
  http.get(`${apiBaseUrl}/v1/book/search`, () => {
    return HttpResponse.json(MR.MOCK_BOOK_LIST_RESPONSE);
  }),

  http.get(`${apiBaseUrl}/v1/book/Library`, () => {
    return HttpResponse.json(MR.MOCK_LIBRARY_RESPONSE_READING_STATUS);
  }),

  http.get(`${apiBaseUrl}/v1/book/:isbn`, () => {
    return HttpResponse.json(MR.MOCK_BOOK_RESPONSE);
  }),

  http.get(`${apiBaseUrl}/v1/status/:isbn`, () => {
    return HttpResponse.json(MR.MOCK_NEW_STATUS_RESPONSE);
  }),

  http.get(`${apiBaseUrl}/v2/collections`, () => {
    return HttpResponse.json(MR.MOCK_COLLECTION_LIST_RESPONSE);
  }),

  http.get(`${apiBaseUrl}/v2/collections/:id`, () => {
    return HttpResponse.json(MR.MOCK_COLLECTION_DETAIL_RESPONSE);
  }),

  http.post(`${apiBaseUrl}/v2/collections/:id/book`, () => {
    return HttpResponse.json(HttpStatusCode.Ok);
  }),

  http.delete(`${apiBaseUrl}/v2/collections/:id`, () => {
    return HttpResponse.json(HttpStatusCode.Ok);
  }),

  http.patch(`${apiBaseUrl}/v2/collections/:id`, () => {
    return HttpResponse.json(HttpStatusCode.Ok);
  }),

  http.delete(`${apiBaseUrl}/v2/collections/:id/book/:isbn`, () => {
    return HttpResponse.json(HttpStatusCode.Ok);
  }),

  http.get(`${apiBaseUrl}/v1/readingLog/:id`, () => {
    return HttpResponse.json(MR.MOCK_READINGLOG_RESPONSE);
  }),
];
