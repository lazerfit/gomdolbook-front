export const BookEndPoint = {
  getBook: (isbn: string) => `/book/${isbn}`,
  getReadingLog: (isbn: string) => `/readingLog/${isbn}`,
  saveReadingLog: () => "/book/save",
  getStatus: (isbn: string) => `/status/${isbn}`,
  getBookSearchResult: () => "/book/search",
};
