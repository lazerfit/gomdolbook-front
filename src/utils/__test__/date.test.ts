import { transformPublicationDate } from '@/utils';
import { describe, expect } from 'vitest';

describe('transformPublicationDate', () => {
  it('YYYY-MM 형식의 날짜도 올바르게 변환해야 한다', () => {
    expect(transformPublicationDate('2025-08')).toBe('2025년 08월');
  });

  it('YYYY-MM-DD 형식의 날짜도 올바르게 변환해야 한다', () => {
    expect(transformPublicationDate('2025-08-15')).toBe('2025년 08월');
  });

  it('빈 문자열이 넘어오면 빈 문자열을 반환한다. ', () => {
    expect(transformPublicationDate('')).toBe('');
  });

  it('YYYY 형식의 날짜를 입력하면 연도만 반환하다.', () => {
    expect(transformPublicationDate('2025')).toBe('2025년');
  });
});
