import { accountsRoutes } from '@api/endpoints/accountsEndPoints'
import { AccountTile, OperationsTable, SectionTitle, SwitchInput } from '@components'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import './AccountsPage.scss'

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [archived, setArchived] = useState<boolean>(false)
  const { t } = useTranslation()
  const { data: accounts, refetch } = useQuery<AccountDetailsResponse[]>(accountsRoutes.CACHE_KEY, accountsRoutes.getAccounts({ archived }))

  useEffect(() => {
    setSelectedAccount(null)
    refetch()
  }, [archived])

  useEffect(() => {
    if (accounts?.length) {
      setSelectedAccount(accounts[0].id)
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
          {accounts && accounts.map((account) => <AccountTile key={account.id} account={account} isSelected={selectedAccount === account.id} onClick={setSelectedAccount} />)}
        </div>
      </div>

      <div className="accounts-page-section__operations">
        {selectedAccount && (
          <>
            <SectionTitle>{t('pages.accounts.operations')}</SectionTitle>
            <div className="accounts-page-content">
              <OperationsTable accountId={selectedAccount} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
