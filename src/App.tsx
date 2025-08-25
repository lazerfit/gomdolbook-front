import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/templates/Layout';
import NotFoundPage from './components/pages/NotFoundPage';
import LandingPage from '@/components/pages/LandingPage';
import { ToastContainer, Bounce } from 'react-toastify';
import ForbiddenPage from '@/components/pages/ForbiddenPage';
import { lazy, Suspense } from 'react';
import Loader from '@/components/atoms/Loader';

const ReadingLogPage = lazy(() => import('@/components/pages/ReadingLogPage'));
const BookDetailPage = lazy(() => import('@/components/pages/BookDetailPage'));
const CollectionPage = lazy(() => import('@/components/pages/CollectionPage'));
const CollectionDetailPage = lazy(() => import('@/components/pages/CollectionDetailPage'));
const LibraryPage = lazy(() => import('@/components/pages/LibraryPage'));
const BookSearchResultPage = lazy(() => import('@/components/pages/BookSearchResultPage'));

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/library/:status" element={<LibraryPage />} />
            <Route path="/collections">
              <Route index element={<CollectionPage />} />
              <Route path={':id'} element={<CollectionDetailPage />} />
            </Route>
            <Route path="/readingLog/:isbn/:id" element={<ReadingLogPage />} />
            <Route path="/search/:title" element={<BookSearchResultPage />} />
            <Route path="/detail/:isbn" element={<BookDetailPage />} />
            <Route path="/403" element={<ForbiddenPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <ToastContainer closeOnClick transition={Bounce} />
    </Router>
  );
};

export default App;
