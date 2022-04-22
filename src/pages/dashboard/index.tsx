import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../components'

export default function DashboardPage() {
  const { t } = useTranslation()
  return <SectionTitle>{t('pages.dashboard.summary_title')}</SectionTitle>
}
