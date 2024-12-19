import { styled, css } from "styled-components";

const PublisherWrapper = styled.div`
  margin-top: 8px;
  font-size: 15px;
  display: flex;
`;

const PubCommon = css`
  margin-left: 5px;

  &::before {
    content: "|";
    margin-right: 5px;
    color: ${(props) => props.theme.colors.gray4};
  }
`;

const PublisherInfo = styled.div`
  ${PubCommon}
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
      <div>{author}</div>
      <PublisherInfo>{publisher}</PublisherInfo>
      <Date>{date}</Date>
    </PublisherWrapper>
  );
};

export default Publisher;
