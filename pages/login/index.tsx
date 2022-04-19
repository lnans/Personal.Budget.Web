import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import VsButton from '../../components/VsButton'
import VsCheckBox from '../../components/VsCheckBox'
import VsDialog from '../../components/VsDialog'
import VsHeader from '../../components/VsHeader'
import VsInput from '../../components/VsInput'
import { toastAlertService } from '../../components/VsToaster'
import colors from '../../styles/modules/colors.module.scss'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  }
}

const Login: NextPage = () => {
  const [loading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  const handleLogin = () => {
    setIsLoading(true)
    toastAlertService.info('Connexion', "Cette fonctionnalité n'est pas encore implémentée !")
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <VsDialog show={true} closable={false} width="350px">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
        <VsHeader>
          <MessageStyled>
            {t('login:welcome')} <b>{t('common:app')}</b>
          </MessageStyled>
        </VsHeader>
        <VsInput
          label={t('login:username')}
          value=""
          fullWidth
          icon="bx-user"
          disabled={loading}
          onEnterKey={handleLogin}
        />
        <VsInput
          label={t('login:password')}
          value=""
          fullWidth
          icon="bxs-lock"
          type="password"
          disabled={loading}
          onEnterKey={handleLogin}
        />
        <VsCheckBox label={t('login:remember')} value={false} compact />
        <VsButton color="primary" fullWidth style={{ marginTop: '16px' }} onClick={handleLogin}>
          {t('login:login')}
        </VsButton>
        <InfoStyled>{t('login:info')}</InfoStyled>
      </div>
    </VsDialog>
  )
}

const MessageStyled = styled('h4')`
  & b {
    color: ${() => `rgb(${colors.primary})`};
  }
`

const InfoStyled = styled('div')`
  margin-top: 20px;
  padding: 0;
  font-size: 0.7rem;
  text-align: center;
`

export default Login
