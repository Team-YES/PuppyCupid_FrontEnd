import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup을 사용한 유효성 검사
import { personalities } from "@/constants/personalities";
import { mbtiOptions } from "@/constants/mbtiOptions";
import { formLabels } from "@/constants/formLabels";
import { PuppyFormStyle } from "./styled";
import Cookies from "js-cookie";

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
  puppyAge: Yup.number()
    .transform((value, originalValue) => Number(originalValue))
    .min(0, "0살 이상 입력해주세요.")
    .max(30, "30살 이하로 입력해주세요.")
    .required("나이를 입력해주세요."),
  puppyBreed: Yup.string().required("품종을 입력해주세요."),
  puppyPersonality: Yup.array().min(1, "성격을 선택해주세요."),
  puppyMbti: Yup.string().required("MBTI를 선택해주세요."),
  puppyGender: Yup.string().required("성별을 선택해주세요."),
  puppyImage: Yup.mixed()
    .required("이미지를 반드시 첨부해주세요.")
    .test("fileExists", "이미지를 반드시 첨부해주세요.", (value) => {
      return value instanceof File;
    }),
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
    validateOnMount: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("access_token");

        const formData = new FormData();
        formData.append("name", values.puppyName);
        formData.append("age", values.puppyAge);
        formData.append("breed", values.puppyBreed);
        // formData.append("personality", values.puppyPersonality.join(","));
        formData.append("personality", JSON.stringify(values.puppyPersonality));
        formData.append("mbti", values.puppyMbti);
        formData.append("gender", values.puppyGender);
        if (values.puppyImage && values.puppyImage instanceof File) {
          formData.append("image", values.puppyImage);
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/dogs/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        alert("강아지 등록이 완료되었습니다!");
        closeModal();
        window.location.reload();
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
          <div className="PuppyForm_input_infoText">
            이미지를 첨부해주세요. (필수)
          </div>
          {/* {formik.errors.puppyImage && formik.touched.puppyImage && (
            <div style={{ color: "red" }}>이미지를 반드시 첨부해주세요.</div>
          )} */}
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
          <div className="PuppyForm_input_infoText">
            이름을 입력해주세요. (필수)
          </div>
          {formik.errors.puppyName && formik.touched.puppyName && (
            <div>{formik.errors.puppyName}</div>
          )}
        </div>
        {/* 나이 */}
        <div>
          <label>{formLabels.puppyAge}</label>
          <input
            type="number"
            name="puppyAge"
            value={formik.values.puppyAge}
            onChange={handleChange}
          />
          <div className="PuppyForm_input_infoText">
            강아지의 정확한 나이를 숫자로 입력해 주세요.(0 ~ 30)(필수)
          </div>
          {formik.errors.puppyAge && formik.touched.puppyAge && (
            <div>{formik.errors.puppyAge}</div>
          )}
        </div>
        {/* 성별 - 중성화 */}
        <div className="PuppyForm_GenderRadioBox_Wrap">
          <label className="PuppyForm_gender_label">
            {formLabels.puppyGender}
          </label>
          <label>
            <input
              type="radio"
              name="puppyGender"
              value="male"
              checked={formik.values.puppyGender === "male"}
              onChange={handleChange}
            />
            수컷
          </label>

          <label>
            <input
              type="radio"
              name="puppyGender"
              value="male_neutered"
              checked={formik.values.puppyGender === "male_neutered"}
              onChange={handleChange}
            />
            수컷(중성화)
          </label>

          <label>
            <input
              type="radio"
              name="puppyGender"
              value="female"
              checked={formik.values.puppyGender === "female"}
              onChange={handleChange}
            />
            암컷
          </label>

          <label>
            <input
              type="radio"
              name="puppyGender"
              value="female_neutered"
              checked={formik.values.puppyGender === "female_neutered"}
              onChange={handleChange}
            />
            암컷(중성화)
          </label>
          <div className="PuppyForm_input_infoText">
            성별을 선택해주세요. (필수)
          </div>
        </div>
        <div>
          <label>{formLabels.puppyBreed}</label>
          <input
            type="text"
            name="puppyBreed"
            value={formik.values.puppyBreed}
            onChange={formik.handleChange}
          />
          <div className="PuppyForm_input_infoText">
            강아지의 견종을 입력해 주세요. (필수)
          </div>
          {formik.errors.puppyBreed && formik.touched.puppyBreed && (
            <div>{formik.errors.puppyBreed}</div>
          )}
        </div>
        {/* 성격 */}
        <div>
          <label>{formLabels.puppyPersonality}</label>
          <div className="PuppyForm_personal_infoText">
            성격을 1개 이상 선택해주세요. (필수)
          </div>
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
          <div className="PuppyForm_input_infoText">
            MBTI를 선택해주세요. (필수)
          </div>
          {formik.errors.puppyMbti && formik.touched.puppyMbti && (
            <div>{formik.errors.puppyMbti}</div>
          )}
        </div>

        <div>
          <button type="submit" disabled={!formik.isValid}>
            {formLabels.submitButton}
          </button>
        </div>
      </form>
    </PuppyFormStyle>
  );
};

export default PuppyForm;
