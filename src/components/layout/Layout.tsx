import Header from "./header/Header.tsx";
import Footer from "./footer/Footer.tsx";
import { useOutlet } from "react-router-dom";

const Layout = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      <main>{outlet}</main>
      <Footer />
    </>
  );
};

export default Layout;
