import { useTranslation } from 'react-i18next'
import { RsButton, RsHeader, RsInput, RsSelect } from '../../../components'
import { AccountType } from '../../../models/account/AccountTypeEnum'

export default function CreateAccountForm() {
  const { t } = useTranslation()
  const accountTypes = [
    {
      id: AccountType.Expenses,
      label: 'Expenses',
    },
    {
      id: AccountType.Savings,
      label: 'Savings',
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
      <RsHeader>{t('pages.accounts.form.title')}</RsHeader>
      <div style={{ display: 'flex' }}>
        <RsInput label={t('pages.accounts.form.name')} value="" />
        <RsInput label={t('pages.accounts.form.bank')} value="" />
      </div>
      <div style={{ display: 'flex' }}>
        <RsInput label={t('pages.accounts.form.balance')} value="" />
        <RsSelect label={t('pages.accounts.form.type')} itemKey="id" itemValue="label" items={accountTypes} />
      </div>

      <RsButton color="primary" style={{ margin: '16px 5px 0 5px', alignSelf: 'center' }}>
        {t('pages.accounts.form.create')}
      </RsButton>
    </div>
  )
}
