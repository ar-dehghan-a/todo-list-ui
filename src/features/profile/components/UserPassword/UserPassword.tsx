import {useAuth} from '@/features/auth'
import {useGlobalMessage} from '@/providers'
import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

// Components
import {Button, Card, Form, Input} from 'antd'

// Services
import {useUpdateUserPassword} from '../../services/mutations'

// Types
import type {AxiosError} from 'axios'

const UserPassword = () => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const {setToken} = useAuth()

  const userPasswordSchema = z
    .object({
      currentPassword: z
        .string()
        .min(2, t('profile.updateUserPassword.validation.currentPasswordRequired')),
      newPassword: z
        .string()
        .min(2, t('profile.updateUserPassword.validation.newPasswordRequired')),
      confirmPassword: z
        .string()
        .min(2, t('profile.updateUserPassword.validation.confirmPasswordRequired')),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('profile.updateUserPassword.validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })
  type UserPasswordFormData = z.infer<typeof userPasswordSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<UserPasswordFormData>({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const {mutate: updateUserPassword, isPending} = useUpdateUserPassword()

  const onSubmit = (data: UserPasswordFormData) => {
    updateUserPassword(data, {
      onSuccess: data => {
        message.success(t('profile.updateUserPassword.success'))
        setToken(data.token)
        reset()
      },
      onError: (error: Error) => {
        const status = (error as AxiosError).response?.status
        if (status === 401) message.error(t('profile.updateUserPassword.error.incorrectPassword'))
        else message.error(t('profile.updateUserPassword.error.serverError'))
      },
    })
  }

  return (
    <Card title={t('profile.updateUserPassword.title')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Item
          label={t('profile.updateUserPassword.currentPassword')}
          help={errors.currentPassword?.message}
          validateStatus={errors.currentPassword ? 'error' : ''}
        >
          <Controller
            name="currentPassword"
            control={control}
            render={({field}) => (
              <Input.Password
                {...field}
                autoComplete="current-password"
                placeholder={t('profile.updateUserPassword.currentPassword')}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.updateUserPassword.newPassword')}
          help={errors.newPassword?.message}
          validateStatus={errors.newPassword ? 'error' : ''}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({field}) => (
              <Input.Password
                {...field}
                autoComplete="new-password"
                placeholder={t('profile.updateUserPassword.newPassword')}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.updateUserPassword.confirmPassword')}
          help={errors.confirmPassword?.message}
          validateStatus={errors.confirmPassword ? 'error' : ''}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({field}) => (
              <Input.Password
                {...field}
                autoComplete="new-password"
                placeholder={t('profile.updateUserPassword.confirmPassword')}
              />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending}>
          {t('profile.updateUserPassword.update')}
        </Button>
      </form>
    </Card>
  )
}

export default UserPassword
