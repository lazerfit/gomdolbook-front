import { styled } from 'styled-components';
import React from 'react';
import { useInputText } from '@/hooks';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const InputLabel = styled.label`
  display: none;
`;

const BookSearchInput = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const handleSearchEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchValue.trim() !== '' && event.key === 'Enter') {
      if (!keycloak.authenticated) {
        console.log('Authentication required to search books.');
        return;
      }
      navigate(`/search/${searchValue}`);
    }
  };

  const [searchValue, searchInput] = useInputText({
    placeholder: 'ISBN, NAME, AUTHOR ...',
    onKeyDown: handleSearchEnterPress,
    id: 'searchInput',
  });

  return (
    <>
      <InputLabel htmlFor="searchInput">Search</InputLabel>
      {searchInput}
    </>
  );
};

export default BookSearchInput;
