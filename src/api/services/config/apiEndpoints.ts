export const BookEndPoint = {
  getBook: (isbn: string) => `/book/${isbn}`,
  getReadingLog: () => `/readingLog`,
  updateReadingLog: () => `/readingLog/update`,
  saveBook: () => "/book/save",
  getStatus: (isbn: string) => `/status/${isbn}`,
  updateStatus: (isbn: string) => `/status/${isbn}/update`,
  getBookSearchResult: () => "/book/search",
  getLibrary: () => "/book/Library",
};

export const CollectionEndPoint = {
  getList: () => `/collection/list`,
  getOne: (name: string) => `/collection/${name}`,
  create: () => `/collection/create`,
  addBook: (name: string) => `/collection/${name}/book/add`,
  removeBook: (name: string) => `/collection/${name}/book/remove`,
};
