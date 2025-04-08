import { format, parseISO, differenceInDays } from "date-fns";

export const formatPostDate = (dateString: string) => {
  const now = new Date();
  const date = parseISO(dateString);
  const diffDays = differenceInDays(now, date);

  if (diffDays <= 3) {
    return `${diffDays === 0 ? "오늘" : `${diffDays}일 전`}`;
  } else {
    return format(date, "M월 d일");
  }
};
