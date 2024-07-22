import { useTranslation } from 'react-i18next'

import { ContentLayout } from '@/components/ui/ContentLayout'

export function WalletRoute() {
  const { t } = useTranslation()
  return (
    <ContentLayout title={t('routes.wallet')}>
      <div className="flex flex-col">TODO content</div>
    </ContentLayout>
  )
}
