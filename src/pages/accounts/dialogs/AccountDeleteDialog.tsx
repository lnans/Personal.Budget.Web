import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { ACCOUNTS_KEY, useDeleteAccount } from 'api/hooks'
import { GetAccountsResponse } from 'api/models'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type AccountDeleteDialogProps = {
  account: GetAccountsResponse
  onClose: VoidFunction
}

function AccountDeleteDialog({ account, onClose }: AccountDeleteDialogProps) {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate, isLoading } = useDeleteAccount()
  const queryClient = useQueryClient()

  const onSubmit = () => {
    mutate(account.id, {
      onSuccess: () => {
        enqueueSnackbar(t('account.deleted'), { variant: 'success' })
        onClose()
        queryClient.invalidateQueries([ACCOUNTS_KEY])
      },
      onError: (error) => {
        enqueueSnackbar(t(error.errors[0]), { variant: 'error' })
      },
    })
  }

  return (
    <>
      <DialogTitle sx={{ mb: 2 }}>{t('account.delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('account.confirm_delete', { account: account.name })}</DialogContentText>
        <DialogContentText variant="subtitle2">{t('common.warning')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={onClose} color="inherit" loading={isLoading}>
          {t('action.cancel')}
        </LoadingButton>
        <LoadingButton onClick={onSubmit} variant="contained" color="error" loading={isLoading}>
          {t('action.delete')}
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default AccountDeleteDialog
