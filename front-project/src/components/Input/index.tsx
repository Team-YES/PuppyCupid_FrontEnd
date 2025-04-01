import { useFormik } from "formik";
import { Button, Input, notification } from "antd";
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

      // notification.warning({
      //   message: "저장안됨",
      // })
      // userFormik.resetForm(); // input값 reset
    },
  });
  // 콘솔찍는법
  // console.log(userFormik.values)

  return (
    <InputStyled>
      <form onSubmit={userFormik.handleSubmit}>
        <Input
          name="name"
          placeholder="내용"
          value={userFormik.values.content}
          onChange={userFormik.handleChange}
        ></Input>
        {/* antd 버튼 쓸 때만 htmlType 정해줘야함 그냥 버튼은 상관없음 */}
        <Button htmlType="submit">저장</Button>
      </form>
    </InputStyled>
  );
}

export default InputComp;
