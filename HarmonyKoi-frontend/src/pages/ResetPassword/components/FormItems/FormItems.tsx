import { useMemo } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import InputPassword from "~components/common/AuthForm/components/InputPassword";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { ObserveInput } from "~hooks/useTeddyAnimation";
import { ResetPasswordFormType } from "~pages/ResetPassword/ResetPassword";

interface FormItemsProps {
  form: UseFormReturn<ResetPasswordFormType>;
  observeInputPassword: ObserveInput;
}

type ResetPasswordObjectType = {
  name: keyof ResetPasswordFormType;
  label: string;
  component: (field: ControllerRenderProps<ResetPasswordFormType, keyof ResetPasswordFormType>) => JSX.Element;
};

const FormItems = ({ form, observeInputPassword }: FormItemsProps) => {
  const resetPasswordFields: ResetPasswordObjectType[] = useMemo(
    () => [
      {
        name: "password",
        label: "Mật khẩu",
        component: (field) => (
          <InputPassword placeholder="Mật khẩu" observeInput={observeInputPassword} field={{ ...field }} />
        ),
      },
      {
        name: "confirmPassword",
        label: "Nhập lại mật khẩu",
        component: (field) => (
          <InputPassword placeholder="Nhập lại mật khẩu" observeInput={observeInputPassword} field={{ ...field }} />
        ),
      },
    ],
    [observeInputPassword],
  );

  return resetPasswordFields.map(({ name, label, component }) => (
    <FormField
      control={form.control}
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem className="w-96">
          <FormLabel>{label}</FormLabel>
          <FormControl>{component(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
};

export default FormItems;
