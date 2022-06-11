import { operationsRoutes } from '@api/endpoints/operationsEndPoints'
import { PaginatedData } from '@models/common/paginatedData'
import { OperationDetailsResponse } from '@models/operations/OperationDetailsResponse'
import { OperationType } from '@models/operations/OperationTypeEnum'
import { formatLongDate, formatShortDate, isValidDate } from '@utils/date'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InfiniteData, useInfiniteQuery } from 'react-query'
import './OperationsTable.scss'

type OperationsGroupByDays = {
  [key in string]: OperationDetailsResponse[]
}

export interface OperationsTableProps {
  accountId?: string
}

export default function OperationsTable(props: OperationsTableProps) {
  const { accountId } = props
  const { t, i18n } = useTranslation()
  const [operationsByDays, setOperationsByDays] = useState<OperationsGroupByDays>()

  // Group API result by days
  const onDataFetch = (data: InfiniteData<PaginatedData<OperationDetailsResponse>>) => {
    let byDays: OperationsGroupByDays | undefined
    data?.pages.forEach((page) => {
      page.data.forEach((op) => {
        const key = op.executionDate ? formatShortDate(i18n.language, op.creationDate) : 'none'
        if (!byDays) {
          byDays = {}
        }
        if (!byDays[key]) {
          byDays[key] = []
        }
        byDays[key].push(op)
      })
    })
    setOperationsByDays(byDays)
  }

  useInfiniteQuery<PaginatedData<OperationDetailsResponse>>([operationsRoutes.CACHE_KEY, accountId], operationsRoutes.getOperations({ accountId }), {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    onSuccess: onDataFetch,
  })

  const formatOperationHeader = (date: string) => {
    if (!isValidDate(date)) return 'a venir'
    return formatLongDate(i18n.language, date)
  }

  const iconClass = (type: OperationType) => {
    return clsx({
      bx: true,
      'bxs-credit-card': type === OperationType.Expense,
      'bx-trending-up': type === OperationType.Income,
      'bx-trending-down': type === OperationType.Fixed,
      'bx-transfer': type === OperationType.Transfer,
      'bx-wallet': type === OperationType.Budget,
    })
  }

  const amountClass = (amount: number) => {
    return clsx({
      negative: amount < 0,
      zero: amount === 0,
      positive: amount > 0,
    })
  }

  return (
    <div className="operations-table-container">
      <div className="operations-table-content">
        {!operationsByDays ? (
          <p>{t('components.operations_table.no_data')}</p>
        ) : (
          <table className="operations-table">
            <tbody>
              {Object.keys(operationsByDays).map((day) => (
                <Fragment key={day}>
                  <tr className="operations-table__header">
                    <td className={day === 'none' ? 'upcoming' : ''}>
                      <div>
                        {day === 'none' && <i className="bx bx-stopwatch" />}
                        {formatOperationHeader(day)}
                      </div>
                    </td>
                  </tr>

                  {operationsByDays[day].map((operation) => (
                    <tr className="operations-table__line" key={operation.id}>
                      <td>
                        <div className="operations-table__line-content">
                          <div className="operations-table__line-type">
                            <i className={iconClass(operation.type)}></i>
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
                          <div className={`operations-table__line-amount ${amountClass(operation.amount)}`}>
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
