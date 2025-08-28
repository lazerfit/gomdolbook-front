import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { mediaMax } from '@/utils';
import Banner from '@/components/atoms/Banner';
import { StatusBooksResponse } from '@/api/services/types';

const Wrapper = styled.div`
  width: 100%;
  ${mixins.flexRow}
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: var(--space-6);
  margin-top: var(--space-4);

  ${mediaMax} {
    margin-top: 0;
    gap: var(--space-4);
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  ${mixins.flexColumn};
  align-items: center;
  margin-top: var(--space-1-5);

  ${mediaMax} {
    padding: 0 var(--space-4);
  }
`;

interface Props {
  bookCardList: StatusBooksResponse[];
}

const BookCardList = ({ bookCardList = [] }: Props) => {
  return (
    <Wrapper>
      <Content>
        {bookCardList.length === 0 ? <Banner>책을 추가해 독서기록을 시작해보세요.</Banner> : <div>Hi</div>}
      </Content>
    </Wrapper>
  );
};

export default BookCardList;
