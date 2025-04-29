import { styled } from "styled-components";
import { CollectionListView } from "@/components/myCollection/index.ts";

const MyCollectionWrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;

  @media (${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 20px;
  }
`;

const MyCollectionPage = () => {
  return (
    <MyCollectionWrapper>
      <CollectionListView />
    </MyCollectionWrapper>
  );
};

export default MyCollectionPage;
