import { styled } from "styled-components";

export const SearchResultContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  @media (${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 21px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    margin-top: 50px;
  }
`;

export const SearchInput = styled.input`
  width: 430px;
  min-width: 26.875rem;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: transparent;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    min-width: 0;
    width: 100%;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray6};
    transition: opacity 0.3s;
    font-family: ${(props) => props.theme.fonts.english}, serif;
  }
`;

export const SearchResultContent = styled.div`
  margin: 21px auto;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  @media (${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const BookListItem = styled.article`
  width: 850px;
  height: 200px;
  min-height: 12.5rem;
  margin-top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 13px 21px 23px 21px;
  box-shadow: rgba(17, 17, 26, 0.1) 0 1px 0;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  @media (${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const BookImage = styled.img`
  width: 100px;
  min-width: 6.25rem;
  height: 140px;
  min-height: 8.75rem;
  border-radius: 5px;
`;

export const BookInformation = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
  margin: 0 21px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 60%;
  }
`;

export const BookTitle = styled.h3`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    -webkit-line-clamp: 3;
  }
`;

export const BookDescription = styled.p`
  margin-top: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.gray6};

  @media (${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;
