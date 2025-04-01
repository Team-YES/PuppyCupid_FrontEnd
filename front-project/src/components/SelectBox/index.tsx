import { useState } from "react";
import { SelectStyled } from "./styled";
import { Select } from "antd";

type OptionType = {
  value: string;
  label: string;
};

interface Props {
  option: OptionType[];
}

const SelectBox = ({ option }: Props) => {
  const [selected, setSelected] = useState("walk");

  return (
    <SelectStyled>
      <Select
        defaultValue={"산책메이트"}
        style={{ width: "100%" }}
        options={option}
        onChange={(value) => {
          setSelected(value);
        }}
      />
    </SelectStyled>
  );
};

export default SelectBox;
