import { useFormik } from "formik";
import { Input, notification } from "antd";
const { TextArea } = Input;
import { InputStyled } from "./styled";
import React from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaComp({ name, value, onChange, onBlur }: InputProps) {
  return (
    <InputStyled>
      <TextArea
        name={name}
        placeholder="내용을 입력해주세요."
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={7}
      ></TextArea>
    </InputStyled>
  );
}

export default TextAreaComp;
