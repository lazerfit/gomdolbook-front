import { styled, css } from "styled-components";

const PublisherWrapper = styled.div`
  margin-top: 8px;
  font-size: 0.938rem;
  display: flex;
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
}

const Publisher = (props: Props) => {
  const { author, publisher, date } = props;
  return (
    <PublisherWrapper>
      <Author>{author}</Author>
      <PublisherInfo>{publisher}</PublisherInfo>
      <Date>{date}</Date>
    </PublisherWrapper>
  );
};

export default Publisher;
