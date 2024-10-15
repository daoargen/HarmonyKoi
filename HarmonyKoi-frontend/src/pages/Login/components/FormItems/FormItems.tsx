import { useMemo } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import InputPassword from  '../../../../components/common/AuthForm/components/InputPassword';//"~components/common/AuthForm/components/InputPassword";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { ObserveInput } from "~hooks/useTeddyAnimation";
import { LoginFormType } from "~pages/Login/Login";

interface FormItemsProps {
  form: UseFormReturn<LoginFormType>;
  observeInputEmail: ObserveInput;
  observeInputPassword: ObserveInput;
}

type LoginObjectType = {
  name: keyof LoginFormType;
  label: string;
  component: (field: ControllerRenderProps<LoginFormType, keyof LoginFormType>) => JSX.Element;
};

const FormItems = ({ form, observeInputEmail, observeInputPassword }: FormItemsProps) => {
  const loginFields: LoginObjectType[] = useMemo(
    () => [
      {
        name: "email",
        label: "Tài khoản",
        component: (field) => (
          <Input
            type="email"
            placeholder="customer@example.com"
            className="h-10 bg-white"
            observeInput={observeInputEmail}
            {...field}
          />
        ),
      },
      {
        name: "password",
        label: "Mật khẩu",
        component: (field) => (
          <InputPassword placeholder="Mật khẩu" observeInput={observeInputPassword} field={{ ...field }} />
        ),
      },
    ],
    [observeInputEmail, observeInputPassword],
  );

  return loginFields.map(({ name, label, component }) => (
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
