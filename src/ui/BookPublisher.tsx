import { styled, css } from "styled-components";

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
`;

const PubCommon = css`
  margin-left: 5px;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::before {
    content: "|";
    margin-right: 5px;
    color: ${(props) => props.theme.colors.gray4};
  }
`;

const Author = styled.div`
  ${PubCommon}
  margin-left: 0;
  max-width: 260px;

  &::before {
    content: "";
    margin-right: 0;
  }
`;

const PublisherInfo = styled.div`
  ${PubCommon}
  max-width: 180px;
`;

const Date = styled.div`
  ${PubCommon}
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
