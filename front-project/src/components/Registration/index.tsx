import {
  RegistrationStyled,
  Button,
  ImgLabel,
  ErrorMessage,
  XBtn,
} from "./styled";
import { useFormik } from "formik";
import SelectBox from "@/components/SelectBox";
import TextAreaComp from "@/components/TextAreaComp";
import { useRouter } from "next/router";
import { notification } from "antd";
import axios from "axios";
import { useState } from "react";

// interface FormValues {
//   images: File[];
//   category: string;
//   title: string;
//   content: string;
// }

const Registration = () => {
  // 사진 개수
  const [count, setCount] = useState(0);

  // select 선택 목록
  const option = [
    { value: "walk", label: "산책메이트" },
    { value: "free", label: "자유게시판" },
    { value: "adopt", label: "유기견 임시보호 / 입양" },
  ];

  // 페이지 이동
  const router = useRouter();

  // 게시물 저장
  // 이미지, select, checkbox모두 가능
  const userFormik = useFormik({
    initialValues: {
      images: [],
      category: "walk",
      // title: "",
      content: "",
    },
    validate: (values) => {
      const errors: {
        content?: string;
        title?: string;
        images?: string;
      } = {};

      // 이미지 유효성 검사
      if (values.images.length === 0) {
        errors.images = "이미지를 첨부해주세요.";
      }

      // 내용 유효성 검사
      if (!values.content?.trim()) {
        errors.content = "내용을 입력해주세요.";
      } else if (values.content.length > 1000) {
        errors.content = "1000자 이하로 작성해주세요.";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();

      values.images.forEach((img) => {
        formData.append("images", img);
      });
      formData.append("category", values.category);
      formData.append("content", values.content);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // 게시글 등록 axios 요청(파일 업로드용 헤더, 인증 쿠키)
      try {
        const res = await axios.post(
          "http://localhost:5000/posts/form",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log("게시물 등록 성공 응답: ", res.data);

        alert("게시물을 등록하였습니다.");
        // notification.success({
        //   message: "게시글 등록성공!",
        // });
        router.push("/board");
      } catch (error) {
        console.error("게시물 등록 에러: ", error);
      }
    },
  });
  // console.log(userFormik.values);
  // console.log(userFormik.touched.content);

  return (
    <RegistrationStyled onSubmit={userFormik.handleSubmit}>
      <div className="Registration_LabelBox">
        <ImgLabel htmlFor="img_upload">
          <i className="fa-solid fa-camera-retro"></i>
          <div className="Registration_count">{count}/10</div>
        </ImgLabel>
        <input
          id="img_upload"
          name="image"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.currentTarget.files || []);
            const current = userFormik.values.images || [];

            // 최대 10장 제한
            const combined = [...current, ...files];

            if (combined.length > 10) {
              alert("사진은 최대 10장까지만 등록 가능합니다.");
            }
            const limited = combined.slice(0, 10);
            userFormik.setFieldValue("images", limited);

            // count 업데이트
            setCount(limited.length);
          }}
        />
      </div>
      <div className="Registration_ImagesContainer">
        {Array.isArray(userFormik.values.images) &&
          userFormik.values.images.map((img, i) => (
            <div className="Registration_ImageBox" key={i}>
              <img
                className="Registration_Img"
                src={URL.createObjectURL(img)}
                alt={`이미지 미리보기${i + 1}`}
              />
              <XBtn
                type="button"
                onClick={() => {
                  const updated = userFormik.values.images.filter(
                    (_, idx) => idx !== i
                  );
                  userFormik.setFieldValue("images", updated);
                  // 사진 개수 수정
                  setCount(updated.length);
                }}
              >
                ×
              </XBtn>
            </div>
          ))}
      </div>

      <div style={{ padding: 15 }}>
        <div style={{ marginBottom: 15 }}>
          <SelectBox
            name="category"
            value={userFormik.values.category}
            option={option}
            onChange={(val) => userFormik.setFieldValue("category", val)}
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <TextAreaComp
            name="content"
            value={userFormik.values.content}
            onChange={userFormik.handleChange}
            onBlur={userFormik.handleBlur}
          />
        </div>
        {userFormik.touched.content && userFormik.errors.content && (
          <ErrorMessage>{userFormik.errors.content}</ErrorMessage>
        )}
        {userFormik.touched.images && userFormik.errors.images && (
          <ErrorMessage>{userFormik.errors.images}</ErrorMessage>
        )}
      </div>

      <div className="Registration_BtnBox">
        <div>
          {/* 수정예정 : 전체게시물url로 이동 */}
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/board");
            }}
          >
            취소
          </Button>
        </div>
        <div>
          <Button type="submit" variant={"confirm"}>
            등록
          </Button>
        </div>
      </div>
    </RegistrationStyled>
  );
};

export default Registration;
