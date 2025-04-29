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

  @media (${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 20px;
  }
`;

const MyLibraryPage = () => {
  const { status = "" } = useParams();
  const { libraryBooks, isFetchingLibraryBooks } = useBook({
    status: status.toUpperCase(),
  });

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
        {isFetchingLibraryBooks ? (
          <BookListSkeletonLoader />
        ) : (
          <BookListView bookList={libraryBooks} />
        )}
      </motion.div>
    </MyLibraryWrapper>
  );
};

export default MyLibraryPage;
