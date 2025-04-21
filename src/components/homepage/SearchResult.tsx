import React, { useState } from "react";
import { BookDetail } from "../book/index.ts";
import { BookPublisher, Modal, SimpleSkeletonLoader } from "@/ui/index.ts";
import { useBook, useBookSearch } from "@/hooks/index.ts";
import * as S from "./SearchResult.styles.js";

interface Props {
  text: string;
  onClose: () => void;
}

const SearchResult = ({ text, onClose }: Props) => {
  const [hasSelectedBook, setHasSelectedBook] = useState(false);
  const [isbnForDetails, setIsbnForDetails] = useState("");
  const {
    handleSearchEnterPress,
    searchText,
    triggeredEnterPress,
    handleSearchTextChange,
  } = useBookSearch(text);
  const { searchResult, isSearchResultLoading } = useBook({ q: triggeredEnterPress });

  const handleSelectBook = (isbn: string) => {
    setIsbnForDetails(isbn);
    setHasSelectedBook(true);
  };
  const handleBookDetailClose = () => {
    setHasSelectedBook(false);
  };

  return (
    <Modal innerWidth="1180px" innerHeight="90%" onClose={onClose}>
      {hasSelectedBook ? (
        <BookDetail isbn={isbnForDetails} onClose={handleBookDetailClose} />
      ) : (
        <S.SearchResultContentWrapper>
          <S.SearchInputWrapper>
            <S.SearchInput
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder="ISBN, NAME, AUTHOR ..."
              onKeyDown={handleSearchEnterPress}
            />
          </S.SearchInputWrapper>
          <S.SearchResultContent>
            {isSearchResultLoading ? (
              <SimpleSkeletonLoader $width="700px" $n={6} />
            ) : (
              searchResult.map((book) => (
                <S.BookListItem
                  onClick={() => handleSelectBook(book.isbn13)}
                  key={book.isbn13}
                >
                  <S.BookImage src={book.cover} />
                  <S.BookInformation>
                    <S.BookTitle>{book.title}</S.BookTitle>
                    <BookPublisher
                      author={book.author}
                      publisher={book.publisher}
                      date={book.pubDate}
                      align="flex-start"
                    />
                    <S.BookDescription>{book.description}</S.BookDescription>
                  </S.BookInformation>
                </S.BookListItem>
              ))
            )}
          </S.SearchResultContent>
        </S.SearchResultContentWrapper>
      )}
    </Modal>
  );
};

export default SearchResult;
