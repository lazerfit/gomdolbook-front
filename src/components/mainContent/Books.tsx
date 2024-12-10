import React from 'react'
import styled, {keyframes} from 'styled-components'
import '../../styles/variables.css'
import SearchBar from './SearchBar'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 48px;
`

const ContentWrapper = styled.div`
  width: 280px;
  height: 410px;
  margin-top: 36px;
  display: flex;
  border: 1px solid black;
`

const EmptyLibraryWrapper = styled.div`
  width: 100%;
  height: 63vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const SloganAnimation = keyframes`
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`

const Slogan = styled.div`
  text-align: center;
  /* font-family: 'NanumSquare Neo', sans-serif; */
  font-family: 'YES24';
  animation: ${SloganAnimation} 2s ease-in-out;
`

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  filter: grayscale(100%);
  transition: all 0.5s ease;

  &:hover {
    filter: none;
  }
`

type Props = {}

function Books(props: Props) {
  return (
    <Wrapper>
      <EmptyLibraryWrapper>
        <Slogan className="title-lg">책장이 비어있다고요?</Slogan>
        <Slogan className="title-lg">
          책을 추가하여 당신의 독서 기록을 시작해보세요.
        </Slogan>
        <SearchBar />
      </EmptyLibraryWrapper>

      {/* <ContentWrapper>
        <Image src="https://image.yes24.com/goods/136251571/XL" />
      </ContentWrapper>
      <ContentWrapper>
        <Image src="https://image.yes24.com/goods/139592911/XL" />
      </ContentWrapper>
      <ContentWrapper>
        <Image src="https://image.yes24.com/goods/129132678/XL" />
      </ContentWrapper>
      <ContentWrapper>
        <Image src="https://image.yes24.com/goods/135903172/XL" />
      </ContentWrapper>
      <ContentWrapper>
        <Image src="https://image.yes24.com/goods/135903172/XL" />
      </ContentWrapper> */}
    </Wrapper>
  )
}

export default Books
