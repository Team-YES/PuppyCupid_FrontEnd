import { useFormik } from "formik";
import { Input, notification } from "antd";
const { TextArea } = Input;
import { InputStyled } from "./styled";

function InputComp() {
  // 이미지, select, checkbox모두 가져올 수 있음
  const userFormik = useFormik({
    initialValues: {
      content: "",
    },
    // 버튼 눌렀을때만 실행 / onSubmit은 input에서 엔터누르면 실행됨
    onSubmit: (values) => {
      // 콘솔찍으면 객체형식으로 나옴
      console.log(values);

      notification.success({
        message: "등록 성공!",
      });
      // userFormik.resetForm(); // input값 reset
    },
  });
  // 콘솔찍는법
  // console.log(userFormik.values);

  return (
    <InputStyled>
      <form onSubmit={userFormik.handleSubmit}>
        <TextArea
          name="content"
          placeholder="내용을 입력해주세요."
          value={userFormik.values.content}
          onChange={userFormik.handleChange}
          rows={7}
        ></TextArea>
      </form>
    </InputStyled>
  );
}

export default InputComp;
