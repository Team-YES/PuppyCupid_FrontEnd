import { RegistrationStyled, Button } from "./styled";
import { useFormik } from "formik";
import SelectBox from "@/components/SelectBox";
import TextAreaComp from "@/components/TextAreaComp";
import { useRouter } from "next/router";
import { notification } from "antd";
import axios from "axios";

const Registration = () => {
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
      category: "",
      content: "",
    },
    validate: (values) => {
      const errors: { content?: string } = {};

      if (!values.content?.trim()) {
        errors.content = "내용을 입력해주세요.";
      } else if (values.content.length > 1000) {
        errors.content = "1000자 이하로 작성해주세요.";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);

      // 게시글 등록 axios 요청
      // await axios.post("주소", values);
      // router.push('/board');

      notification.success({
        message: "등록 성공!",
      });
      // userFormik.resetForm(); // input값 reset
    },
  });
  // console.log(userFormik.values);
  // console.log(userFormik.touched.content);

  return (
    <RegistrationStyled onSubmit={userFormik.handleSubmit}>
      <div style={{ width: "100%" }}>
        <img src="./cute_cat.jpg" alt="임시" style={{ width: "100%" }} />
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
        <div>
          <TextAreaComp
            name="content"
            value={userFormik.values.content}
            onChange={userFormik.handleChange}
            onBlur={userFormik.handleBlur}
          />
        </div>
        {userFormik.touched.content && userFormik.errors.content && (
          <div style={{ color: "red", marginTop: 6, fontSize: 14 }}>
            {userFormik.errors.content}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", padding: 15 }}>
        <div>
          {/* 수정예정 : 전체게시물로 이동 */}
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/post_registration");
            }}
          >
            취소
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            variant={"confirm"}
            style={{ marginLeft: 14, backgroundColor: "blue" }}
          >
            등록
          </Button>
        </div>
      </div>
    </RegistrationStyled>
  );
};

export default Registration;
