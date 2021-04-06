import { useState } from "react";
import { CirclePicker } from "react-color";

const ColorPicker = ({ setBackground }) => {
  return (
    <CirclePicker
      width="300px"
      onChangeComplete={(color) => setBackground(color.hex)}
    />
  );
};

export default ColorPicker;
