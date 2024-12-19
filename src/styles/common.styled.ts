import { styled, css } from "styled-components";

const PublisherDetail = styled.div`
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

const Publisher = styled.div`
  ${PubCommon}
`;

const Date = styled.div`
  ${PubCommon}
  color: ${(props) => props.theme.colors.gray6};
`;

export const PublisherStyle = {
  PublisherDetail,
  Publisher,
  Date,
};
