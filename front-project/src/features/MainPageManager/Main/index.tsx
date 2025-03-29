import { MainStyled } from "./styled";
import { clsx } from "clsx";
import { useState } from "react";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();

  return (
    <MainStyled className={clsx("main-wrap")}>
      <div className="main-title">메인페이지</div>
    </MainStyled>
  );
};
export default Main;
