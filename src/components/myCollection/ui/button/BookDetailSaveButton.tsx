import { styled } from "styled-components";
import { ButtonMd } from "@/styles/common.styled.ts";
import { BookStatus } from "@/api/services/BoookService.ts";
import { ReactNode } from "react";

const SaveButton = styled(ButtonMd)`
  border: 2px solid ${(porps) => porps.theme.colors.black};
  position: relative;
  overflow: hidden;
  padding: 7px 20px;

  > p {
    position: relative;
    font-size: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    background-color: red;
    border-radius: 20px;
    top: 0;
    left: 0;
  }

  &:nth-child(1)::before {
    background-color: #acd7ec;
  }

  &:nth-child(2)::before {
    background-color: #f4989c;
  }

  &:nth-child(3)::before {
    background-color: #4ea699;
  }

  &:hover::before {
    content: "";
    width: 100%;
    transition: 0.5s;
  }
`;

interface Props {
  saveFn: (status: BookStatus) => void;
  children: ReactNode;
}

const BookDetailSaveButtons = ({ saveFn, children }: Props) => {
  return <SaveButton onClick={() => saveFn}>{children}</SaveButton>;
};

export default BookDetailSaveButtons;
