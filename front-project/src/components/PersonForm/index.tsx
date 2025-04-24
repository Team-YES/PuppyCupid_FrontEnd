import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PersonFormStyle } from "./styled";
import Cookies from "js-cookie";

interface FormValues {
  personNickName: string;
  personPhone: string;
}

const validationSchema = Yup.object({
  personNickName: Yup.string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10글자까지 가능합니다.")
    .required("이름을 입력해주세요."),
  personPhone: Yup.string()
    .matches(
      /^010\d{7,8}$/,
      "전화번호는 010으로 시작하는 10~11자리 숫자여야 합니다."
    )
    .required("전화번호를 입력해주세요."),
});

const PersonForm = ({ closeModal }: { closeModal: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nicknameValid, setNicknameValid] = useState(false);
  const [originalNickname, setOriginalNickname] = useState("");

  const formik = useFormik<FormValues>({
    initialValues: {
      personNickName: "",
      personPhone: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const token = Cookies.get("access_token");

        await axios.put(
          `${baseURL}/users/update`,
          {
            nickname: values.personNickName,
            phone: values.personPhone,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("정보가 수정되었습니다.");
        closeModal();
        window.location.reload();
      } catch (error) {
        console.error("유저 정보 수정 실패:", error);
        alert("수정에 실패했습니다.");
      }
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const token = Cookies.get("access_token");

        const response = await axios.get(`${baseURL}/users/info`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        formik.setValues({
          personNickName: response.data.user.nickName || "",
          personPhone: response.data.user.phone || "",
        });

        setOriginalNickname(response.data.user.nickName || "");
        setLoading(false);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [formik.setValues]);

  // 닉네임이 바뀌면 중복 검사 초기화
  useEffect(() => {
    setNicknameValid(false);
    setNicknameMessage("");
  }, [formik.values.personNickName]);

  // 수동 중복 검사
  const handleCheckNickname = async () => {
    const nickname = formik.values.personNickName;

    if (!nickname || nickname.length < 2) {
      setNicknameMessage("닉네임은 2자 이상이어야 합니다.");
      setNicknameValid(false);
      return;
    }

    // 원래 본인 닉네임이면 검사 통과
    if (nickname === originalNickname) {
      setNicknameMessage("현재 사용 중인 닉네임입니다.");
      setNicknameValid(true);
      return;
    }

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const token = Cookies.get("access_token");

      const res = await axios.get(`${baseURL}/users/nickName`, {
        params: { nickName: formik.values.personNickName },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.ok) {
        setNicknameMessage(res.data.message || "사용 가능한 닉네임입니다.");
        setNicknameValid(true);
      } else {
        setNicknameMessage(res.data.message || "이미 사용 중인 닉네임입니다.");
        setNicknameValid(false);
      }
    } catch (error: any) {
      // axios 에러 객체 안에 있는 메시지를 출력
      if (error.response && error.response.data) {
        const message =
          error.response.data.message ||
          error.response.data.error ||
          "중복 검사 실패";
        setNicknameMessage(message);
      } else {
        setNicknameMessage("중복 검사 실패");
      }
      setNicknameValid(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 회원 탈퇴
  const handleDeleteUser = async () => {
    const confirm = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirm) return;

    try {
      // 유저 ID 가져오기
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const token = Cookies.get("access_token");

      const res = await axios.get(`${baseURL}/users/info`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = res.data.user.id;

      // 회원탈퇴 요청
      await axios.delete(`${baseURL}/users/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("회원탈퇴가 완료되었습니다.");
      // 로그아웃 후 리다이렉트 등 추가
      window.location.href = "/";
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패했습니다.");
    }
  };

  return (
    <PersonFormStyle>
      <form onSubmit={formik.handleSubmit}>
        <div className="personForm_closeBtn" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>

        {/* 닉네임 입력 */}
        <div className="PersonForm_oneWrap">
          <label>닉네임: </label>
          <div className="PersonForm_nickName_checkBox">
            <input
              type="text"
              name="personNickName"
              value={formik.values.personNickName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={handleCheckNickname}
              disabled={
                formik.values.personNickName.length < 2 ||
                formik.values.personNickName.length > 10
              }
            >
              중복 검사
            </button>
          </div>
          <small className="PersonForm_textgray">
            닉네임은 2자 이상 10자 이하로 입력해주세요.
          </small>

          {nicknameMessage && (
            <div
              style={{
                color: nicknameValid ? "green" : "red",
                fontSize: "0.875rem",
                marginTop: "4px",
                marginLeft: "5px",
              }}
            >
              {nicknameMessage}
            </div>
          )}
          <div className="PersonForm_errortext">
            {formik.touched.personNickName
              ? formik.errors.personNickName || ""
              : ""}
          </div>
        </div>

        {/* 전화번호 입력 */}
        <div className="PersonForm_oneWrap">
          <label>전화번호: </label>
          <input
            type="text"
            name="personPhone"
            value={formik.values.personPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="PersonForm_phoneinput"
          />
          <small className="PersonForm_textgray">
            전화번호는 010으로 시작하는 10~11자리 숫자만 입력해주세요. ("-"
            제외)
          </small>

          <div className="PersonForm_errortext">
            {formik.touched.personPhone ? formik.errors.personPhone || "" : ""}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="Person_formbtn_Wrap">
          <div className="Person_delete_btn" onClick={handleDeleteUser}>
            회원탈퇴
          </div>
          <button
            type="submit"
            disabled={
              !formik.isValid ||
              !formik.dirty ||
              !nicknameValid ||
              formik.values.personNickName === originalNickname
            }
          >
            수정하기
          </button>
        </div>
      </form>
    </PersonFormStyle>
  );
};

export default PersonForm;
