const translateBookStatus = (bookStatus: string) => {
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

export default translateBookStatus;
