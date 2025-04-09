import { useEffect, useState } from "react";
import { styled } from "styled-components";
import StatusNavBar from "@/components/myLibrary/LibraryStatusNav.tsx";
import { BookListView } from "@/components/book/index.ts";
import { BookListSkeletonLoader } from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useBook } from "@/hooks/index.ts";
import { motion } from "framer-motion";

const MyLibraryWrapper = styled(motion.section)`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyLibraryPage = () => {
  const params = useParams();
  const status = params.status ?? "";
  const [filter, setFilter] = useState("");
  const { libraryBookList, isLibraryBookListLoading } = useBook({ status: filter });

  useEffect(() => {
    if (status !== "") {
      setFilter(status);
    }
  }, [status]);
  return (
    <MyLibraryWrapper>
      <StatusNavBar />
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
      >
        {isLibraryBookListLoading ? (
          <BookListSkeletonLoader />
        ) : (
          <BookListView bookList={libraryBookList} />
        )}
      </motion.div>
    </MyLibraryWrapper>
  );
};

export default MyLibraryPage;
