import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 1180px;
  font-family: "winky-sans", sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 2rem;
`;

const MainText = styled.p`
  font-size: 17rem;
  line-height: 1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const SubText = styled.p`
  font-size: 2rem;
  margin: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 50%;
  }
`;

const Button = styled(motion.button)`
  padding: 20px 25px;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.8rem;
    border-radius: 10px;
    margin-top: 0.5rem;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentContainer>
        <MainText>404</MainText>
        <SubText>{`The page you're looking for doesn't exist.`}</SubText>
        <Button
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotateX: 360, backgroundColor: "black", color: "white" }}
          transition={{ type: "spring", stiffness: 100, damping: 17 }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </ContentContainer>
    </Wrapper>
  );
};

export default NotFound;
