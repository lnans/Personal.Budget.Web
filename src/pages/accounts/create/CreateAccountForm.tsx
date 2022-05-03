import { Button, TextField, SelectField } from '@components'
import { AccountType } from '@models/account/AccountTypeEnum'
import { CreateAccountRequest } from '@models/account/CreateAccountRequest'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CreateAccountForm() {
  const [form, setForm] = useState<CreateAccountRequest>(new CreateAccountRequest())
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

  useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
      <div style={{ display: 'flex' }}>
        <TextField
          label={t('pages.accounts.form.name')}
          value={form.name ?? ''}
          onChange={(value) => setForm({ ...form, name: value.toString() })}
        />
        <TextField
          label={t('pages.accounts.form.bank')}
          value={form.bank ?? ''}
          onChange={(value) => setForm({ ...form, bank: value.toString() })}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <SelectField
          label={t('pages.accounts.form.type')}
          itemKey="id"
          itemValue="label"
          items={accountTypes}
          onChange={(value) => setForm({ ...form, type: value })}
        />
      </div>

      <Button color="primary" style={{ margin: '16px 5px 0 5px', alignSelf: 'center' }}>
        {t('pages.accounts.form.create')}
      </Button>
    </div>
  )
}
