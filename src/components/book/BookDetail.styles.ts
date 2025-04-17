import { styled } from "styled-components";

export const BookDetailWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const ThreeDotMenuWrapper = styled.div`
  margin-top: 60px;
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 20px;
  padding-left: 30px;
  background-color: transparent;
  cursor: pointer;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    margin: 8px 0 0 0;
  }
`;

export const BookContentWrapper = styled.div`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px;
  width: 500px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    margin: 17px auto;
  }
`;

export const BookInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 34px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const BookCover = styled.img`
  width: 150px;
  min-width: 9.375rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

export const BookTitle = styled.h3`
  overflow: hidden;
  width: 500px;
  font-weight: 700;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const BookSubInformation = styled.div`
  font-size: 0.938rem;
  margin-top: 21px;
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  > div:nth-child(1) {
    margin-bottom: 5px;
  }
`;

export const BookDescription = styled.div`
  font-size: 0.938rem;
  margin-top: 21px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 500px;
  min-width: 31.25rem;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    min-width: 0;
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 13px;
  margin: 34px auto;
`;
