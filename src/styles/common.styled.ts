import { styled } from "styled-components";

export const ButtonMd = styled.button`
  font-family: ${(props) => props.theme.fonts.english};
  font-size: 1rem;
  font-weight: 500;
  line-height: 30px;
  padding: 7px ${(props) => props.theme.fonts.size500};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
`;
