import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/form/FormBase'
import InputTextForm from '@/components/form/InputTextForm'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { AuthFormDto, authFormSchema, AuthTokensDto } from '@/types/authTypes'
import { cn } from '@/utils/cn'

import { useLogin } from '../api/login'

type LoginFormProps = {
  onSuccess?: (authToken: AuthTokensDto) => void
  className?: string
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
  const { t } = useTranslation('login')
  const { mutate: login, isPending } = useLogin({ mutationConfig: { onSuccess } })

  const form = useForm<AuthFormDto>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { login: '', password: '' },
  })

  function onSubmit(form: AuthFormDto) {
    login({ form })
  }

  return (
    <Card className={cn('mx-auto max-w-sm dark:shadow-neutral-800 shadow-xl ', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>{t('header')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <InputTextForm control={form.control} name="login" label={t('form.username')} autocomplete="off" />
              <InputTextForm control={form.control} name="password" label={t('form.password')} type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="mt-2 w-full" loading={isPending}>
              {t('form.submit')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
