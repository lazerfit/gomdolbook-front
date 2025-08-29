import AuthenticatedLanding from '@/components/organisms/AuthenticatedLanding';
import GuestLanding from '@/components/organisms/GuestLanding';

import { useKeycloak } from '@react-keycloak/web';

const LandingPage = () => {
  const { keycloak } = useKeycloak();

  return keycloak.authenticated ? <AuthenticatedLanding /> : <GuestLanding />;
};

export default LandingPage;
