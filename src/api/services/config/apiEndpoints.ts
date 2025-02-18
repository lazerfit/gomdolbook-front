export const BookEndPoint = {
  getBook: (isbn: string) => `/book/${isbn}`,
  getReadingLog: (isbn: string) => `/readingLog/${isbn}`,
  saveReadingLog: () => "/book/save",
  getStatus: (isbn: string) => `/status/${isbn}`,
  getBookSearchResult: () => "/book/search",
  getLibrary: () => "/book/Library",
};

export const CollectionEndPoint = {
  getList: () => `/collection/list`,
  getOne: (name: string) => `/collection/${name}`,
  create: () => `/collection/create`,
  addBooks: (name: string) => `/collection/${name}/addBook`,
};
