import { useClickOutside } from "@/hooks/useClickOutside";
import { AdminLoginStyled } from "./styled";
import { useRef, useState } from "react";

const AdminLogin = () => {
  // 외부 클릭 시 창닫기
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerRef, () => setShowPicker(false));

  return (
    <AdminLoginStyled>
      <div className="AdminLogin_X">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="AdminLogin_container">
        <div className="AdminLogin_title">관리자 로그인</div>
        <input className="AdminLogin_input" type="text" placeholder="아이디" />
        <input
          className="AdminLogin_input"
          type="password"
          placeholder="비밀번호"
        />
      </div>
    </AdminLoginStyled>
  );
};

export default AdminLogin;
