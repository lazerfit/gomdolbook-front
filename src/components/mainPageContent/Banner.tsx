import { styled } from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  display: flex;
`;

const MainSlogan = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 5.563rem;
  font-weight: 600;
  line-height: 120%;
  font-family: ${(props) => props.theme.fonts.english}, serif;
`;

const Banner = () => {
  return (
    <Wrapper>
      <MainSlogan>Collect your Books</MainSlogan>
    </Wrapper>
  );
};

export default Banner;
