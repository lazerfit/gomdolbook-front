import * as S from "@/pages/ReadingLogPage.styles.ts";
import { FaRegPenToSquare } from "react-icons/fa6";
import DOMPurify from "dompurify";
import { NoteContentData } from "@/hooks/useReadingLogNote.ts";

const sanitizeHtmlContent = (text: string) => {
  const sanitized = DOMPurify.sanitize(text);

  return { __html: sanitized };
};

interface Props {
  noteContentData: NoteContentData[];
  openReadingLogModal: (id: string, title: string, placeholder: string) => void;
}

const ReadingLogNote = ({ noteContentData, openReadingLogModal }: Props) => {
  return (
    <S.ReadingLogNoteBox>
      {noteContentData.map((content) => (
        <S.ReadingLogNote key={content.note}>
          <S.NoteTitle>
            <h4>{content.title}</h4>
            <S.ModifyButton
              data-testid={"modifyBtn-" + content.note}
              onClick={() =>
                openReadingLogModal(content.note, content.title, content.text)
              }
            >
              <FaRegPenToSquare />
            </S.ModifyButton>
          </S.NoteTitle>
          <S.NoteContent
            dangerouslySetInnerHTML={sanitizeHtmlContent(content.text)}
          ></S.NoteContent>
        </S.ReadingLogNote>
      ))}
    </S.ReadingLogNoteBox>
  );
};

export default ReadingLogNote;
