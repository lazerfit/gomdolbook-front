import { Routes, Route } from "react-router-dom";
import GlobalStyle from "@/styles/global";
import Main from "@/pages/Main";
import Library from "@/pages/Library";
import Statistics from "@/pages/Statistics";
import Layout from "@/components/layout/Layout";
import BookTracker from "@/pages/BookTracker";
import Theme from "@/styles/theme";

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/library" element={<Library />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/books/:id" element={<BookTracker />} />
        </Route>
      </Routes>
    </Theme>
  );
};

export default App;
