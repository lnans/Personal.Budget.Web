import { AccountTile, AccountTileNew, OperationsTable, SectionTitle } from '@components'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { OperationDetailsResponse } from '@models/operations/OperationDetailsResponse'
import { accountsService, operationsService } from '@services'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './AccountsPage.scss'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<AccountDetailsResponse[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [operations, setOperations] = useState<OperationDetailsResponse>()
  const [, setCreateAccount] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    const getAllAccounts = async () => {
      const result = await accountsService.getAll()
      setAccounts(result.data)
      if (result.data.length > 0) {
        onSelectSite(result.data[0].id)
      }
    }
    getAllAccounts()
  }, [])

  const onSelectSite = async (id: string) => {
    setSelectedAccount(id)
    const operations = await operationsService.getOperations({ accountId: id })
    setOperations(operations.data)
  }

  const loadMore = () => console.log('more')

  return (
    <div className="accounts-page-container">
      <div className="accounts-page-section__accounts">
        <SectionTitle>{t('pages.accounts.title')}</SectionTitle>
        <div className="accounts-page-content">
          {accounts.map((account) => (
            <AccountTile
              key={account.id}
              account={account}
              isSelected={selectedAccount === account.id}
              onClick={onSelectSite}
            />
          ))}
          <AccountTileNew onClick={() => setCreateAccount(true)} />
        </div>
      </div>

      <div className="accounts-page-section__operations">
        {operations && (
          <>
            <SectionTitle>{t('pages.accounts.operations')}</SectionTitle>
            <div className="accounts-page-content">
              <OperationsTable operations={operations} onLoadMore={loadMore} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
