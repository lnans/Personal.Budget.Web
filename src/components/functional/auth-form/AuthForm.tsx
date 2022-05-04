import { Button, CheckBox, Dialog, TextInput } from '@components'
import SignInRequest from '@models/auth/signInRequest'
import { authService } from '@services'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './AuthForm.scss'

export interface AuthFormProps {
  onLogged: (res: boolean) => void
}

export default function AuthForm(props: AuthFormProps) {
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
    <Dialog show={true} closable={false} width="350px">
      <div className="auth-form-container">
        <header className="auth-form-header">
          <h4>
            {t('components.auth_form.welcome')} <b>{t('app')}</b>
          </h4>
        </header>
        <TextInput
          label={t('components.auth_form.username')}
          value=""
          fullWidth
          icon="bx-user"
          disabled={loading}
          onEnterKey={handleLogin}
          onChange={(value) => setAuthForm({ ...authForm, username: value.toString() })}
        />
        <TextInput
          label={t('components.auth_form.password')}
          value=""
          fullWidth
          icon="bxs-lock"
          type="password"
          disabled={loading}
          onEnterKey={handleLogin}
          onChange={(value) => setAuthForm({ ...authForm, password: value.toString() })}
        />
        <CheckBox label={t('components.auth_form.remember')} value={false} compact />
        <Button color="primary" fullWidth style={{ marginTop: '16px' }} onClick={handleLogin} loading={loading}>
          {t('components.auth_form.login')}
        </Button>
        <div className="auth-form-info">{t('components.auth_form.info')}</div>
      </div>
    </Dialog>
  )
}
