import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { setCookie } from "../../utils/setCookie";
import * as S from "./styled";

const EventPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie("hideEventPopup")) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => setVisible(false);
  const handleHideToday = () => {
    setCookie("hideEventPopup", "true", 1);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <S.Overlay>
      <S.PopupWrapper>
        <div className="EventPopup_wrap">
          <a href="/payment">
            <img
              src="/openEvent.png"
              alt="이벤트 이미지"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </a>
          <div className="EventPopup_btngroup">
            <S.PopupButton onClick={handleHideToday}>
              오늘은 그만 보기
            </S.PopupButton>
            <S.PopupButton onClick={handleClose}>닫기</S.PopupButton>
          </div>
        </div>
      </S.PopupWrapper>
    </S.Overlay>
  );
};

export default EventPopup;
