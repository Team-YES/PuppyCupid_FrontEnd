import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    pointPurple: "#9855f3", // 마우스색 (포인트 색)
    softPurple: "#F4F1FA", // 연한 보라색 (배경으로 적합)
    mainPurple: "#ccb6fd", // 메인 보라색 (필요시 수정 가능)
    accentPurple: "#AF60BB", // 자주색 (포인트 색)
    accentHoverPurple: "rgb(216, 110, 233)", // 자주색 (포인트 색)
    backgroundGray: "rgb(242, 242, 242)",
    inputPurple: "#ccb6fd",
    // #ccb6fd  #b89aff #F4F1FA    #AF60BB
    // 0 0 5px rgba(152, 85, 243, 0.5);
  },
};

export default theme;
