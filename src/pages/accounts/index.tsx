import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../components'

export default function AccountsPage() {
  const { t } = useTranslation()
  return <SectionTitle>{t('pages.accounts.title')}</SectionTitle>
}
