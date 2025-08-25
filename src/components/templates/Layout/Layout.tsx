import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import { useOutlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Main = styled.div`
  flex: 1;
  padding: 100px 0;
  width: 100%;
`;

const Layout = () => {
  const outlet = useOutlet();

  return (
    <Wrapper>
      <Header />
      <Main>{outlet}</Main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
