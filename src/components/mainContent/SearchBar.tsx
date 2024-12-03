import React, {useState} from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 13px;
`
const Search = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 300px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: transparent;
  font-family: 'NanumSquare Neo', sans-serif;
  padding: 10px;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: var(--text-color-light);
    transition: opacity 0.3s;
    font-family: 'Eczar', serif;
  }
`

type Props = {}

const SearchBar = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Wrapper>
      <Search>
        <Input
          type="text"
          value={searchQuery}
          onChange={onChangeValue}
          placeholder="ISBN, NAME, AUTHOR ..."
        />
      </Search>
    </Wrapper>
  )
}

export default SearchBar
