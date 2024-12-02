import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Search = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 300px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: transparent;
  padding: 5px;
  font-family: 'Eczar', serif;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: var(--text-color-light);
    transition: opacity 0.3s;
  }
`

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <Wrapper>
      <Search>
        <Input placeholder="ISBN, NAME, AUTHOR ..." />
      </Search>
    </Wrapper>
  )
}

export default SearchBar
