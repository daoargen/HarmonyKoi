import { useState } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { Input } from '../../../../ui/input';
import { ObserveInput } from "~/../../src/hooks/useTeddyAnimation";

interface InputPasswordProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder: string;
  observeInput?: ObserveInput;
}

const InputPassword = ({ field, placeholder, observeInput }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="h-10 bg-white"
        observeInput={observeInput}
        {...field}
      />
      {showPassword ? (
        <FaRegEye
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleTogglePassword}
        />
      ) : (
        <FaRegEyeSlash
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleTogglePassword}
        />
      )}
    </div>
  );
};

export default InputPassword;
