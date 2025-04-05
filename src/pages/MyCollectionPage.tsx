import { styled } from "styled-components";
import { CollectionListView } from "@/components/myCollection/index.ts";

const MyCollectionWrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyCollectionPage = () => {
  return (
    <MyCollectionWrapper>
      <CollectionListView />
    </MyCollectionWrapper>
  );
};

export default MyCollectionPage;
