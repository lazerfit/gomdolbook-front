import React, { useState } from "react";
import { styled } from "styled-components";
import { BookDetail } from "../book/index.ts";
import { BookPublisher, Modal, SimpleSkeletonLoader } from "@/ui/index.ts";
import { useBook, useBookSearch } from "@/hooks/index.ts";

const SearchResultContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 21px;
`;

const SearchInput = styled.input`
  width: 430px;
  min-width: 26.875rem;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: transparent;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray6};
    transition: opacity 0.3s;
    font-family: ${(props) => props.theme.fonts.english}, serif;
  }
`;

const SearchResultContent = styled.div`
  margin: 21px auto;
`;

const BookListItem = styled.article`
  width: 850px;
  height: 200px;
  min-height: 12.5rem;
  margin-top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 13px 21px 23px 21px;
  box-shadow: rgba(17, 17, 26, 0.1) 0 1px 0;
`;

const BookImage = styled.img`
  width: 100px;
  min-width: 6.25rem;
  height: 140px;
  min-height: 8.75rem;
  border-radius: 5px;
`;

const BookInformation = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
  margin: 0 21px;
`;

const BookTitle = styled.h3`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
`;

const BookDescription = styled.p`
  margin-top: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.gray6};
`;

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
    setHasSelectedBook(true);
    setIsbnForDetails(isbn);
  };
  const handleBookDetailClose = () => {
    setHasSelectedBook(false);
  };

  return (
    <Modal innerWidth="1180px" innerHeight="90%" onClose={onClose}>
      {hasSelectedBook ? (
        <BookDetail isbn={isbnForDetails} onClose={handleBookDetailClose} />
      ) : (
        <SearchResultContentWrapper>
          <SearchInputWrapper>
            <SearchInput
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder="ISBN, NAME, AUTHOR ..."
              onKeyDown={handleSearchEnterPress}
            />
          </SearchInputWrapper>
          <SearchResultContent>
            {isSearchResultLoading ? (
              <SimpleSkeletonLoader $width="700px" $n={6} />
            ) : (
              searchResult.map((book) => (
                <BookListItem
                  onClick={() => handleSelectBook(book.isbn13)}
                  key={book.isbn13}
                >
                  <BookImage src={book.cover} />
                  <BookInformation>
                    <BookTitle>{book.title}</BookTitle>
                    <BookPublisher
                      author={book.author}
                      publisher={book.publisher}
                      date={book.pubDate}
                      align="flex-start"
                    />
                    <BookDescription>{book.description}</BookDescription>
                  </BookInformation>
                </BookListItem>
              ))
            )}
          </SearchResultContent>
        </SearchResultContentWrapper>
      )}
    </Modal>
  );
};

export default SearchResult;
