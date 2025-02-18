import { Routes, Route } from "react-router-dom";
import GlobalStyle from "@/styles/global.ts";
import Main from "@/pages/Main.tsx";
import Library from "@/pages/Library.tsx";
import Collection from "@/pages/Collection.tsx";
import Layout from "@/components/layout/Layout.tsx";
import BookTracker from "@/pages/ReadingLog.tsx";
import Theme from "@/styles/theme.tsx";
import Details from "./components/myCollection/Details.js";
import TestPage from "./ui/MainpageSkeleton.tsx";

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/library" element={<Library />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:name" element={<Details />} />
          <Route path="/books/:id" element={<BookTracker />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </Theme>
  );
};

export default App;
