import { css, styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { CommonBox } from '@/components/atoms/Box';
import { BookCoverMidBig } from '@/components/atoms/BookCover';
import { BookStatus, ReadingLogResponse } from '@/api/services/types';
import { StatusButtonOptions } from '@/utils';

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
  margin-left: 1rem;
  gap: 0.5rem;
  width: 100%;
`;

const BookInfoItem = styled.div`
  border-bottom: 1px solid var(--point2);
  width: 100%;
  padding: 0.1rem 0;
  display: flex;
`;

const RatingContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
`;

const CheckedIcon = css<{ $checked: boolean }>`
  &::before {
    content: '${props => (props.$checked ? 'V' : '')}';
    position: absolute;
    color: var(--tomato);
    top: 0.1rem;
    left: 0;
    font-size: 1rem;
  }
`;

const Rating = styled.button<{ $checked: boolean }>`
  padding: 0.2rem;
  position: relative;

  &:disabled {
    color: var(--black);
  }

  ${CheckedIcon};
`;

const BookInfoSubTitle = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  color: var(--point2);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.2rem;
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
`;

interface Props {
  readingLog: ReadingLogResponse;
  onRatingClick: (rating: number) => void;
  onStatusClick: (status: BookStatus) => void;
}

const ReadingLogBookInfo = ({ readingLog, onRatingClick, onStatusClick }: Props) => {
  const convertTitle = (title: string) => {
    if (!title) return '';
    const [mainTitle] = title.split('-');
    return mainTitle;
  };

  const convertDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const year = String(date.getFullYear()).slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    } catch {
      console.log('Invalid date string');
      return '';
    }
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
          {convertDate(readingLog?.startedAt ?? '')} - {convertDate(readingLog?.finishedAt ?? '')}
        </BookInfoItem>
        <BookInfoItem>
          <BookInfoSubTitle>ratings</BookInfoSubTitle>
          <RatingContainer>
            {Array.from({ length: 5 }, (_, index) => (
              <Rating
                $checked={readingLog?.rating === index + 1}
                disabled={readingLog?.rating === index + 1}
                key={index}
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
