import { InputCompStyled } from "./styled";
import { Input } from "antd";

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComp = ({ name, value, onChange, onBlur }: Props) => {
  return (
    <InputCompStyled>
      <Input
        placeholder="제목"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </InputCompStyled>
  );
};

export default InputComp;
