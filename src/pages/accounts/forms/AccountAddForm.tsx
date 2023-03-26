import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { LoadingButton } from '@mui/lab'
import { Card, InputAdornment, MenuItem, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useQueryClient } from '@tanstack/react-query'
import { AccountType } from 'api/enums'
import { ACCOUNTS_KEY, usePostAccount } from 'api/hooks'
import { CreateAccountRequest, CreateAccountValidator } from 'api/models'
import { FormProvider, HeaderBreadcrumbs, Iconify, SelectControlled, TextFieldControlled } from 'components'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PATH_ROUTES } from 'router'

import mapEnum from 'utils/enum'

function AccountAddForm() {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isLoading } = usePostAccount()

  const methods = useForm<CreateAccountRequest>({
    resolver: yupResolver(CreateAccountValidator),
    defaultValues: {
      name: '',
      bank: '',
      initialBalance: 0,
      type: AccountType.Expenses,
    },
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: CreateAccountRequest) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries([ACCOUNTS_KEY])
        enqueueSnackbar(t('account.created'), { variant: 'success' })
        navigate(PATH_ROUTES.finance.accounts.path)
      },
      onError: (error) => {
        enqueueSnackbar(t(error.errors[0]), { variant: 'error' })
      },
    })
  }

  return (
    <Container>
      <HeaderBreadcrumbs
        heading={t('account.create')}
        links={[
          { name: t(PATH_ROUTES.finance.title), href: PATH_ROUTES.finance.path },
          { name: t(PATH_ROUTES.finance.accounts.title), href: PATH_ROUTES.finance.accounts.path },
          { name: t('common.create') },
        ]}
      />
      <Card sx={{ p: 3, maxWidth: 600, marginInline: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap={4}>
            <Typography variant="h5">{t('account.add_title')}</Typography>
            <TextFieldControlled name="name" label={t('account.name')} fullWidth disabled={isLoading} />
            <TextFieldControlled name="bank" label={t('account.bank')} fullWidth disabled={isLoading} />
            <TextFieldControlled
              name="initialBalance"
              label={t('account.initial_balance')}
              disabled={isLoading}
              fullWidth
              placeholder="0.00"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={'ic:round-euro-symbol'} />
                  </InputAdornment>
                ),
                type: 'number',
              }}
            />
            <SelectControlled name="type" label={t('account.type')} fullWidth disabled={isLoading}>
              {mapEnum(AccountType).map((accountType, idx) => (
                <MenuItem value={accountType} key={idx}>
                  {accountType}
                </MenuItem>
              ))}
            </SelectControlled>
          </Stack>
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" size="large" loading={isLoading}>
              {t('account.add_button')}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  )
}

export default AccountAddForm
