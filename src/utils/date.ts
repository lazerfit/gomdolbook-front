export const transformPublicationDate = (date: string): string => {
  if (!date) return '';
  const [year, month] = date.split('-', 2);
  return month === undefined ? `${year}년` : `${year}년 ${month}월`;
};

export const transformReadingDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};
