import React, { useState } from "react";
import { BoardWrapper } from "./styled";

navigator.geolocation.getCurrentPosition(
  (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    console.log(lat, lon);
  },
  (err) => {
    console.error("위치 접근 실패: ", err);
  }
);

const Board = () => {
  return (
    <BoardWrapper>
      <div></div>
    </BoardWrapper>
  );
};

export default Board;
