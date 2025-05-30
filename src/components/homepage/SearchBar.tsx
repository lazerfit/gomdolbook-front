import React, { useState } from "react";
import { styled } from "styled-components";
import { SearchResult } from "./index.ts";
import { useKeycloak } from "@react-keycloak/web";
import { LoginRequireModal } from "@/ui/index.ts";
import { useBookSearch } from "@/hooks/index.ts";

const SearchBarWrapper = styled.section`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 13px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: 30px;
  }
`;
const SearchInputWrapper = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  width: 300px;
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: transparent;
  font-family: ${(props) => props.theme.fonts.text}, sans-serif;
  padding: 10px;
  box-shadow: ${(props) => props.theme.shadow.light};
  outline: none;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray5};
    transition: opacity 0.3s;
    font-family: ${(props) => props.theme.fonts.english}, serif;
  }
`;

interface Props {
  isCollection?: boolean;
}

const SearchBar = ({ isCollection = false }: Props) => {
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showLoginRequireModal, setShowLoginRequireModal] = useState(false);
  const { searchText, setSearchText, handleSearchTextChange } = useBookSearch();

  const { keycloak } = useKeycloak();
  const handleSearchEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchText.trim() !== "" && event.key === "Enter") {
      if (!keycloak.authenticated) {
        setShowLoginRequireModal(true);
        return;
      }
      setShowSearchResult(true);
    }
  };
  const closeSearchResult = () => {
    setShowSearchResult(false);
    setSearchText("");
  };
  const closeLoginRequireModal = () => {
    setShowLoginRequireModal(false);
  };

  return (
    <SearchBarWrapper>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="ISBN, NAME, AUTHOR ..."
          onKeyDown={handleSearchEnterPress}
        />
      </SearchInputWrapper>
      {showSearchResult && (
        <SearchResult
          text={searchText}
          onClose={closeSearchResult}
          isCollection={isCollection}
        />
      )}
      {showLoginRequireModal && <LoginRequireModal onClose={closeLoginRequireModal} />}
    </SearchBarWrapper>
  );
};

export default SearchBar;
