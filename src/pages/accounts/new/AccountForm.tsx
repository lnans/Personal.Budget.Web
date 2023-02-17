import { Container } from '@mui/system'
import { HeaderBreadcrumbs } from 'components'
import { useTranslation } from 'react-i18next'
import { PATH_ROUTES } from 'router'

function AccountForm() {
  const { t } = useTranslation()
  return (
    <Container>
      <HeaderBreadcrumbs
        heading={t('account.create')}
        links={[
          { name: t(PATH_ROUTES.finance.title), href: PATH_ROUTES.finance.path },
          { name: t(PATH_ROUTES.finance.accounts.title), href: PATH_ROUTES.finance.accounts.path },
          { name: t('common.create') },
        ]}
      />
    </Container>
  )
}

export default AccountForm
