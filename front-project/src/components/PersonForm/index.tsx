import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PersonFormStyle } from "./styled";

interface FormValues {
  personNickName: string;
  personPhone: string; // 🔥 반드시 string 타입이어야 함
}

const validationSchema = Yup.object({
  personNickName: Yup.string()
    .max(10, "닉네임은 최대 10글자까지 가능합니다.")
    .required("이름을 입력해주세요."),
  personPhone: Yup.string()
    .matches(/^\d{10,11}$/, "전화번호는 10~11자리 숫자여야 합니다.")
    .required("전화번호를 입력해주세요."),
});

const PersonForm = ({ closeModal }: { closeModal: () => void }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      personNickName: "",
      personPhone: "", // 🔥 초기값을 string으로 설정
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      closeModal();
    },
  });

  return (
    <PersonFormStyle>
      <form onSubmit={formik.handleSubmit}>
        <div className="personForm_closeBtn" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>

        {/* 이름 입력 */}
        <div>
          <label>닉네임: </label>
          <input
            type="text"
            name="personNickName"
            value={formik.values.personNickName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.personNickName && formik.errors.personNickName && (
            <div className="error-text">{formik.errors.personNickName}</div>
          )}
        </div>

        {/* 전화번호 입력 */}
        <div>
          <label>전화번호: </label>
          <input
            type="text"
            name="personPhone"
            value={formik.values.personPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.personPhone && formik.errors.personPhone && (
            <div className="error-text">{formik.errors.personPhone}</div>
          )}
        </div>

        {/* 제출 버튼 */}
        <div>
          <button type="submit" disabled={!formik.isValid || !formik.dirty}>
            수정하기
          </button>
        </div>
      </form>
    </PersonFormStyle>
  );
};

export default PersonForm;
