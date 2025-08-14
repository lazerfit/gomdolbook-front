import ErrorPage from '@/components/templates/ErrorPage';

const ForbiddenPage = () => {
  return <ErrorPage title="403" subTitle="You don't have permission to access this page." />;
};

export default ForbiddenPage;
