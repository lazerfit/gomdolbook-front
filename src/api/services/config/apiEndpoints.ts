export const BookEndPoint = {
  getBook: (isbn: string) => `/book/${isbn}`,
  getReadingLog: (isbn: string) => `/readingLog/${isbn}`,
};
