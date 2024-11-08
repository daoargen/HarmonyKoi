import { memo, useMemo } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

import InputPassword from '../../../../components/common/AuthForm/components/InputPassword'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { ObserveInput } from '../../../../hooks/useTeddyAnimation'
import { RegisterFormType } from '../../../../pages/Register/Register'

interface FormItemsProps {
  form: UseFormReturn<RegisterFormType>
  observeInputText: ObserveInput
  observeInputEmail: ObserveInput
  observeInputPassword: ObserveInput
}

type RegisterObjectType = {
  name: keyof RegisterFormType
  label: string
  component: (field: ControllerRenderProps<RegisterFormType, keyof RegisterFormType>) => JSX.Element
}

const FormItems = memo(({ form, observeInputText, observeInputEmail, observeInputPassword }: FormItemsProps) => {
  const registerFields: RegisterObjectType[] = useMemo(
    () => [
      {
        name: 'fullname',
        label: 'Họ và tên',
        component: (field) => (
          <Input
            type='text'
            placeholder='Nguyen Van A'
            className='h-10 bg-white'
            observeInput={observeInputText}
            {...field}
          />
        )
      },
      {
        name: 'email',
        label: 'Tài khoản',
        component: (field) => (
          <Input
            type='email'
            placeholder='customer@example.com'
            className='h-10 bg-white'
            observeInput={observeInputEmail}
            {...field}
          />
        )
      },
      {
        name: 'phone',
        label: 'Số điện thoại',
        component: (field) => (
          <Input
            type='tel'
            placeholder='Số điện thoại'
            className='h-10 bg-white'
            observeInput={observeInputText}
            {...field}
          />
        )
      },
      {
        name: 'password',
        label: 'Mật khẩu',
        component: (field) => (
          <InputPassword placeholder='Mật khẩu' observeInput={observeInputPassword} field={{ ...field }} />
        )
      }
    ],
    [observeInputEmail, observeInputPassword, observeInputText]
  )

  return registerFields.map(({ name, label, component }) => (
    <FormField
      control={form.control}
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem className='w-96'>
          <FormLabel>{label}</FormLabel>
          <FormControl>{component(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ))
})

export default FormItems
