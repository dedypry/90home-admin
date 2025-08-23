import { InputProps } from "@heroui/react";
import { forwardRef, useState } from "react";

import CustomInput from "./custom-input";

import debounce from "@/utils/helpers/debounce";

interface Props {
  onInput: (val: number) => void;
}
function CustomInputNumber(
  { onInput, ...props }: Props & InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const [val, setVal] = useState(props.value);

  const inputDebounce = debounce((val) => {
    onInput(val);
  }, 1000);

  function handleInput(val: string) {
    const numericVal = val.replace(/\D/g, "");

    setVal(formatNumber(numericVal));
    inputDebounce(Number(numericVal));
  }

  function formatNumber(num: number | string): string {
    if (!num) return "";

    return num
      .toString()
      .replace(/\D/g, "") // buang non-digit
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // kasih titik ribuan
  }

  return (
    <CustomInput
      ref={ref}
      {...props}
      value={val}
      onChange={(e) => handleInput(e.target.value)}
    />
  );
}

export default forwardRef(CustomInputNumber);
