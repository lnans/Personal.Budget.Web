import { RsButton, RsCheckBox, RsDialog, RsHeader, RsInput } from '@components'
import SignInRequest from '@models/auth/signInRequest'
import { authService } from '@services'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import colors from '../../styles/_colors.module.scss'

export interface LoginFormProps {
  onLogged: (res: boolean) => void
}

export default function LoginForm(props: LoginFormProps) {
  const [authForm, setAuthForm] = useState<SignInRequest>(new SignInRequest())
  const [loading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  const handleLogin = async () => {
    setIsLoading(true)
    await authService
      .signIn(authForm)
      .then(() => props.onLogged(true))
      .finally(() => setIsLoading(false))
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
          onChange={(value) => setAuthForm({ ...authForm, username: value.toString() })}
        />
        <RsInput
          label={t('pages.login.password')}
          value=""
          fullWidth
          icon="bxs-lock"
          type="password"
          disabled={loading}
          onEnterKey={handleLogin}
          onChange={(value) => setAuthForm({ ...authForm, password: value.toString() })}
        />
        <RsCheckBox label={t('pages.login.remember')} value={false} compact />
        <RsButton color="primary" fullWidth style={{ marginTop: '16px' }} onClick={handleLogin} loading={loading}>
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
