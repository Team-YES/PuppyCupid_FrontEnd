import {
  RegistrationStyled,
  ImageScrollContainer,
  ImageBox,
  PreviewImg,
  Button,
  ImgLabel,
  ErrorMessage,
  XBtn,
} from "./styled";
import { useFormik } from "formik";
import SelectBox from "@/components/SelectBox";
import TextAreaComp from "@/components/TextAreaComp";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

const Registration = () => {
  // 사진 개수
  const [count, setCount] = useState(0);
  const router = useRouter();

  // 카테고리 선택 목록
  const option = [
    { value: "free", label: "자유게시판" },
    { value: "supplies", label: "반려견 용품추천" },
    { value: "adopt", label: "유기견 임시보호 / 입양" },
  ];
  // const option = [
  //   { value: "walk", label: "산책메이트" },
  //   { value: "free", label: "자유게시판" },
  //   { value: "adopt", label: "유기견 임시보호 / 입양" },
  // ];

  // Formik 설정
  const userFormik = useFormik({
    initialValues: {
      images: [],
      category: "free",
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
        router.push("/board");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            router.push("/login");
          } else {
            // 기타 에러 처리
            alert("게시물 등록에 실패했습니다.");
          }
        } else {
          console.error("로그인 외 에러:", error);
        }
      }
    },
  });
  // console.log(userFormik.values);
  // console.log(userFormik.touched.content);

  return (
    <RegistrationStyled onSubmit={userFormik.handleSubmit}>
      {/* 이미지 업로드 */}
      <div className="Registration_LabelBox">
        <ImgLabel htmlFor="img_upload">
          <i className="fa-solid fa-camera-retro"></i>
          <div className="Registration_count">
            <span className="Point">{count}</span>/10
          </div>
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

      {/* 이미지 미리보기 슬라이드 */}
      <ImageScrollContainer>
        <Swiper
          modules={[Navigation, Scrollbar]}
          scrollbar={{ el: ".swiper-scrollbar" }}
          spaceBetween={12}
          slidesPerView={4}
          style={{ width: "100%", paddingRight: 22 }}
          breakpoints={{
            427: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
          }}
        >
          {Array.isArray(userFormik.values.images) &&
            userFormik.values.images.map((img, i) => (
              <SwiperSlide key={i}>
                <ImageBox>
                  <PreviewImg
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
                </ImageBox>
              </SwiperSlide>
            ))}
        </Swiper>
      </ImageScrollContainer>

      {/* 카테고리 선택 & 본문 입력 */}
      <div style={{ padding: 15 }}>
        <div style={{ marginBottom: 29 }}>
          <SelectBox
            name="category"
            value={userFormik.values.category}
            option={option}
            onChange={(val) => userFormik.setFieldValue("category", val)}
          />
        </div>
        <div className="Registration_Textbox">
          <TextAreaComp
            name="content"
            value={userFormik.values.content}
            onChange={userFormik.handleChange}
            onBlur={userFormik.handleBlur}
          />
        </div>

        {/* 에러 메시지 */}
        {userFormik.touched.content && userFormik.errors.content && (
          <ErrorMessage>{userFormik.errors.content}</ErrorMessage>
        )}
        {userFormik.touched.images && userFormik.errors.images && (
          <ErrorMessage>{userFormik.errors.images}</ErrorMessage>
        )}
      </div>

      {/* 등록, 취소 버튼 */}
      <div className="Registration_BtnBox">
        <Button
          variant={"default"}
          onClick={() => {
            router.push("/board");
          }}
        >
          취소
        </Button>
        <Button type="submit" variant={"confirm"}>
          등록
        </Button>
      </div>
    </RegistrationStyled>
  );
};

export default Registration;
