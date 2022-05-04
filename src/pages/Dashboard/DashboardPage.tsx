import { SectionTitle } from '@components'
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { t } = useTranslation()
  return <SectionTitle>{t('pages.dashboard.summary_title')}</SectionTitle>
}
