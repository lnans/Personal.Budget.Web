import { Button, CheckBox, Dialog, TextInput } from '@components'
import { SignInRequest, SignInRequestValidator } from '@models/auth/signInRequest'
import { AuthService } from '@services'
import { useFormValidator } from '@hooks/useFormWithSchema'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './AuthForm.scss'

export interface AuthFormProps {
  onLogged: (res: boolean) => void
}

export default function AuthForm(props: AuthFormProps) {
  const [loading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidator<SignInRequest>(SignInRequestValidator)

  const onSubmit: SubmitHandler<SignInRequest> = async (form: SignInRequest) => {
    setIsLoading(true)
    const authService = new AuthService()
    await authService
      .signIn(form)
      .then(() => props.onLogged(true))
      .finally(() => setIsLoading(false))
  }

  return (
    <Dialog show={true} closable={false} width="350px">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form-container" data-testid="auth-form">
        <header className="auth-form-header">
          <h4>
            {t('components.auth_form.welcome')} <b>{t('app')}</b>
          </h4>
        </header>
        <TextInput
          label={t('components.auth_form.username')}
          defaultValue=""
          fullWidth
          icon="bx-user"
          disabled={loading}
          register={register}
          name="username"
          error={!!errors.username?.message ? t(errors.username.message) : undefined}
        />
        <TextInput
          label={t('components.auth_form.password')}
          defaultValue=""
          fullWidth
          icon="bxs-lock"
          type="password"
          disabled={loading}
          register={register}
          name="password"
          error={!!errors.password?.message ? t(errors.password.message) : undefined}
        />
        <CheckBox label={t('components.auth_form.remember')} defaultValue={false} compact disabled={loading} />
        <Button color="primary" fullWidth style={{ marginTop: '16px' }} loading={loading}>
          {t('components.auth_form.login')}
        </Button>
        <div className="auth-form-info">{t('components.auth_form.info')}</div>
      </form>
    </Dialog>
  )
}
