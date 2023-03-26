import { TextField, TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IProps {
  name: string
}

export default function TextFieldControlled({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext()
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message && t(error.message)}
          FormHelperTextProps={{ sx: { position: 'absolute', right: 0, bottom: -20 } }}
          {...other}
        />
      )}
    />
  )
}
