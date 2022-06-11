import { accountsRoutes } from '@api/endpoints/accountsEndPoints'
import { apiClient } from '@api/utils'
import { Button, CurrencyInput, Dialog, SelectInput, TextInput } from '@components'
import { useFormValidator } from '@hooks/useFormWithSchema'
import { AccountType } from '@models/account/AccountTypeEnum'
import { CreateAccountRequest, CreateAccountRequestValidator } from '@models/account/CreateAccountRequest'
import { EnumToSelect } from '@utils/enum'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import './AddAccountForm.scss'

export interface AddAccountFormProps {
  show: boolean
  onClose: () => void
}

export default function AddAccountForm(props: AddAccountFormProps) {
  const { show, onClose } = props
  const { t, i18n } = useTranslation()
  const accountTypes = EnumToSelect(AccountType, 'account_type', i18n)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidator<CreateAccountRequest>(CreateAccountRequestValidator)

  const onSuccess = () => {
    apiClient.invalidateQueries(accountsRoutes.CACHE_KEY)
    reset()
    onClose()
  }

  const { mutate: createAccount, isLoading } = useMutation(accountsRoutes.postAccount, { onSuccess })

  const onSubmit: SubmitHandler<CreateAccountRequest> = (form: CreateAccountRequest) => {
    createAccount(form)
  }

  return (
    <Dialog show={show} title={t('pages.accounts.form.title')} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="add-account-form">
        <div className="form-section">
          <TextInput
            label={t('pages.accounts.form.name')}
            defaultValue=""
            disabled={isLoading}
            register={register}
            name="name"
            error={!!errors.name?.message ? t(errors.name.message) : undefined}
          />
          <TextInput
            label={t('pages.accounts.form.bank')}
            defaultValue=""
            disabled={isLoading}
            register={register}
            name="bank"
            error={!!errors.bank?.message ? t(errors.bank.message) : undefined}
          />
        </div>
        <div className="form-section">
          <CurrencyInput
            label={t('pages.accounts.form.balance')}
            defaultValue={0}
            disabled={isLoading}
            register={register}
            name="initialBalance"
            error={!!errors.initialBalance?.message ? t(errors.initialBalance.message) : undefined}
          />
          <SelectInput
            label={t('pages.accounts.form.type')}
            disabled={isLoading}
            items={accountTypes}
            itemKey="id"
            itemValue="value"
            register={register}
            name="type"
            error={!!errors.type?.message ? t(errors.type.message) : undefined}
          />
        </div>
        <div className="form-section">
          <Button color="primary" style={{ marginTop: '15px' }}>
            {t('pages.accounts.form.create')}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
