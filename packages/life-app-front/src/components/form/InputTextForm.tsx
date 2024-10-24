import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

import { Input } from '../ui/Input'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './FormBase'

type InputTextFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label: string
  placeholder?: string
  type?: HTMLInputElement['type']
  autocomplete?: HTMLInputElement['autocomplete']
  className?: string
}

const InputTextForm = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  placeholder,
  type,
  autocomplete,
  className,
  disabled,
  ...props
}: InputTextFormProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field: { value, ...field } }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={value ?? ''}
              disabled={disabled}
              type={type}
              autoComplete={autocomplete}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputTextForm
