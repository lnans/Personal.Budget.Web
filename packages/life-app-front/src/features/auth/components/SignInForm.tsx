import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/form/FormBase'
import InputTextForm from '@/components/form/InputTextForm'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { resolver } from '@/lib/validation'

import { useSignIn } from '../api/signInEndpoint'
import { useAuthStore } from '../stores/authStore'
import { SignInRequest } from '../types/signInRequest'
import { signInRequestValidator } from '../types/signInRequestValidator'

type SignInFormProps = {
  onSuccess?: () => void
  className?: string
}

export function SignInForm({ onSuccess, className }: SignInFormProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { setIdentity } = useAuthStore((state) => state.actions)

  const signInQuery = useSignIn({
    mutationConfig: {
      onSuccess: (identity) => {
        setIdentity(identity)
        onSuccess?.()
      },
      onError: () => {
        toast({
          title: t('features.login.title'),
          description: t('features.login.failed'),
          variant: 'destructive',
        })
      },
    },
  })

  const form = useForm<SignInRequest>({ resolver: resolver(signInRequestValidator) })

  const onSubmit = async (form: SignInRequest) => {
    await signInQuery.mutateAsync({ form })
  }

  return (
    <Card className={cn('mx-auto max-w-sm ', className)}>
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
                disabled={signInQuery.isPending}
              />
              <InputTextForm
                control={form.control}
                name="password"
                label={t('features.login.form.password')}
                type="password"
                disabled={signInQuery.isPending}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="mt-2 w-full" disabled={signInQuery.isPending}>
              {signInQuery.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {t('actions.sign_in')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
