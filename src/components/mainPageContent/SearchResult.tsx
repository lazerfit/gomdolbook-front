import React, { useState } from "react";
import { styled } from "styled-components";
import { BookDetails } from "../shared/index.ts";
import { Publisher, Modal, SimpleSkeletonLoader } from "@/ui/index.ts";
import { useBook } from "@/hooks/queries/index.ts";

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 21px;
`;

const Input = styled.input`
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
    font-family: "Eczar", serif;
  }
`;

const MainContentWrapper = styled.div`
  margin: 21px auto;
`;

const Books = styled.div`
  width: 850px;
  height: 200px;
  min-height: 12.5rem;
  margin-top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 13px 21px 23px 21px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

const Image = styled.img`
  width: 100px;
  min-width: 6.25rem;
  height: 140px;
  min-height: 8.75rem;
  border-radius: 5px;
`;

const Infomation = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
  margin: 0 21px;
`;

const Title = styled.h3`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
`;

const Description = styled.div`
  margin-top: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.gray6};
`;

interface Props {
  query: string;
  onResultClose: () => void;
}

const SearchResult = ({ query, onResultClose }: Props) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [isBookSelected, setIsBookSelected] = useState(false);
  const [getIsbn, setGetIsbn] = useState("");
  const [reFetchQuery, setRefetchQuery] = useState(query);
  const { searchResult, isSearchResultLoading } = useBook({ q: reFetchQuery });

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const onRefetchQuery = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.trim() && event.key === "Enter") {
      setRefetchQuery(searchQuery);
    }
  };
  const onSelectBook = (isbn: string) => {
    setIsBookSelected(true);
    setGetIsbn(isbn);
  };
  const onReturnToBookList = () => {
    setIsBookSelected(false);
  };

  return (
    <Modal innerWidth="1180px" innerHeight="90%" onClose={onResultClose}>
      {isBookSelected ? (
        <BookDetails isbn={getIsbn} onClose={onReturnToBookList} />
      ) : (
        <ContentWrapper>
          <InputWrapper>
            <Input
              value={searchQuery}
              onChange={onChangeQuery}
              placeholder="ISBN, NAME, AUTHOR ..."
              onKeyDown={onRefetchQuery}
            />
          </InputWrapper>
          <MainContentWrapper>
            {isSearchResultLoading ? (
              <SimpleSkeletonLoader $width="700px" $n={6} />
            ) : (
              searchResult.map((book) => (
                <Books onClick={() => onSelectBook(book.isbn13)} key={book.isbn13}>
                  <Image src={book.cover} />
                  <Infomation>
                    <Title>{book.title}</Title>
                    <Publisher
                      author={book.author}
                      publisher={book.publisher}
                      date={book.pubDate}
                      align="flex-start"
                    />
                    <Description>{book.description}</Description>
                  </Infomation>
                </Books>
              ))
            )}
          </MainContentWrapper>
        </ContentWrapper>
      )}
    </Modal>
  );
};

export default SearchResult;
