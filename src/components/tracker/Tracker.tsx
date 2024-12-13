import styled from 'styled-components'
import '../../styles/variables.css'
import {FaRegPenToSquare} from 'react-icons/fa6'

const Wrapper = styled.section`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h3``

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

const ImageWrapper = styled.div`
  width: 200px;
  text-align: center;
`

const Image = styled.img`
  width: 200px;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  border-radius: 8px;
  margin-top: 13px;
`

const Rating = styled.div`
  width: 200px;
  margin-top: 13px;
  font-size: 21px;
`

const ContentWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 13px;
  margin-top: 34px;
`

const AnalyzeContent = styled.article`
  width: 500px;
  min-height: 200px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
`

const ModifyButton = styled.div`
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 13px;
  gap: 5px;
`

const Content = styled.div`
  margin-top: 10px;
`

const EmptyContent = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  background-color: transparent;
  font-family: 'YESGothic-Regular';

  &::placeholder {
    color: var(--text-color-disable);
    padding: 5px;
  }
`

interface Data {
  title: string
  placeholder: string
}

type Props = {}

const Tracker = (props: Props) => {
  const analyzeContentData: Data[] = [
    {
      title: '1. 무엇을 다룬 책인지 알아내기',
      placeholder: '중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요.'
    },
    {
      title: '2. 내용 해석하기',
      placeholder:
        '중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요.'
    },
    {
      title: '3. 비평하기',
      placeholder:
        '저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요.'
    }
  ]

  return (
    <Wrapper>
      <Title>
        절망하는 이들을 위한 민주주의{' '}
        <span style={{position: 'absolute', right: '30px', border: '1px solid black'}}>
          <button>메뉴</button>
        </span>
      </Title>
      <PublisherDetail>
        <div>최태현 (지은이)</div>
        <Publisher>창비</Publisher>
        <Date>2023.09.08</Date>
      </PublisherDetail>
      <ImageWrapper>
        <Image src="https://image.yes24.com/goods/122339211/XL" />
        <Rating>⭐⭐⭐⭐⭐</Rating>
      </ImageWrapper>
      <ContentWrapper>
        {analyzeContentData.map((content, index) => (
          <AnalyzeContent key={index}>
            <ContentTitle>
              <h4>{content.title}</h4>
              <ModifyButton>
                <FaRegPenToSquare />
              </ModifyButton>
            </ContentTitle>
            <EmptyContent placeholder={content.placeholder} />
          </AnalyzeContent>
        ))}
        {/* <AnalyzeContent>
          <ContentTitle>
            <h4>1. 무엇을 다룬 책인지 알아내기</h4>
            <ModifyButton>
              <FaRegPenToSquare />
            </ModifyButton>
          </ContentTitle>
          <EmptyContent>
            중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요.
          </EmptyContent>
        </AnalyzeContent>
        <AnalyzeContent>
          <ContentTitle>
            <h4>2. 내용 해석하기</h4>
            <ModifyButton>
              <FaRegPenToSquare />
            </ModifyButton>
          </ContentTitle>
          <EmptyContent>
            중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와
            그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요.
          </EmptyContent>
        </AnalyzeContent>
        <AnalyzeContent>
          <ContentTitle>
            <h4>3. 비평하기</h4>
            <ModifyButton>
              <FaRegPenToSquare />
            </ModifyButton>
          </ContentTitle>
          <EmptyContent>
            저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한
            내용이나 설명이 불완전한 부분을 적어보세요.
          </EmptyContent>
        </AnalyzeContent> */}
      </ContentWrapper>
    </Wrapper>
  )
}

export default Tracker
