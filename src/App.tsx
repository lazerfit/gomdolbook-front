import { Routes, Route } from "react-router-dom";
import GlobalStyle from "@/styles/Global.ts";
import IndexPage from "@/pages/IndexPage.tsx";
import MyLibraryPage from "@/pages/MyLibraryPage.tsx";
import MyCollectionPage from "@/pages/MyCollectionPage.tsx";
import Layout from "@/components/layout/Layout.tsx";
import ReadingLogPage from "@/pages/ReadingLogPage.tsx";
import Theme from "@/styles/theme.tsx";
import CollectionDetailPage from "./pages/CollectionDetailPage.js";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage.tsx";

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/library/:status" element={<MyLibraryPage />} />
          <Route path="/collections">
            <Route index element={<MyCollectionPage />} />
            <Route path={":name"} element={<CollectionDetailPage />} />
          </Route>
          <Route path="/readingLog/:isbn" element={<ReadingLogPage />} />
          <Route path="/analytics/:view" element={<AnalyticsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Theme>
  );
};

export default App;
