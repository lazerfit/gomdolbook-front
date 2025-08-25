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
    padding: 2rem;
  }
`;

const Content = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 2rem;
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
  margin: 1rem;
  line-height: 1;

  ${mediaMax.mobile} {
    font-size: 1.2rem;
    width: 50%;
    line-height: 1.2;
  }
`;

const Button = styled(motion.button)`
  padding: 20px 25px;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  ${mediaMax.mobile} {
    padding: 10px 15px;
    font-size: 0.8rem;
    border-radius: 10px;
    margin-top: 0.5rem;
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
