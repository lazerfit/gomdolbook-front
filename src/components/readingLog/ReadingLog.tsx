import { styled } from "styled-components";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ThreeDotMenu, Publisher, BookListSkeleton, Modal } from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useGetReadinglog } from "@/hooks/queries/useReadingLog.ts";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

const Wrapper = styled.section`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3``;

const ImageWrapper = styled.div`
  width: 200px;
  min-width: 12.5rem;
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
  min-width: 12.5rem;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  border-radius: 8px;
  margin-top: 13px;
`;

const Rating = styled.div`
  width: 200px;
  min-width: 12.5rem;
  margin-top: 21px;
  font-size: 1.313rem;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 13px;
  margin-top: 40px;
`;

const AnalyzeContent = styled.article`
  width: 600px;
  min-width: 37.5rem;
  min-height: 18.75rem;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModifyButton = styled.div`
  background-color: transparent;
  font-size: 1.125rem;
  cursor: pointer;
`;

const EmptyContent = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  min-height: 9.375rem;
  color: ${(props) => props.theme.colors.gray5};
  font-size: 0.938rem;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  margin: 10px 10px 0 auto;
  cursor: pointer;
  padding: 5px;
  font-size: 1.2rem;
`;

const ModalContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 100px 100px;
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
`;

const ModalWysiwyg = styled.div`
  border: 1px solid black;
  height: 700px;
  margin-top: 30px;
`;

interface Data {
  id: number;
  title: string;
  placeholder: string;
}

const Tracker = () => {
  const params = useParams();
  const isbn = params.id ?? "";
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [noteTitle, setNoteTitle] = useState("");
  const { data, isLoading } = useGetReadinglog(isbn);
  const response = data?.data ?? {
    title: "default",
    author: "default",
    pubDate: "default",
    cover: "default",
    publisher: "default",
    status: "default",
    note1: "default",
    note2: "default",
    note3: "default",
  };

  const onCloseModal = () => {
    setIsModalOpened(false);
  };

  const onOpenReadingLog = (id: number, title: string) => {
    setIsModalOpened(true);
    setNoteId(id);
    setNoteTitle(title);
  };

  const analyzeContentData: Data[] = [
    {
      id: 1,
      title: "1. 무엇을 다룬 책인지 알아내기",
      placeholder: "중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요.",
    },
    {
      id: 2,
      title: "2. 내용 해석하기",
      placeholder:
        "중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요.",
    },
    {
      id: 3,
      title: "3. 비평하기",
      placeholder:
        "저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요.",
    },
  ];

  if (isLoading) {
    return <BookListSkeleton />;
  }

  return (
    <Wrapper>
      <ThreeDotMenu onRemove={() => void 0} isLoading={false} />
      <Title>{response.title}</Title>
      <Publisher
        author={response.author}
        publisher={response.publisher}
        date={response.pubDate}
      />
      <ImageWrapper>
        <Image src={response.cover} />
        <Rating>⭐⭐⭐⭐⭐</Rating>
      </ImageWrapper>
      <ContentWrapper>
        {analyzeContentData.map((content) => (
          <AnalyzeContent key={content.id}>
            <ContentTitle>
              <h4>{content.title}</h4>
              <ModifyButton onClick={() => onOpenReadingLog(content.id, content.title)}>
                <FaRegPenToSquare />
              </ModifyButton>
            </ContentTitle>
            <EmptyContent>{content.placeholder}</EmptyContent>
          </AnalyzeContent>
        ))}
      </ContentWrapper>
      {isModalOpened && (
        <Modal innerWidth="1180px" innerHeight="90%" onClose={onCloseModal}>
          <ModalWrapper>
            <CloseButton onClick={() => onCloseModal()}>
              <GrClose />
            </CloseButton>
            <ModalContentWrapper>
              <ModalTitle>{noteTitle}</ModalTitle>
              <ModalWysiwyg>
                <div>Hi</div>
              </ModalWysiwyg>
            </ModalContentWrapper>
          </ModalWrapper>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Tracker;
