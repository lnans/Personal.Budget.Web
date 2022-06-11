import { accountsRoutes } from '@api/endpoints/accountsEndPoints'
import { AccountTile, OperationsTable, SectionTitle } from '@components'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import './AccountsPage.scss'

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const { t } = useTranslation()
  const { data: accounts } = useQuery<AccountDetailsResponse[]>(accountsRoutes.CACHE_KEY, accountsRoutes.getAccounts())

  return (
    <div className="accounts-page-container">
      <div className="accounts-page-section__accounts">
        <SectionTitle>{t('pages.accounts.title')}</SectionTitle>
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
