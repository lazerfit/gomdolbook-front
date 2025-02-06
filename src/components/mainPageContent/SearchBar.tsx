import React, { useState } from "react";
import { styled } from "styled-components";
import SearchResult from "./SearchResult.tsx";
import { useKeycloak } from "@react-keycloak/web";
import Modal from "@/ui/Modal.tsx";

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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalBtn = styled.button`
  margin-left: auto;
  background-color: ${(prop) => prop.theme.colors.black};
  padding: 10px;
  border-radius: 10px;
  color: ${(prop) => prop.theme.colors.white};
  cursor: pointer;
`;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { keycloak } = useKeycloak();
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.trim() !== "" && event.key === "Enter") {
      if (!keycloak.authenticated) {
        setShowModal(true);
        return;
      }
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
      {showModal && (
        <Modal
          $innerWidth="300px"
          $innerHeight="140px"
          onClose={() => setShowModal(false)}
        >
          <ModalContent>
            <div>로그인이 필요합니다.</div>
            <ModalBtn onClick={() => setShowModal(false)}>확인</ModalBtn>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export default SearchBar;
