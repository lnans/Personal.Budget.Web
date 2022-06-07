import { OperationDetailsResponse } from '@models/operations/OperationDetailsResponse'
import { OperationType } from '@models/operations/OperationTypeEnum'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import './OperationsTable.scss'

export interface OperationsTableProps {
  operations: OperationDetailsResponse
  onLoadMore: () => void
}

export default function OperationsTable(props: OperationsTableProps) {
  const { operations } = props
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const formatDate = (date: string) => {
    if (isNaN(Date.parse(date))) return 'a venir'
    return new Intl.DateTimeFormat(language, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
  }

  const formatIcon = (type: OperationType) => {
    switch (type) {
      case OperationType.Expense:
        return 'bx bxs-credit-card'
      case OperationType.Income:
        return 'bx bx-trending-up'
      case OperationType.Fixed:
        return 'bx bx-trending-down'
      case OperationType.Transfer:
        return 'bx bx-transfer'
      case OperationType.Budget:
        return 'bx bx-wallet'
      default:
        return ''
    }
  }

  const formatAmount = (amount: number) => {
    if (amount < 0) return 'negative'
    if (amount === 0) return 'zero'
    return 'positive'
  }

  return (
    <div className="operations-table-container">
      <div className="operations-table-content">
        {operations.total === 0 ? (
          <p>{t('components.operations_table.no_data')}</p>
        ) : (
          <table className="operations-table">
            <tbody>
              {Object.keys(operations.operationsByDays).map((day) => (
                <Fragment key={day}>
                  <tr className="operations-table__header">
                    <td className={day === 'none' ? 'upcoming' : ''}>
                      <div>
                        {day === 'none' && <i className="bx bx-stopwatch" />}
                        {formatDate(day)}
                      </div>
                    </td>
                  </tr>

                  {operations.operationsByDays[day].map((operation) => (
                    <tr className="operations-table__line" key={operation.id}>
                      <td>
                        <div className="operations-table__line-content">
                          <div className="operations-table__line-type">
                            <i className={formatIcon(operation.type)}></i>
                          </div>

                          <div className="operations-table__line-description__content">
                            <p className="operations-table__line-description">{operation.description}</p>
                            <p className="operations-table__line-account">{operation.accountName}</p>
                          </div>
                          {operation.tagId && (
                            <div
                              className="operations-table__line-tag"
                              style={{
                                borderColor: operation.tagColor,
                                backgroundColor: `${operation.tagColor}30`,
                                color: operation.tagColor,
                              }}
                            >
                              <p>{operation.tagName}</p>
                            </div>
                          )}
                          <div className={`operations-table__line-amount ${formatAmount(operation.amount)}`}>
                            {operation.amount > 0 && <>+</>} {operation.amount.toString().replace('.', ',')} €
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
