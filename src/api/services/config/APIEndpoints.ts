export const BookEndPoint = {
  getBook: (isbn: string) => `v1/book/${isbn}`,
  saveBook: () => 'v1/book/save',
  getStatus: (isbn: string) => `v1/book/status/${isbn}`,
  updateStatus: (isbn: string) => `v1/book/status/${isbn}`,
  getBookSearchResult: () => 'v1/book/search',
  getLibrary: () => 'v1/book/Library',
  getFinishedBookCalendarData: () => 'v1/book/calendar/finished',
};

export const ReadingLogEndPoint = {
  getReadingLog: (id: number) => `v1/readingLog/${id}`,
  updateRating: (id: number) => `v1/readingLog/${id}/rating`,
  updateSummary: (id: number) => `v1/readingLog/${id}/summary`,
  updateNote: (id: number) => `v1/readingLog/${id}/note`,
};

export const CollectionEndPoint = {
  getList: () => `v2/collections`,
  getOne: (id: number) => `v2/collections/${id}`,
  create: () => `v2/collections`,
  delete: (id: number) => `v2/collections/${id}`,
  addBookToCollection: (id: number) => `v2/collections/${id}/book`,
  removeBookFromCollection: (id: number, isbn: string) => `v2/collections/${id}/book/${isbn}`,
  isExistBookInCollection: (name: string, isbn: string) => `/v2/collections/${name}/book/${isbn}/exists`,
  renameCollection: (id: number) => `v2/collections/${id}`,
};
