import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as mixins from '@/styles/mixins';
import * as fonts from '@/styles/fonts';
import { mediaMax } from '@/utils';
import { colors } from '@/utils/variables';
import { Screen } from '@/components/templates/Screen';

const Wrapper = styled(Screen)`
  ${mixins.flexCenter};
  height: 100vh;
  width: 1180px;
  font-family: 'winky-sans', sans-serif;

  ${mediaMax.mobile} {
    width: 100vw;
    padding: var(--space-4);
  }
`;

const Content = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: var(--space-4);
`;

const Title = styled.div`
  font-size: 17rem;
  ${fonts.demi};
  line-height: 1;
  margin: 0;

  ${mediaMax.mobile} {
    font-size: 6rem;
  }
`;

const SubTitle = styled.p`
  font-size: 2rem;
  margin: var(--space-2);
  line-height: 1;

  ${mediaMax.mobile} {
    font-size: 1.2rem;
    width: 50%;
    line-height: 1.2;
  }
`;

const Button = styled(motion.button)`
  padding: var(--space-2-5) var(--space-3);
  border: 1px solid black;
  border-radius: var(--radius-full);
  margin-top: var(--space-2);
  cursor: pointer;
  font-size: 1.5rem;

  ${mediaMax.mobile} {
    padding: var(--space-1-5) var(--space-2);
    font-size: 0.8rem;
    border-radius: var(--radius-md);
    margin-top: var(--space-half);
  }
`;

interface ErrorPageProps {
  title: string;
  subTitle: string;
}

const ErrorPage = ({ title, subTitle }: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Content>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <Button
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotateX: 360, backgroundColor: colors.black, color: colors.white }}
          transition={{ type: 'spring', stiffness: 100, damping: 17 }}
          onClick={() => navigate('/')}>
          Back
        </Button>
      </Content>
    </Wrapper>
  );
};

export default ErrorPage;
