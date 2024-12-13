import {useState} from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'
import Banner from './Banner'
import SearchBar from './SearchBar'
import EmptyLibraryBanner from './EmptyLibraryBanner'
import BookList from './BookList'

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 55px auto 0 auto;
  align-items: center;
  height: 100%;
`

type Props = {}

const MainContent = (props: Props) => {
  const [isLibraryEmpty, setIsLibraryEmpty] = useState(false)
  return (
    <Wrapper>
      {isLibraryEmpty ? (
        <EmptyLibraryBanner />
      ) : (
        <>
          <Banner />
          <SearchBar />
          <BookList />
        </>
      )}
    </Wrapper>
  )
}

export default MainContent
