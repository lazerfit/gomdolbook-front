export const transformPublicationDate = (date: string): string => {
  if (!date) return '';
  const [year, month] = date.split('-', 2);
  return month === undefined ? `${year}년` : `${year}년 ${month}월`;
};
