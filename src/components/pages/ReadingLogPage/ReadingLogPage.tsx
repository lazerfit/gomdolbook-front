import { css, styled } from 'styled-components';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Screen } from '@/components/templates/Screen';
import { useReadinglog, useUpdateRating, useUpdateStatus } from '@/hooks';
import ReadingLogBookInfo from '@/components/molecules/ReadingLogBookInfo';
import ReadingLogBox from '@/components/molecules/ReadingLogBox';
import { useQueryClient } from '@tanstack/react-query';
import { BookStatus } from '@/api/services/types';
import { motion } from 'framer-motion';
import TinyMCE from '@/utils/TinyMCE';

const Wrapper = styled(Screen)`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
`;

const SummaryItem = styled.div`
  width: 100%;
  height: 11rem;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--border2);
  padding: 1rem;
  word-break: break-all;
  overflow: scroll;
`;

const noteGradiant = css`
  background-image: linear-gradient(to bottom, transparent 95%, #e0e0e0 95%);
  background-size: 100% 1.5rem;
  line-height: 1.5rem;
`;

const SummaryNote = styled.div`
  width: 100%;
  height: 100%;
  ${noteGradiant};
`;

const NoteItem = styled.div`
  width: 100%;
  min-height: 55rem;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--border2);
  padding: 1.5rem;
  word-break: break-all;
  overflow: scroll;
  ${noteGradiant};
`;

const EditorContainer = styled(motion.div)`
  width: 100%;
  min-height: 55rem;
`;

const SummaryTextArea = styled(motion.textarea)`
  width: 100%;
  height: 90%;
`;

const ReadingLogPage = () => {
  const queryClient = useQueryClient();

  const { isbn = '', id = '0' } = useParams();
  const numberId = useMemo(() => parseInt(id), [id]);
  const [isSummaryEdit, setIsSummaryEdit] = useState(false);
  const [isNoteEdit, setIsNoteEdit] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const { data: readingLog } = useReadinglog(numberId);
  const { mutate: updateRating } = useUpdateRating();
  const { mutate: updateReadingStatus } = useUpdateStatus();

  const handleRatingClick = (rating: number) => {
    updateRating(
      {
        id: numberId,
        star: rating,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['readingLog', isbn] }).catch(e => console.log(e));
        },
        onError: e => console.log(e),
      },
    );
  };

  const handleReadingStatusClick = (status: BookStatus) => {
    updateReadingStatus(
      {
        isbn,
        status,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['readingLog', isbn] }).catch(e => console.log(e));
          queryClient.invalidateQueries({ queryKey: ['status', isbn] }).catch(e => console.log(e));
        },
        onError: e => console.log(e),
      },
    );
  };

  if (!readingLog) return <div>Loading . . .</div>;

  return (
    <Wrapper>
      <Content>
        <ReadingLogBookInfo
          readingLog={readingLog}
          onRatingClick={handleRatingClick}
          onStatusClick={handleReadingStatusClick}
        />
        <ReadingLogBox
          size="small"
          title="summary"
          onEditClick={() => setIsSummaryEdit(true)}
          isEditMode={isSummaryEdit}
          close={() => setIsSummaryEdit(false)}>
          <SummaryItem>
            {isSummaryEdit ? (
              <SummaryTextArea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                placeholder="나만의 언어로 내용을 요약해보세요. . ."
              />
            ) : (
              <SummaryNote>Hi, Hola!, 안녕하세요 만나서 정말 반갑습니다.! 저는 이 책을 매우 좋아합니다!</SummaryNote>
            )}
          </SummaryItem>
        </ReadingLogBox>
      </Content>
      <ReadingLogBox
        size="big"
        title="note"
        close={() => setIsNoteEdit(false)}
        onEditClick={() => setIsNoteEdit(true)}
        isEditMode={isNoteEdit}>
        {isNoteEdit ? (
          <EditorContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <TinyMCE placeholder="감상을 적어주세요. . ." onChangeValue={newValue => setNoteValue(newValue)} />
          </EditorContainer>
        ) : (
          <NoteItem>Hi, Hola!, 안녕하세요 만나서 정말 반갑습니다.!{noteValue}</NoteItem>
        )}
      </ReadingLogBox>
    </Wrapper>
  );
};

export default ReadingLogPage;
