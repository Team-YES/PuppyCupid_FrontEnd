import { useFormik } from "formik";
import * as Yup from "yup";
import { PhonePadding } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Phone = () => {
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [nicknameCheckPassed, setNicknameCheckPassed] = useState(false);
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("temp_access_token");

    if (token) {
      // 임시 토큰을 상태와 쿠키에 저장
      setTempToken(token);
      Cookies.set("temp_access_token", token, {
        expires: 10 / 1440,
        path: "/",
      });
      // console.log(Cookies.get("temp_access_token"));
    } else {
      console.error("임시 토큰이 URL 파라미터에 없습니다.");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      phone: "",
      gender: "",
      nickname: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(
          /^010\d{7,8}$/,
          "010으로 시작하는 10~11자리 숫자를 입력하세요."
        )
        .required("전화번호를 입력하세요."),
      gender: Yup.string().required("성별을 선택하세요."),
      nickname: Yup.string()
        .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
        .max(10, "닉네임은 최대 10자까지 입력 가능합니다.")
        .required("닉네임을 입력하세요."),
    }),
    onSubmit: async (values) => {
      if (!nicknameCheckPassed) {
        alert("닉네임 중복검사를 완료해주세요.");
        return;
      }

      try {
        // 임시 토큰이 없으면 알림
        if (!tempToken && !Cookies.get("temp_access_token")) {
          alert("임시 토큰이 없습니다. 다시 시도해주세요.");
          return;
        }

        // console.log("현재 tempToken 상태:", tempToken);
        // console.log(
        //   "현재 쿠키의 temp_access_token:",
        //   Cookies.get("temp_access_token")
        // );

        // 전화번호 업데이트 요청
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/update-phone`,
          {
            phone: values.phone,
            gender: values.gender,
            nickName: values.nickname,
          },
          {
            headers: {
              Authorization: `Bearer ${
                tempToken || Cookies.get("temp_access_token")
              }`,
            },
            withCredentials: true,
          }
        );

        if (res.data.ok) {
          const { access_token, refresh_token } = res.data;
          // 쿠키에 토큰 저장
          Cookies.set("access_token", access_token, { expires: 7, path: "/" });
          Cookies.set("refresh_token", refresh_token, {
            expires: 7,
            path: "/",
          });

          // 임시 토큰 삭제
          Cookies.remove("temp_access_token");

          alert("추가 정보 등록 완료!");
          window.location.href = "/";
        }
      } catch (err: any) {
        if (err.response?.status === 409) {
          alert(err.response.data.error || "이미 사용 중인 전화번호입니다.");
        } else {
          alert("등록 중 오류가 발생했습니다.");
        }
      }
    },
  });

  // 닉네임 변경 시 중복 검사 초기화
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setNicknameCheckPassed(false);
    setNicknameCheckMessage("");
  };

  const handleNicknameCheck = async () => {
    if (!formik.values.nickname || formik.values.nickname.length < 2) {
      setNicknameCheckMessage("닉네임을 2자 이상 입력해주세요.");
      setNicknameCheckPassed(false);
      return;
    }

    try {
      const token = tempToken || Cookies.get("temp_access_token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/nickName`,
        {
          params: { nickName: formik.values.nickname },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.ok) {
        setNicknameCheckPassed(true);
        setNicknameCheckMessage(res.data.message); // "사용 가능한 닉네임입니다."
      } else {
        setNicknameCheckPassed(false);
        setNicknameCheckMessage(res.data.message); // "이미 사용 중인 닉네임입니다."
      }
    } catch (error: any) {
      setNicknameCheckPassed(false);
      setNicknameCheckMessage(
        error?.response?.data?.error ||
          "오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <PhonePadding>
      <div className="Phone_plus_infoWrap">
        <div className="Phone_info_Title">
          <span className="Phone_info_Title_Main">소셜 로그인 완료! 🎉</span>
          <span className="Phone_info_Title_Sub">
            원활한 서비스 이용을 위해 추가 정보를 입력해주세요.
          </span>
        </div>

        <form onSubmit={formik.handleSubmit} className="Phone_form">
          <div className="Phone_form_wrap">
            {/* 전화번호 입력 */}
            <div className="Phone_label_allbox">
              <label htmlFor="phone">전화번호</label>
              <div className="Phone_input_box">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <small className="Phone_textgray">
                  010으로 시작하는 10~11자리 숫자만 입력하세요. ("-" 제외)
                </small>
                {formik.touched.phone && formik.errors.phone && (
                  <p className="Phone_error_message">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            {/* 성별 선택 */}
            <div className="Phone_label_allbox">
              <label htmlFor="gender" className="Phone_gender_label">
                성별
              </label>
              <div className="Phone_input_box">
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
                <small className="Phone_textgray">성별을 선택해주세요.</small>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="Phone_error_message">{formik.errors.gender}</p>
                )}
              </div>
            </div>

            {/* 닉네임 입력 */}
            <div className="Phone_label_allbox">
              <label htmlFor="nickname" className="block text-sm font-medium">
                닉네임
              </label>
              <div className="Phone_input_box Phone_Check_inputbox">
                <div className="Phone_nickName_checkBox">
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    maxLength={10}
                    onChange={handleNicknameChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nickname}
                    className="Phone_nickName_inputSize"
                  />{" "}
                  <div className="Phone_nickName_checkBtn">
                    <button
                      type="button"
                      onClick={handleNicknameCheck}
                      className="Phone-button-check"
                      disabled={formik.values.nickname.length < 2}
                    >
                      중복 검사
                    </button>
                  </div>
                </div>
                <small className="Phone_textgray">
                  닉네임은 2자 이상 10자 이하로 입력해주세요.
                </small>
                {nicknameCheckMessage && (
                  <p
                    style={{
                      color: nicknameCheckPassed ? "green" : "red",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    {nicknameCheckMessage}
                  </p>
                )}
                {formik.touched.nickname && formik.errors.nickname && (
                  <p className="Phone_error_message">
                    {formik.errors.nickname}
                  </p>
                )}
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="Phone_btnWrap">
              <button
                type="submit"
                className="Phone-button"
                disabled={
                  !formik.isValid || !formik.dirty || !nicknameCheckPassed
                }
              >
                제출
              </button>
            </div>
          </div>
        </form>
      </div>
    </PhonePadding>
  );
};

export default Phone;
