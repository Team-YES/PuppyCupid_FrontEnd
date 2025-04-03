import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup을 사용한 유효성 검사
import { personalities } from "@/constants/personalities";
import { mbtiOptions } from "@/constants/mbtiOptions";
import { formLabels } from "@/constants/formLabels";
import { PuppyFormStyle } from "./styled";

const defaultImage = "/puppy_profile.png";
// 폼 상태 타입 정의
interface FormValues {
  puppyName: string;
  puppyAge: string;
  puppyBreed: string;
  puppyPersonality: string[];
  puppyMbti: string;
  puppyGender: string;
  puppyImage: File | null;
}

// 유효성 검사 스키마
const validationSchema = Yup.object({
  puppyName: Yup.string().required("이름을 입력해주세요."),
  puppyAge: Yup.string().required("나이를 입력해주세요."),
  puppyBreed: Yup.string().required("품종을 입력해주세요."),
  puppyPersonality: Yup.array().min(1, "성격을 선택해주세요."),
  puppyMbti: Yup.string().required("MBTI를 선택해주세요."),
  puppyGender: Yup.string().required("성별을 선택해주세요."),
  puppyImage: Yup.mixed().required("이미지를 업로드해주세요."),
});
interface PuppyFormProps {
  closeModal: () => void;
}

const PuppyForm = ({ closeModal }: PuppyFormProps) => {
  const [imagePreview, setImagePreview] = useState<string>(defaultImage);

  // 폼 변경 시 버튼 활성화
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Formik 설정
  const formik = useFormik<FormValues>({
    initialValues: {
      puppyName: "",
      puppyAge: "",
      puppyBreed: "",
      puppyPersonality: [],
      puppyMbti: "",
      puppyGender: "",
      puppyImage: null,
    },
    validateOnChange: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.puppyName);
        formData.append("age", values.puppyAge);
        formData.append("breed", values.puppyBreed);
        formData.append("personality", values.puppyPersonality.join(","));
        formData.append("mbti", values.puppyMbti);
        formData.append("gender", values.puppyGender);
        if (values.puppyImage && values.puppyImage instanceof File) {
          formData.append("image", values.puppyImage);
        }

        console.log("🐶 보낼 데이터:", values);
        console.log("📦 FormData 확인:", [...formData.entries()]);
        const response = await axios.post(
          "http://localhost:5000/dogs/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        console.log("강아지 등록 성공:", response.data);
        alert("강아지 등록이 완료되었습니다!");
        closeModal();
      } catch (error) {
        console.error("강아지 등록 실패:", error);
        alert("강아지 등록에 실패했습니다.");
      }
    },
  });
  //
  useEffect(() => {
    if (!formik.dirty) return;
    setIsFormChanged(true);
  }, [formik.values, formik.errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    formik.handleChange(e);
    setIsFormChanged(true);
  };
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
    setIsFormChanged(true);
  };
  // 이미지 변경 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      formik.setFieldValue("puppyImage", file);
      formik.setTouched({ ...formik.touched, puppyImage: true });
      setIsFormChanged(true);
    }
  };

  return (
    <PuppyFormStyle>
      <form onSubmit={formik.handleSubmit}>
        <div className="PuppyForm_closeBtn" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        {/* 이미지 미리보기 */}
        <div className="PuppyForm_form_imgs">
          <div className="PuppyForm_preview_div">
            <img
              src={imagePreview || defaultImage}
              alt="Puppy Profile Preview"
            />
          </div>
        </div>
        {/* 이미지 업로드 */}
        <div>
          <label>프로필 사진 업로드: </label>
          <br />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formik.errors.puppyImage && formik.touched.puppyImage && (
            <div>{formik.errors.puppyImage}</div>
          )}
        </div>

        {/* 이름 인풋 */}
        <div>
          <label>{formLabels.puppyName}</label>
          <input
            type="text"
            name="puppyName"
            value={formik.values.puppyName}
            onChange={handleChange}
          />
          {formik.errors.puppyName && formik.touched.puppyName && (
            <div>{formik.errors.puppyName}</div>
          )}
        </div>
        {/* 나이 */}
        <div>
          <label>{formLabels.puppyAge}</label>
          <input
            type="text"
            name="puppyAge"
            value={formik.values.puppyAge}
            onChange={handleChange}
          />
          {formik.errors.puppyAge && formik.touched.puppyAge && (
            <div>{formik.errors.puppyAge}</div>
          )}
        </div>
        {/* 중성화 */}
        <div>
          <label>{formLabels.puppyGender}</label>
          <div>
            <input
              type="radio"
              name="puppyGender"
              value="male"
              checked={formik.values.puppyGender === "male"}
              onChange={handleChange}
            />
            <label>수컷</label>

            <input
              type="radio"
              name="puppyGender"
              value="male_neutered"
              checked={formik.values.puppyGender === "male_neutered"}
              onChange={handleChange}
            />
            <label>수컷(중성화)</label>

            <input
              type="radio"
              name="puppyGender"
              value="female"
              checked={formik.values.puppyGender === "female"}
              onChange={handleChange}
            />
            <label>암컷</label>

            <input
              type="radio"
              name="puppyGender"
              value="female_neutered"
              checked={formik.values.puppyGender === "female_neutered"}
              onChange={handleChange}
            />
            <label>암컷(중성화)</label>
          </div>
          {formik.errors.puppyGender && formik.touched.puppyGender && (
            <div>{formik.errors.puppyGender}</div>
          )}
        </div>
        <div>
          <label>{formLabels.puppyBreed}</label>
          <input
            type="text"
            name="puppyBreed"
            value={formik.values.puppyBreed}
            onChange={handleChange}
          />
          {formik.errors.puppyBreed && formik.touched.puppyBreed && (
            <div>{formik.errors.puppyBreed}</div>
          )}
        </div>
        {/* 성격 */}
        <div>
          <label>{formLabels.puppyPersonality}</label>
          {personalities.map((personality) => (
            <div key={personality}>
              <input
                type="checkbox"
                name="puppyPersonality"
                value={personality}
                checked={formik.values.puppyPersonality.includes(personality)}
                onChange={(event) => {
                  handlePersonalityChange(event);
                  handleChange(event);
                }}
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
            onChange={handleChange}
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
          <button type="submit" disabled={!isFormChanged || !formik.isValid}>
            {formLabels.submitButton}
          </button>
        </div>
      </form>
    </PuppyFormStyle>
  );
};

export default PuppyForm;
