import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { mediaMax, transformPublicationDate } from '@/utils';

const Wrapper = styled.div<{ $justifyContent: string }>`
  ${mixins.flexRow};
  align-items: center;
  justify-content: ${props => props.$justifyContent};
  width: 100%;
  font-size: 0.938rem;
  color: var(--grey);
  gap: 10px;

  ${mediaMax} {
    width: 100%;
  }
`;

const Author = styled.div`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${mediaMax} {
    display: none;
  }
`;

const Publisher = styled.div``;

const PublicationDate = styled.div``;

interface BookInformationBoxProps {
  author: string;
  publisher: string;
  publicationDate: string;
  justifyContent?: string;
}

const BookInformationBox = ({
  author = '',
  publisher = '',
  publicationDate = '',
  justifyContent = 'flex-start',
}: BookInformationBoxProps) => {
  return (
    <Wrapper $justifyContent={justifyContent}>
      <Author>{author}</Author>
      <span>·</span>
      <Publisher>{publisher}</Publisher>
      <span>·</span>
      <PublicationDate>{transformPublicationDate(publicationDate)}</PublicationDate>
    </Wrapper>
  );
};

export default BookInformationBox;
