import { useState } from "react";
import { SelectStyled } from "./styled";
import { Select } from "antd";

type OptionType = {
  value: string;
  label: string;
};

interface Props {
  name: string;
  value: string;
  option: OptionType[];
  onChange: (value: string) => void;
}

const SelectBox = ({ name, value, option, onChange }: Props) => {
  return (
    <SelectStyled>
      <Select
        value={value}
        style={{ width: "100%" }}
        options={option}
        onChange={onChange}
      />
    </SelectStyled>
  );
};

export default SelectBox;
