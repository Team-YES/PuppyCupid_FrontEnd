import { RegistrationStyled } from "./styled";
import { useFormik } from "formik";
import SelectBox from "@/components/SelectBox";

const Registration = () => {
  // select 선택 목록
  const option = [
    { value: "walk", label: "산책메이트" },
    { value: "free", label: "자유게시판" },
    { value: "adopt", label: "유기견 임시보호 / 입양" },
  ];

  return (
    <RegistrationStyled>
      <div style={{ width: "100%" }}>
        <img src="./cute_cat.jpg" alt="임시" style={{ width: "100%" }} />
      </div>
      <div style={{ padding: 15 }}>
        <div style={{ marginBottom: 15 }}>
          <SelectBox option={option} />
        </div>

        <div
          style={{
            border: "1px solid black",
          }}
        >
          내용
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 15 }}>
        <div>
          <button style={{ cursor: "pointer" }}>취소</button>
        </div>
        <div>
          <button style={{ marginLeft: 10, cursor: "pointer" }}>등록</button>
        </div>
      </div>
    </RegistrationStyled>
  );
};

export default Registration;
