import { styled } from "styled-components";
import { motion } from "framer-motion";

export const ReadingLogWrapper = styled(motion.section)`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
  }
`;

export const BookTitle = styled.h3``;

export const BookImageWrapper = styled.div`
  width: 200px;
  min-width: 12.5rem;
  text-align: center;
`;

export const BookImage = styled.img`
  width: 200px;
  min-width: 12.5rem;
  box-shadow: ${(props) => props.theme.shadow.light};
  margin-top: 13px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    min-width: 0;
    width: 100px;
  }
`;

export const ReadingStatus = styled.div`
  margin-top: 20px;
  width: 90px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray3};
  color: ${(props) => props.theme.colors.gray6};
  box-shadow: ${(props) => props.theme.shadow.light};
`;

export const ReadingLogNoteBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 13px;
  margin-top: 40px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ReadingLogNote = styled.article`
  width: 600px;
  min-width: 37.5rem;
  min-height: 18.75rem;
  padding: 10px;
  box-shadow: ${(props) => props.theme.shadow.light};
  border: 2px solid black;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    min-width: 30%;
    width: 100%;
  }
`;

export const NoteTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModifyButton = styled.div`
  background-color: transparent;
  font-size: 1.125rem;
  cursor: pointer;
`;

export const NoteContent = styled.div`
  margin-top: 10px;
  width: 100%;
  max-height: 300px;
  min-height: 9.375rem;
  color: ${(props) => props.theme.colors.gray5};
  font-size: 0.938rem;
  overflow-y: scroll;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ModalContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 100px 100px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    margin: 60px 0;
  }
`;

export const ModalTitle = styled.h1`
  font-size: 1.5rem;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ModalWysiwyg = styled.div`
  margin-top: 30px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ModalSaveButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ModalSaveButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  border-radius: 10px;
  transition: all 0.5s ease;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  &:hover {
    transform: translate(5px, -5px);
    box-shadow: -3px 3px #cd6133;
  }
`;

export const ModalUpdateButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex-direction: column;
  gap: 10px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ModalUpdateButton = styled.button`
  padding: 10px;
  font-size: 1.2rem;
  min-width: 100px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  transition: all 0.5s ease;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  &:hover {
    transform: translate(5px, -5px);
    box-shadow: -3px 3px #cd6133;
  }
`;
