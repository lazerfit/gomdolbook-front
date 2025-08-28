import { css, styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { CommonBox } from '@/components/atoms/Box';
import { BookCoverMidBig } from '@/components/atoms/BookCover';
import { BookStatus, ReadingLogResponse } from '@/api/services/types';
import { StatusButtonOptions, transformReadingDate } from '@/utils';

const BookInfoContainer = styled(CommonBox)`
  width: 25rem;
  height: 15rem;
`;

const BookCover = styled(BookCoverMidBig)``;

const BookInfo = styled.div`
  ${mixins.flexCenter}
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: var(--space-1-5);
  gap: var(--space-1);
  width: 100%;
`;

const BookInfoItem = styled.div`
  border-bottom: 1px solid var(--grey4);
  width: 100%;
  display: flex;
  padding: var(--space-half);
`;

const RatingContainer = styled.div`
  width: 100%;
  display: flex;
  gap: var(--space-1);
`;

const CheckedIcon = css<{ $checked: boolean }>`
  &::before {
    content: '${props => (props.$checked ? 'V' : '')}';
    position: absolute;
    color: var(--danger-color);
    top: 0.1rem;
    left: 0;
    font-size: 1rem;
  }
`;

const Rating = styled.button<{ $checked: boolean }>`
  padding: var(--space-half);
  position: relative;

  &:disabled {
    color: var(--primary-text);
  }

  ${CheckedIcon};
`;

const BookInfoSubTitle = styled.div`
  display: inline-block;
  margin-right: var(--space-2);
  color: var(--secondary-text);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--space-1);
`;

const Button = styled.button<{ $checked: boolean }>`
  width: 3.5rem;
  background-color: transparent;
  padding: 0;
  position: relative;

  ${CheckedIcon};

  &::before {
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
  }

  p {
    font-size: var(--font-size-sm);
  }
`;

interface Props {
  readingLog: ReadingLogResponse;
  onRatingClick: (rating: number) => void;
  onStatusClick: (status: BookStatus) => void;
}

const ReadingLogBookInfo = ({ readingLog, onRatingClick, onStatusClick }: Props) => {
  const convertTitle = (title: string) => {
    if (!title) return '';
    const [mainTitle] = title.split('-', 1);
    return mainTitle;
  };

  return (
    <BookInfoContainer>
      <BookCover src={readingLog?.cover} alt="cover" />
      <BookInfo>
        <BookInfoItem>
          <BookInfoSubTitle>title</BookInfoSubTitle>
          {convertTitle(readingLog?.title ?? '')}
        </BookInfoItem>
        <BookInfoItem>
          <BookInfoSubTitle>author</BookInfoSubTitle>
          {readingLog?.author}
        </BookInfoItem>
        <BookInfoItem>
          <BookInfoSubTitle>date</BookInfoSubTitle>
          {transformReadingDate(readingLog?.startedAt ?? '')} - {transformReadingDate(readingLog?.finishedAt ?? '')}
        </BookInfoItem>
        <BookInfoItem>
          <BookInfoSubTitle>ratings</BookInfoSubTitle>
          <RatingContainer>
            {Array.from({ length: 5 }, (_, index) => (
              <Rating
                $checked={readingLog?.rating === index + 1}
                disabled={readingLog?.rating === index + 1}
                key={index}
                data-testid={`rating-${index}`}
                onClick={() => onRatingClick(index + 1)}>
                {index + 1}
              </Rating>
            ))}
          </RatingContainer>
        </BookInfoItem>
        <BookInfoItem>
          <BookInfoSubTitle>status</BookInfoSubTitle>
          <ButtonContainer>
            {StatusButtonOptions.map(option => {
              return (
                <Button
                  key={option.status}
                  $checked={readingLog?.status === option.status}
                  data-testid={`status-${option.status}`}
                  onClick={() => onStatusClick(option.status)}>
                  {option.label}
                </Button>
              );
            })}
          </ButtonContainer>
        </BookInfoItem>
      </BookInfo>
    </BookInfoContainer>
  );
};

export default ReadingLogBookInfo;
