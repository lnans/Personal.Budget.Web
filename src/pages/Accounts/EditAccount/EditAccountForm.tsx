import { accountsRoutes } from '@api/endpoints/accountsEndPoints'
import { apiClient } from '@api/utils'
import { Button, Dialog, TextInput } from '@components'
import { useFormValidator } from '@hooks/useFormWithSchema'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { PatchAccountRequest, PatchAccountRequestValidator } from '@models/account/PatchAccountRequest'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import './EditAccountForm.scss'

export interface EditAccountFormProps {
  account: AccountDetailsResponse
  show: boolean
  onClose: () => void
}

export default function EditAccountForm(props: EditAccountFormProps) {
  const { account, show, onClose } = props
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidator<PatchAccountRequest>(PatchAccountRequestValidator, account)

  const onSuccess = () => {
    apiClient.invalidateQueries(accountsRoutes.CACHE_KEY)
    onClose()
  }

  const { mutate: patchAccount, isLoading } = useMutation(accountsRoutes.patchAccount(account.id), { onSuccess: onSuccess })
  const { mutate: archiveAccount } = useMutation(accountsRoutes.archiveAccount(account.id, !account.archived), { onSuccess: onSuccess })
  const { mutate: deleteAccount } = useMutation(accountsRoutes.deleteAccount(account.id), { onSuccess: onSuccess })

  const onSubmit: SubmitHandler<PatchAccountRequest> = (form: PatchAccountRequest) => {
    patchAccount(form)
  }

  useEffect(() => {
    reset(account)
  }, [account])

  return (
    <Dialog show={show} title={t('pages.accounts.form.title_edit')} onClose={onClose}>
      <div className="edit-account-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-form-section">
            <TextInput
              label={t('pages.accounts.form.name')}
              defaultValue={account.name}
              disabled={isLoading}
              register={register}
              name="name"
              error={!!errors.name?.message ? t(errors.name.message) : undefined}
            />
            <TextInput
              label={t('pages.accounts.form.bank')}
              defaultValue={account.bank}
              disabled={isLoading}
              register={register}
              name="bank"
              error={!!errors.bank?.message ? t(errors.bank.message) : undefined}
            />
          </div>
          <div className="edit-form-section">
            <Button color="primary" style={{ marginTop: '15px' }} loading={isLoading}>
              {t('pages.accounts.form.patch')}
            </Button>
          </div>
          <div className="divider" />
        </form>{' '}
        <div className="edit-form-section">
          <Button color="default" onClick={archiveAccount} loading={isLoading}>
            {account.archived ? t('pages.accounts.form.activate') : t('pages.accounts.form.archive')}
          </Button>
          <Button color="error" onClick={deleteAccount} loading={isLoading}>
            {t('pages.accounts.form.delete')}
          </Button>
        </div>{' '}
      </div>
    </Dialog>
  )
}
