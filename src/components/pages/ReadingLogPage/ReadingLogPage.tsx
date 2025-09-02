import { css, styled } from 'styled-components';
import React, { useMemo, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Screen } from '@/components/templates/Screen';
import { useReadinglog, useUpdateRating, useUpdateStatus, useUpdateSummary, useUpdateNote, useStatus } from '@/hooks';
import ReadingLogBookInfo from '@/components/molecules/ReadingLogBookInfo';
import ReadingLogBox from '@/components/molecules/ReadingLogBox';
import { useQueryClient } from '@tanstack/react-query';
import { BookStatus } from '@/api/services/types';
import { motion } from 'framer-motion';
import Loader from '@/components/atoms/Loader';
import DOMPurify from 'dompurify';

const TinyMCE = lazy(() => import('@/utils/TinyMCE'));

const Wrapper = styled(Screen)`
  margin-top: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: var(--space-4);
`;

const Content = styled.div`
  display: flex;
  gap: var(--space-4);
`;

const SummaryItem = styled.div`
  width: 100%;
  height: 11rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color-2);
  padding: var(--space-2);
  word-break: break-all;
  overflow: auto;
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
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color-2);
  padding: var(--space-2-5);
  word-break: break-all;
  overflow: auto;
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

  const { data: readingLog, isLoading } = useReadinglog(numberId);
  const { data: status } = useStatus(isbn);
  const { mutate: updateRating } = useUpdateRating();
  const { mutate: updateReadingStatus } = useUpdateStatus();
  const { mutate: updateSummary } = useUpdateSummary();
  const { mutate: updateNote } = useUpdateNote();

  const [isSummaryEdit, setIsSummaryEdit] = useState(false);
  const [isNoteEdit, setIsNoteEdit] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [summaryValue, setSummaryValue] = useState(readingLog?.summary ?? '');

  const sanitizedSummary = useMemo(() => DOMPurify.sanitize(readingLog?.summary ?? ''), [readingLog?.summary]);
  const sanitizedNote = useMemo(() => DOMPurify.sanitize(readingLog?.note ?? ''), [readingLog?.note]);

  const placeholderText = '나만의 언어로 내용을 요약해보세요. . .';

  const invalidateReadingLogQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['readingLog', numberId] });
  };

  const handleRatingClick = (rating: number) => {
    updateRating(
      {
        id: numberId,
        star: rating,
      },
      {
        onSuccess: () => {
          invalidateReadingLogQuery().catch(e => console.log(e));
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
          queryClient.invalidateQueries({ queryKey: ['status', isbn] }).catch(e => console.log(e));
        },
        onError: e => console.log(e),
      },
    );
  };

  const handleSaveSummary = () => {
    if (summaryValue) {
      updateSummary(
        { id: numberId, summary: summaryValue },
        {
          onSuccess: () => {
            invalidateReadingLogQuery().catch(e => console.log(e));
            setIsSummaryEdit(false);
          },
          onError: e => console.log(e),
        },
      );
    }
  };

  const handleSaveNote = () => {
    if (noteValue) {
      updateNote(
        { id: numberId, note: noteValue },
        {
          onSuccess: () => {
            invalidateReadingLogQuery().catch(e => console.log(e));
            setIsNoteEdit(false);
          },
          onError: e => console.log(e),
        },
      );
    }
  };

  if (!readingLog || isLoading) return <Loader />;

  return (
    <Wrapper>
      <Content>
        <ReadingLogBookInfo
          readingLog={readingLog}
          status={status ?? BookStatus.NEW}
          onRatingClick={handleRatingClick}
          onStatusClick={handleReadingStatusClick}
        />
        <ReadingLogBox
          size="small"
          title="summary"
          onEditClick={() => setIsSummaryEdit(true)}
          isEditMode={isSummaryEdit}
          onSaveClick={handleSaveSummary}
          close={() => setIsSummaryEdit(false)}>
          <SummaryItem>
            {isSummaryEdit ? (
              <SummaryTextArea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                placeholder={placeholderText}
                value={summaryValue}
                onChange={e => setSummaryValue(e.target.value)}
              />
            ) : (
              <SummaryNote dangerouslySetInnerHTML={{ __html: sanitizedSummary }} />
            )}
          </SummaryItem>
        </ReadingLogBox>
      </Content>
      <ReadingLogBox
        size="big"
        title="note"
        close={() => setIsNoteEdit(false)}
        onEditClick={() => setIsNoteEdit(true)}
        onSaveClick={handleSaveNote}
        isEditMode={isNoteEdit}>
        {isNoteEdit ? (
          <Suspense fallback={<Loader />}>
            <EditorContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <TinyMCE
                placeholder={readingLog.note ?? placeholderText}
                onChangeValue={newValue => setNoteValue(newValue)}
              />
            </EditorContainer>
          </Suspense>
        ) : (
          <NoteItem dangerouslySetInnerHTML={{ __html: sanitizedNote }} />
        )}
      </ReadingLogBox>
    </Wrapper>
  );
};

export default ReadingLogPage;
