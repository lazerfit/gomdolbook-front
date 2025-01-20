import { BookStatus } from "@/api/services/BoookService";

describe("함수 테스트", () => {
  it("switch book status test", () => {
    const translteBookStatus = (bookStatus: string) => {
      switch (bookStatus) {
        case "READING":
          return "읽는 중";
        case "TO_READ":
          return "읽을 예정";
        case "FINISHED":
          return "읽기 완료";
        default:
          return "default";
      }
    };

    expect(translteBookStatus(BookStatus.READING)).toEqual("읽는 중");
    expect(translteBookStatus(BookStatus.TO_READ)).toEqual("읽을 예정");
    expect(translteBookStatus(BookStatus.FINISHED)).toEqual("읽기 완료");
  });
});
