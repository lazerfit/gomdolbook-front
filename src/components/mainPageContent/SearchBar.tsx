import React, { useState } from "react";
import { styled } from "styled-components";
import SearchResult from "./SearchResult.tsx";

const Wrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 13px;
`;
const Search = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 300px;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 8px;
  background-color: transparent;
  font-family: ${(props) => props.theme.fonts.text}, sans-serif;
  padding: 10px;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray5};
    transition: opacity 0.3s;
    font-family: ${(props) => props.theme.fonts.english}, serif;
  }
`;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const [showSearchResult, setShowSearchResult] = useState(false);
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.trim() !== "" && event.key === "Enter") {
      setShowSearchResult(true);
    }
  };
  const onResultClose = () => {
    setShowSearchResult(false);
    setSearchQuery("");
  };

  return (
    <Wrapper>
      <Search>
        <Input
          type="text"
          value={searchQuery}
          onChange={onChangeQuery}
          placeholder="ISBN, NAME, AUTHOR ..."
          onKeyDown={onKeyDown}
        />
      </Search>
      {showSearchResult && (
        <SearchResult query={searchQuery} onResultClose={onResultClose} />
      )}
    </Wrapper>
  );
};

export default SearchBar;
