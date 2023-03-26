import { TextField, TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type SelectControlledProps = {
  name: string
  children: ReactNode
}

export default function SelectControlled({ name, children, ...other }: SelectControlledProps & TextFieldProps) {
  const { control } = useFormContext()
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          error={!!error}
          helperText={error?.message && t(error.message)}
          FormHelperTextProps={{ sx: { position: 'absolute', right: 0, bottom: -20 } }}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  )
}
