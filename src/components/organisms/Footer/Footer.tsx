import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { mediaMax } from '@/utils';
import { fontFamily } from '@/utils/variables';

const Wrapper = styled.footer`
  width: 100%;
  height: 120px;
  margin: 0 auto;
  padding: var(--space-2) var(--space-1-5);
  ${mixins.flexCenter};
  flex-direction: column;
  font-family: ${fontFamily.english}, serif;
  background-color: var(--background-light);
  border-top: 1px solid var(--primary-text);

  ${mediaMax.mobile} {
    width: 95%;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 120px;
  padding: var(--space-6) 0;
  ${mixins.flexCenter}
  flex-direction: row;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        <div>@Designed By lazerfit</div>
      </Content>
    </Wrapper>
  );
};

export default Footer;
