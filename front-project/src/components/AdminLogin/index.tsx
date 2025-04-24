import { useClickOutside } from "@/hooks/useClickOutside";
import { AdminLoginStyled } from "./styled";
import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface AdminLoginProps {
  onClose: () => void;
}

const AdminLogin = ({ onClose }: AdminLoginProps) => {
  const router = useRouter();

  // 아이디 비번
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("관리자 로그인 정보: ", id, password);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: id,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("응답:", res.status, res.data);

      if (res.data.ok) {
        console.log("관리자 로그인 성공", res.data);

        const { access_token, refresh_token } = res.data;

        // 쿠키 저장
        Cookies.set("access_token", access_token, {
          expires: 1,
          path: "/",
          sameSite: "strict",
        });

        Cookies.set("refresh_token", refresh_token, {
          expires: 7,
          path: "/",
          sameSite: "strict",
        });

        alert("관리자 로그인 성공!");

        router.push("/").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      } else {
        alert("관리자 로그인 실패");
        console.log("관리자 로그인 실패", res.data);
      }
    } catch (error: any) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <AdminLoginStyled>
      <div
        className="AdminLogin_X"
        onClick={() => {
          onClose();
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>

      <div className="AdminLogin_container">
        <div className="AdminLogin_title">관리자 로그인</div>
        <input
          className="AdminLogin_input"
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="AdminLogin_input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="AdminLogin_submit">
          <button onClick={handleLogin}>로그인</button>
        </div>
      </div>
    </AdminLoginStyled>
  );
};

export default AdminLogin;
