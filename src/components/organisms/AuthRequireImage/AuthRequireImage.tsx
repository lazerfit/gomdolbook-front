import MotionContainer from '@/components/molecules/MotionContainer/MotionContainer';
import Cat from '@/assets/img/pexels-nomino-3069334.jpg';
import { ImgBig } from '@/components/atoms/Img';
import { useKeycloak } from '@react-keycloak/web';

const AuthRequireImage = () => {
  const { keycloak } = useKeycloak();

  return (
    !keycloak.authenticated && (
      <MotionContainer>
        {motionProps => (
          <ImgBig
            src={Cat}
            alt="emptyLibraryImage"
            style={{
              rotateX: motionProps.rotateX,
              rotateY: motionProps.rotateY,
              filter: motionProps.filter,
              x: motionProps.x,
              y: motionProps.y,
            }}
          />
        )}
      </MotionContainer>
    )
  );
};

export default AuthRequireImage;
