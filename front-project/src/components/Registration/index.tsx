import { RegistrationStyled } from "./styled";
import { Select } from "antd";
// import { useFormik } from "formik";

const Registration = () => {
  const option = [
    { value: "red", label: "산책메이트" },
    { value: "yellow", label: "자유게시판" },
    { value: "blue", label: "유기견 임시보호 / 입양" },
  ];
  console.log(option);

  return (
    <RegistrationStyled>
      <div style={{ width: "100%" }}>
        <img src="./cute_cat.jpg" alt="임시" style={{ width: "100%" }} />
      </div>
      <div style={{ padding: 15 }}>
        <div
          style={{
            border: "1px solid black",
            marginBottom: 15,
          }}
        >
          카테고리
        </div>
        {/* <Select
          defaultValue={"산책메이트"}
          style={{ width: "100%" }}
          options={option}
        /> */}
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
