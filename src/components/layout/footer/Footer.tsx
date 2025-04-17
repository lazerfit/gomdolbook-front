import { styled } from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  height: 120px;
  margin: 0 auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${(props) => props.theme.fonts.english}, serif;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 95%;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  height: 120px;
  padding: 45px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.colors.black};
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <div>@Designed By gomdolbook</div>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
