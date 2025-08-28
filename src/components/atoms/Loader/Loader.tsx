import { styled } from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <div className="lds-heart">
        <div></div>
      </div>
    </LoaderContainer>
  );
};

export default Loader;
