export const BookEndPoint = {
  getBook: (isbn: string) => `v1/book/${isbn}`,
  getReadingLog: () => `v1/readingLog`,
  updateRating: () => `v1/readingLog/rating/update`,
  updateReadingLog: () => `v1/readingLog/update`,
  saveBook: () => "v1/book/save",
  getStatus: (isbn: string) => `v1/status/${isbn}`,
  updateStatus: (isbn: string) => `v1/status/${isbn}/update`,
  getBookSearchResult: () => "v1/book/search",
  getLibrary: () => "v1/book/Library",
  getFinishedBookCalendarData: () => "v1/book/calendar/finished",
};

export const CollectionEndPoint = {
  getList: () => `v2/collections`,
  getOne: (name: string) => `v2/collections/${name}`,
  create: () => `v2/collections`,
  delete: (name: string) => `v2/collections/${name}`,
  addBookToCollection: (name: string) => `v2/collections/${name}/book`,
  removeBookFromCollection: (name: string, isbn: string) =>
    `v2/collections/${name}/book/${isbn}`,
  isExistBookInCollection: (name: string, isbn: string) =>
    `/v2/collections/${name}/book/${isbn}/exists`,
};
