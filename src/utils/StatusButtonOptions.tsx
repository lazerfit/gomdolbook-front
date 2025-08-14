import { BookStatus } from '@/api/services/types';

const statusButtonOptions = [
  { status: BookStatus.READING, label: <p>읽는 중</p> },
  { status: BookStatus.TO_READ, label: <p>읽을 예정</p> },
  { status: BookStatus.FINISHED, label: <p>읽기 완료</p> },
];

export default statusButtonOptions;
