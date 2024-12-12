import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
import '../../styles/variables.css'
import BookDetails from './BookDetails'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const Wrapper = styled.div`
  position: absolute;
  width: 1100px;
  height: 90%;
  background-color: var(--background-color);
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  font-family: 'YESGothic-Regular';
`

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CloseButton = styled.button`
  width: 20px;
  position: absolute;
  right: 20px;
  top: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 2em;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 21px;
`

const Input = styled.input`
  width: 430px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: transparent;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: var(--text-color-light);
    transition: opacity 0.3s;
    font-family: 'Eczar', serif;
  }
`

const MainContentWrapper = styled.div`
  margin: 21px auto;
`

const Books = styled.div`
  width: 850px;
  height: 200px;
  margin-top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 13px 21px 23px 21px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`

const Image = styled.img`
  width: 100px;
  height: 140px;
  border-radius: 5px;
`

const Infomation = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
  margin: 0 21px;
`

const Title = styled.div`
  overflow-wrap: break-word;
  font-weight: 700;
`

const PublisherDetail = styled.div`
  margin-top: 8px;
  font-size: 15px;
  display: flex;
`

const Publisher = styled.div`
  margin-left: 5px;

  &::before {
    content: '|';
    margin-right: 5px;
    color: var(--gray-4);
  }
`

const Date = styled.div`
  margin-left: 5px;
  color: var(--text-color-light);

  &::before {
    content: '|';
    margin-right: 5px;
    color: var(--gray-4);
  }
`

const Description = styled.div`
  margin-top: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-color-light);
`

type Props = {
  query: string
  onResultClose: () => void
}

const SearchResult = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState(props.query)
  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }
  const onSelectBook = () => {
    setIsBookSelected(true)
  }
  const onReturnToBookList = () => {
    setIsBookSelected(false)
  }
  const [isBookSelected, setIsBookSelected] = useState(false)
  return (
    <>
      <Overlay onClick={props.onResultClose} />
      <Wrapper className="scale-in">
        {isBookSelected ? (
          <BookDetails onReturnToBookList={onReturnToBookList} />
        ) : (
          <ContentWrapper>
            <CloseButton onClick={props.onResultClose}>&times;</CloseButton>
            <InputWrapper>
              <Input
                value={searchQuery}
                onChange={onChangeQuery}
                placeholder="ISBN, NAME, AUTHOR ..."
              />
            </InputWrapper>
            <MainContentWrapper>
              <Books onClick={onSelectBook}>
                <Image src="https://image.yes24.com/goods/139752827/L" />
                <Infomation>
                  <Title className="title-sm">
                    불가능한 장소에서, 고통의 미메시스와 글쓰기의 드라마마마마마마
                    마마마마마마마마 마마마마마마마글쓰기마마마마마마마
                  </Title>
                  <PublisherDetail>
                    <div>망망이</div>
                    <Publisher>아카넷</Publisher>
                    <Date>2024.12.06</Date>
                  </PublisherDetail>
                  <Description>
                    “우리의 세상은 인간성을 잃어가고 있다. 너무 많은 도시가 영혼이 없고
                    우울한 느낌을 준다. 주위를 둘러보라. 우리를 둘러싸고 있는 건물들이
                    어떤 모습을 하고 있는지.” 『더 인간적인 건축』은 세계에서 가장
                    상상력이 풍부한 디자이너 중 한 명인 토마스 헤더윅이 건축을 통해
                    들려주는 인류와 건축물에 관한 이야기다. 우리가 살아가고 있는, 우리와
                    함께하는 건축물들이 우리에게 어떤 영향을 미치는지, 특히 직선적이고
                    따분한 건축물들이 인간과 환경을 어떻게 집어삼키는지 다양한 사례를
                    기반으로 날카로운 의견을 제시한다. 헤더윅은 우리가 왜 사람들을 아프게
                    하고, 불행하게 만들고, 지구를 파괴하는 건물에 둘러싸여 있는지, 그리고
                    어떻게 하면 모두를 위해 더 나은 도시를 만들 수 있는지에 대해 수백 개의
                    이미지를 통해 열정적인 분석을 제시한다. 또한 30년간 대담하고 아름다운
                    건물을 만들어 온 경험과 신경과학 및 인지심리학을 결합해 건축물에 관한
                    인문학적 이야기를 전한다. 인간적이고, 비인간적인 수백 장의 건축물
                    이미지로 즐비한 이 책은 우리를 ‘인간적인 건축’으로의 여정으로
                    안내한다. 『더 인간적인 건축』은 인류가 따분하지 않은 세상을 다시 지을
                    수 있도록 영감을 줄 책이다.
                  </Description>
                </Infomation>
              </Books>
            </MainContentWrapper>
          </ContentWrapper>
        )}
      </Wrapper>
    </>
  )
}

export default SearchResult
