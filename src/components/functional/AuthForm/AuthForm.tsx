import { authenticationRoutes } from '@api/endpoints/authEndPoints'
import { Button, CheckBox, Dialog, TextInput } from '@components'
import { useFormValidator } from '@hooks/useFormWithSchema'
import { SignInRequest, SignInRequestValidator } from '@models/auth/signInRequest'
import { SignInResponse } from '@models/auth/signInResponse'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import './AuthForm.scss'

export interface AuthFormProps {
  onLogged: (res: boolean) => void
}

export default function AuthForm(props: AuthFormProps) {
  const { onLogged } = props
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidator<SignInRequest>(SignInRequestValidator)

  const onSuccess = (data: SignInResponse) => {
    localStorage.setItem('token', data.token ?? '')
    onLogged(true)
  }

  const { mutate: signIn, isLoading } = useMutation(authenticationRoutes.signIn, { onSuccess })

  const onSubmit: SubmitHandler<SignInRequest> = (form: SignInRequest) => {
    signIn(form)
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
          disabled={isLoading}
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
          disabled={isLoading}
          register={register}
          name="password"
          error={!!errors.password?.message ? t(errors.password.message) : undefined}
        />
        <CheckBox label={t('components.auth_form.remember')} defaultValue={false} compact disabled={isLoading} />
        <Button color="primary" fullWidth style={{ marginTop: '16px' }} loading={isLoading}>
          {t('components.auth_form.login')}
        </Button>
        <div className="auth-form-info">{t('components.auth_form.info')}</div>
      </form>
    </Dialog>
  )
}
