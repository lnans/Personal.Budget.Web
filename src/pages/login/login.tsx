import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { toastAlertService, RsDialog, RsHeader, RsInput, RsCheckBox, RsButton } from '../../components'
import colors from '../../styles/_colors.module.scss'

export default function LoginPage() {
  const [loading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  const handleLogin = () => {
    setIsLoading(true)
    toastAlertService.info('Connexion', "Cette fonctionnalité n'est pas encore implémentée !")
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <RsDialog show={true} closable={false} width="350px">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
        <RsHeader>
          <MessageStyled>
            {t('pages.login.welcome')} <b>{t('app')}</b>
          </MessageStyled>
        </RsHeader>
        <RsInput
          label={t('pages.login.username')}
          value=""
          fullWidth
          icon="bx-user"
          disabled={loading}
          onEnterKey={handleLogin}
        />
        <RsInput
          label={t('pages.login.password')}
          value=""
          fullWidth
          icon="bxs-lock"
          type="password"
          disabled={loading}
          onEnterKey={handleLogin}
        />
        <RsCheckBox label={t('pages.login.remember')} value={false} compact />
        <RsButton color="primary" fullWidth style={{ marginTop: '16px' }} onClick={handleLogin}>
          {t('pages.login.login')}
        </RsButton>
        <InfoStyled>{t('pages.login.info')}</InfoStyled>
      </div>
    </RsDialog>
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
