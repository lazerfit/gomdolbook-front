import { ReadingLogResponse } from "@/api/services/types/booktypes.js";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export interface NoteContentData {
  note: string;
  title: string;
  text: string;
}

export const useReadingLogNote = (fetchedReadingLog: ReadingLogResponse) => {
  const [rating, setRating] = useState(fetchedReadingLog.rating);
  const [notePlaceholder, setNotePlaceholder] = useState("");
  const [note, setNote] = useState({ id: "", title: "", text: "" });
  useEffect(() => {
    if (fetchedReadingLog) {
      setRating(fetchedReadingLog.rating);
    }
  }, [fetchedReadingLog]);

  const noteContentData: NoteContentData[] = [
    {
      note: "note1",
      title: "1. 무엇을 다룬 책인지 알아내기",
      text:
        fetchedReadingLog.note1 === ""
          ? "중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요."
          : DOMPurify.sanitize(fetchedReadingLog.note1),
    },
    {
      note: "note2",
      title: "2. 내용 해석하기",
      text:
        fetchedReadingLog.note2 === ""
          ? "중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요."
          : DOMPurify.sanitize(fetchedReadingLog.note2),
    },
    {
      note: "note3",
      title: "3. 비평하기",
      text:
        fetchedReadingLog.note3 === ""
          ? "저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요."
          : DOMPurify.sanitize(fetchedReadingLog.note3),
    },
  ];

  return {
    noteContentData,
    rating,
    setRating,
    notePlaceholder,
    setNotePlaceholder,
    note,
    setNote,
  };
};
