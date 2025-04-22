import Header from "./header/Header.tsx";
import Footer from "./footer/Footer.tsx";
import { useOutlet } from "react-router-dom";
import { styled } from "styled-components";
import { Analytics } from "@vercel/analytics/react";

const Main = styled.section`
  flex: 1;
  padding-top: 100px;
  min-height: 200%;
`;

const Layout = () => {
  const outlet = useOutlet();

  return (
    <>
      <Analytics />
      <Header />
      <Main>{outlet}</Main>
      <Footer />
    </>
  );
};

export default Layout;
