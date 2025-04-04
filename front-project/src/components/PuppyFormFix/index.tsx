import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup을 사용한 유효성 검사
import { personalities } from "@/constants/personalities";
import { mbtiOptions } from "@/constants/mbtiOptions";
import { formLabels } from "@/constants/formLabels";
import { PuppyFormFixStyle } from "./styled";

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

const PuppyFormFix = ({
  puppy,
  closeModal,
  updatePuppyData,
}: {
  puppy: any;
  closeModal: () => void;
  updatePuppyData: (updatedPuppy: any) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    puppy?.image ? `http://localhost:5000${puppy.image}` : defaultImage
  );

  // 폼 변경 시 버튼 활성화
  const [isFormChanged, setIsFormChanged] = useState(false);

  const validate = (values: FormValues) => {
    const errors: Record<string, string> = {};
    if (!values.puppyName) errors.puppyName = "이름을 입력해주세요.";
    if (!values.puppyAge) errors.puppyAge = "나이를 입력해주세요.";
    if (!values.puppyBreed) errors.puppyBreed = "품종을 입력해주세요.";
    if (!values.puppyPersonality || values.puppyPersonality.length === 0) {
      errors.puppyPersonality = "성격을 선택해주세요.";
    }
    if (!values.puppyMbti) errors.puppyMbti = "MBTI를 선택해주세요.";
    if (!values.puppyGender) errors.puppyGender = "성별을 선택해주세요.";
    return errors;
  };
  // Formik 설정
  const formik = useFormik<FormValues>({
    initialValues: {
      puppyName: puppy?.name || "",
      puppyAge: puppy?.age || "",
      puppyBreed: puppy?.breed || "",
      puppyPersonality: puppy?.personality ? JSON.parse(puppy.personality) : [],
      puppyMbti: puppy?.mbti || "",
      puppyGender: puppy?.gender || "",
      puppyImage: null,
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      // const personalityObject = values.puppyPersonality.reduce((acc, cur) => {
      //   acc[cur] = true; // 선택된 성격을 키로 설정하고 true 값 부여
      //   return acc;
      // }, {} as Record<string, boolean>);
      try {
        const formData = new FormData();
        formData.append("name", values.puppyName);
        formData.append("age", values.puppyAge);
        formData.append("breed", values.puppyBreed);
        formData.append("personality", JSON.stringify(values.puppyPersonality));
        formData.append("mbti", values.puppyMbti);
        formData.append("gender", values.puppyGender);

        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        console.log("🔥 보낼 데이터:", Object.fromEntries(formData.entries()));
        const response = await axios.post(
          `http://localhost:5000/dogs/update/${puppy.id}`, // 기존 강아지 ID 사용
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        alert("강아지 정보가 수정되었습니다!");
        updatePuppyData(response.data);
        console.log(response.data, "response.data"); //콘솔
        closeModal();
      } catch (error) {
        console.error("강아지 수정 실패:", error);
        alert("강아지 정보 수정에 실패했습니다.");
      }
    },
  });
  //
  useEffect(() => {
    const valuesWithoutFile = { ...formik.values, puppyImage: null };
    const initialValuesWithoutFile = {
      ...formik.initialValues,
      puppyImage: null,
    };

    // 기존 데이터와 다르면 버튼 활성화 (이미지 변경 여부와 무관)
    setIsFormChanged(
      JSON.stringify(valuesWithoutFile) !==
        JSON.stringify(initialValuesWithoutFile)
    );
  }, [formik.values]);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   formik.setFieldValue(name, value); // 상태를 직접 업데이트
  //   setIsFormChanged(true);
  // };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    formik.handleChange(e);
    setIsFormChanged(true); // 값이 변경되면 버튼 활성화
  };
  // 성격 체크박스 변경 처리
  // const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     formik.setFieldValue("puppyPersonality", [
  //       ...formik.values.puppyPersonality,
  //       value,
  //     ]);
  //   } else {
  //     formik.setFieldValue(
  //       "puppyPersonality",
  //       formik.values.puppyPersonality.filter(
  //         (personality) => personality !== value
  //       )
  //     );
  //   }
  //   setIsFormChanged(true);
  // };
  // const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;
  //   const newPersonality = checked
  //     ? [...formik.values.puppyPersonality, value]
  //     : formik.values.puppyPersonality.filter(
  //         (personality) => personality !== value
  //       );

  //   formik.setFieldValue("puppyPersonality", newPersonality);
  //   setIsFormChanged(true); // 값이 변경되면 버튼 활성화
  // };
  const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newPersonality = checked
      ? [...formik.values.puppyPersonality, value]
      : formik.values.puppyPersonality.filter(
          (personality) => personality !== value
        );
    formik.setFieldValue("puppyPersonality", newPersonality);
    setIsFormChanged(true);
  };
  // 이미지 변경 처리
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedImage(file);
  //     setImagePreview(URL.createObjectURL(file));
  //     formik.setFieldValue("puppyImage", file);
  //     setIsFormChanged(true);
  //   }
  // };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("puppyImage", file);
      setIsFormChanged(true); // 이미지 변경 시에도 버튼 활성화
    }
  };
  return (
    <PuppyFormFixStyle>
      <form onSubmit={formik.handleSubmit}>
        <div className="PuppyFormfix_closeBtn" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        {/* 이미지 미리보기 */}
        <div className="PuppyFormfix_form_imgs">
          <div className="PuppyFormfix_preview_div">
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
          <button type="submit" disabled={!isFormChanged}>
            {formLabels.submitButton}
          </button>
        </div>
      </form>
    </PuppyFormFixStyle>
  );
};

export default PuppyFormFix;
