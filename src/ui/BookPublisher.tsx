import { styled } from "styled-components";

interface SProps {
  $justifyContent: string;
}

const PublisherWrapper = styled.div<SProps>`
  margin-top: 8px;
  font-size: 0.938rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justifyContent};
  width: 500px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const PubCommon = styled.div`
  margin-left: 5px;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    margin-left: 0;
  }

  &::before {
    content: "|";
    margin-right: 5px;
    color: ${(props) => props.theme.colors.gray4};
  }
`;

const Author = styled(PubCommon)`
  margin-left: 0;
  max-width: 260px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }

  &::before {
    content: none;
    margin-right: 0;
  }
`;

const PublisherInfo = styled(PubCommon)`
  max-width: 180px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 50px;
    max-width: 120px;
    &::before {
      content: none;
      margin-right: 0;
    }
  }
`;

const Date = styled(PubCommon)`
  color: ${(props) => props.theme.colors.gray6};
`;
interface Props {
  author: string;
  publisher: string;
  date: string;
  align?: string;
}

const BookPublisher = ({ author, publisher, date, align = "center" }: Props) => {
  return (
    <PublisherWrapper $justifyContent={align}>
      <Author>{author}</Author>
      <PublisherInfo>{publisher}</PublisherInfo>
      <Date>{date}</Date>
    </PublisherWrapper>
  );
};

export default BookPublisher;
