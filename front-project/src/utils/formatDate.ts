import { format, parseISO, differenceInCalendarDays } from "date-fns";

// 게시글 작성일 표시 함수(3일 이내면 n일 전, 그 이상은 M월 d일)
export const formatPostDate = (dateString: string) => {
  const now = new Date();
  const date = parseISO(dateString);

  // 자정 기준 날짜 차이 계산
  const diffDays = differenceInCalendarDays(now, date);

  if (diffDays <= 3) {
    return `${diffDays === 0 ? "오늘" : `${diffDays}일 전`}`;
  } else {
    return format(date, "M월 d일");
  }
};
