import { styled } from "styled-components";

const Wrapper = styled.footer`
  height: 120px;
  margin: 144px auto 0 auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Eczar", serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 120px;
  padding: 45px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`;

const Footer = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <div>@Designed By gomdolbook</div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Footer;
