import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 32px;
  gap: 20px;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 80px;
  border-radius: 8px;
  filter: grayscale(1);
  transition: 0.5s;
`;

interface ICollectionName {
  CollectionName: string;
}

const ItemWrapper = styled.div<ICollectionName>`
  width: 280px;
  height: 280px;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  cursor: pointer;
  position: relative;

  &::before {
    content: "${(props) => props.CollectionName}";
    position: absolute;
    bottom: -30px;
  }

  &:hover > ${Image} {
    filter: grayscale(0);
  }
`;

const AddItem = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 8px;
  padding: 20px;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ItemWrapper
        CollectionName="한강"
        onClick={() => navigate(`${encodeURIComponent("한강")}`)}
      >
        <Image src="https://image.aladin.co.kr/product/4086/97/cover500/8936434128_2.jpg" />
        <Image src="https://image.aladin.co.kr/product/27877/5/cover500/8954682154_3.jpg" />
        <Image src="https://image.aladin.co.kr/product/29137/2/cover500/8936434594_2.jpg" />
        <Image src="https://image.aladin.co.kr/product/14322/3/cover500/8954651135_3.jpg" />
      </ItemWrapper>
      <ItemWrapper CollectionName="test2">MainContent2</ItemWrapper>
      <ItemWrapper CollectionName="test3">MainContent3</ItemWrapper>
      <ItemWrapper CollectionName="test4">MainContent4</ItemWrapper>
      <AddItem>추가하기</AddItem>
    </Wrapper>
  );
};

export default MainContent;
