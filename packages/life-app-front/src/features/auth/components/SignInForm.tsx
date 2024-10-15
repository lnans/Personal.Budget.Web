import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/form/FormBase'
import InputTextForm from '@/components/form/InputTextForm'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/tailwind-merge'
import { resolver } from '@/lib/validation'

import { useSignIn } from '../api/signInEndpoint'
import { AuthDto } from '../types/authDto'
import { SignInRequest } from '../types/signInRequest'
import { signInRequestValidator } from '../types/signInRequestValidator'

type SignInFormProps = {
  onSuccess?: (authDto: AuthDto) => void
  className?: string
}

export function SignInForm({ onSuccess, className }: SignInFormProps) {
  const { t } = useTranslation()

  const signInQuery = useSignIn({ mutationConfig: { onSuccess } })
  const form = useForm<SignInRequest>({ resolver: resolver(signInRequestValidator) })

  const onSubmit = async (form: SignInRequest) => {
    await signInQuery.mutateAsync({ form })
  }

  return (
    <Card className={cn('mx-auto max-w-sm shadow-xl dark:shadow-neutral-800 ', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">{t('features.login.title')}</CardTitle>
            <CardDescription>{t('features.login.header')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <InputTextForm
                control={form.control}
                name="username"
                label={t('features.login.form.username')}
                autocomplete="off"
              />
              <InputTextForm control={form.control} name="password" label={t('features.login.form.password')} type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="mt-2 w-full" loading={signInQuery.isPending} disabled={!form.formState.isValid}>
              {t('actions.sign_in')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
