import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup을 사용한 유효성 검사
import { personalities } from "@/constants/personalities";
import { mbtiOptions } from "@/constants/mbtiOptions";
import { formLabels } from "@/constants/formLabels";
import { PuppyFormStyle } from "./styled";

// 폼 상태 타입 정의
interface FormValues {
  puppyName: string;
  puppyAge: string;
  puppyBreed: string;
  puppyPersonality: string[];
  puppyMbti: string;
}

// 유효성 검사 스키마
const validationSchema = Yup.object({
  puppyName: Yup.string().required("이름을 입력해주세요."),
  puppyAge: Yup.string().required("나이를 입력해주세요."),
  puppyBreed: Yup.string().required("품종을 입력해주세요."),
  puppyPersonality: Yup.array().min(1, "성격을 선택해주세요."),
  puppyMbti: Yup.string().required("MBTI를 선택해주세요."),
});

const PuppyForm = ({ closeModal }: { closeModal: () => void }) => {
  // Formik 설정
  const formik = useFormik<FormValues>({
    initialValues: {
      puppyName: "",
      puppyAge: "",
      puppyBreed: "",
      puppyPersonality: [],
      puppyMbti: "",
    },
    validationSchema: validationSchema, // 유효성 검사 추가
    onSubmit: (values) => {
      console.log(values);
      closeModal(); // 제출 후 모달 닫기
    },
  });

  // 성격 체크박스 변경 처리
  const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      formik.setFieldValue("puppyPersonality", [
        ...formik.values.puppyPersonality,
        value,
      ]);
    } else {
      formik.setFieldValue(
        "puppyPersonality",
        formik.values.puppyPersonality.filter(
          (personality) => personality !== value
        )
      );
    }
  };

  return (
    <PuppyFormStyle>
      <form onSubmit={formik.handleSubmit}>
        <div className="PuppyForm_closeBtn" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div>
          <label>{formLabels.puppyName}</label>
          <input
            type="text"
            name="puppyName"
            value={formik.values.puppyName}
            onChange={formik.handleChange}
          />
          {formik.errors.puppyName && formik.touched.puppyName && (
            <div>{formik.errors.puppyName}</div>
          )}
        </div>

        <div>
          <label>{formLabels.puppyAge}</label>
          <input
            type="text"
            name="puppyAge"
            value={formik.values.puppyAge}
            onChange={formik.handleChange}
          />
          {formik.errors.puppyAge && formik.touched.puppyAge && (
            <div>{formik.errors.puppyAge}</div>
          )}
        </div>

        <div>
          <label>{formLabels.puppyBreed}</label>
          <input
            type="text"
            name="puppyBreed"
            value={formik.values.puppyBreed}
            onChange={formik.handleChange}
          />
          {formik.errors.puppyBreed && formik.touched.puppyBreed && (
            <div>{formik.errors.puppyBreed}</div>
          )}
        </div>

        <div>
          <label>{formLabels.puppyPersonality}</label>
          {personalities.map((personality) => (
            <div key={personality}>
              <input
                type="checkbox"
                name="puppyPersonality"
                value={personality}
                checked={formik.values.puppyPersonality.includes(personality)}
                onChange={handlePersonalityChange}
              />
              <label htmlFor={personality}>{personality}</label>
            </div>
          ))}
          {formik.errors.puppyPersonality &&
            formik.touched.puppyPersonality && (
              <div>{formik.errors.puppyPersonality}</div>
            )}
        </div>

        <div>
          <label>{formLabels.puppyMbti}</label>
          <select
            name="puppyMbti"
            value={formik.values.puppyMbti}
            onChange={formik.handleChange}
          >
            <option value="">선택하세요</option>
            {mbtiOptions.map((mbti) => (
              <option key={mbti} value={mbti}>
                {mbti}
              </option>
            ))}
          </select>
          {formik.errors.puppyMbti && formik.touched.puppyMbti && (
            <div>{formik.errors.puppyMbti}</div>
          )}
        </div>

        <div>
          <button type="submit" disabled={!formik.isValid || !formik.dirty}>
            {formLabels.submitButton}
          </button>
        </div>
      </form>
    </PuppyFormStyle>
  );
};

export default PuppyForm;
