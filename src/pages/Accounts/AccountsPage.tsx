import { accountsRoutes } from '@api/endpoints/accountsEndPoints'
import { AccountTile, AccountTileNew, ButtonFloating, OperationsTable, SectionTitle, SwitchInput } from '@components'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import './AccountsPage.scss'
import AddAccountForm from './AddAccount/AddAccountForm'
import EditAccountForm from './EditAccount/EditAccountForm'

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<AccountDetailsResponse | null>(null)
  const [archived, setArchived] = useState<boolean>(false)
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false)
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false)
  const { t } = useTranslation()
  const { data: accounts, refetch } = useQuery<AccountDetailsResponse[]>(accountsRoutes.CACHE_KEY, accountsRoutes.getAccounts({ archived }))

  useEffect(() => {
    setSelectedAccount(null)
    refetch()
  }, [archived])

  useEffect(() => {
    if (accounts?.length) {
      setSelectedAccount(accounts[0])
    }
  }, [accounts])

  return (
    <div className="accounts-page-container">
      <div className="accounts-page-section__accounts">
        <SectionTitle>{t('pages.accounts.title')}</SectionTitle>
        <div className="accounts-filter-switch">
          <SwitchInput textOn="Archivé" textOff="Archivé" onChange={setArchived} highlight={true} />
        </div>
        <div className="accounts-page-content">
          {accounts &&
            accounts.map((account) => (
              <AccountTile
                key={account.id}
                account={account}
                isSelected={selectedAccount?.id === account.id}
                onClick={() => setSelectedAccount(account)}
                onEdit={() => setIsEditingAccount(true)}
              />
            ))}
          <AccountTileNew onClick={() => setIsCreatingAccount(true)} />
        </div>
      </div>

      <div className="accounts-page-section__operations">
        {selectedAccount && (
          <>
            <SectionTitle>{t('pages.accounts.operations')}</SectionTitle>
            <div className="accounts-page-content">
              <OperationsTable accountId={selectedAccount.id} />
            </div>
          </>
        )}
        <ButtonFloating icon="bx bx-add-to-queue" />
      </div>
      <AddAccountForm show={isCreatingAccount} onClose={() => setIsCreatingAccount(false)} />
      {selectedAccount && <EditAccountForm account={selectedAccount} show={isEditingAccount} onClose={() => setIsEditingAccount(false)} />}
    </div>
  )
}
