import { useEffect, useState } from "react";
import { styled } from "styled-components";
import StatusNavBar from "./StatusNavBar.tsx";
import { BookList } from "../shared/index.ts";
import { BookListSkeleton } from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useBook } from "@/hooks/index.ts";
import { motion } from "framer-motion";

const Wrapper = styled(motion.section)`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyLibrary = () => {
  const params = useParams();
  const status = params.status ?? "";
  const [filter, setfilter] = useState("");
  const { library, isLibraryLoading } = useBook({ status: filter });

  useEffect(() => {
    if (status !== "") {
      setfilter(status);
    }
  }, [status]);

  return (
    <Wrapper>
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
        {isLibraryLoading ? <BookListSkeleton /> : <BookList books={library} />}
      </motion.div>
    </Wrapper>
  );
};

export default MyLibrary;
