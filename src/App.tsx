import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/templates/Layout';
import ReadingLogPage from '@/components/pages/ReadingLogPage';
import NotFoundPage from './components/pages/NotFoundPage';
import LandingPage from '@/components/pages/LandingPage';
import BookSearchResultPage from '@/components/pages/BookSearchResultPage';
import BookDetailPage from '@/components/pages/BookDetailPage';
import { ToastContainer, Bounce } from 'react-toastify';
import CollectionPage from '@/components/pages/CollectionPage';
import CollectionDetailPage from '@/components/pages/CollectionDetailPage';
import LibraryPage from '@/components/pages/LibraryPage';
import ForbiddenPage from '@/components/pages/ForbiddenPage';

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
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

      <ToastContainer closeOnClick transition={Bounce} />
    </Router>
  );
};

export default App;
