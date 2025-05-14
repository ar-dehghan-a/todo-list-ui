import {useGlobalMessage} from '@/providers'
import styled from '@emotion/styled'
import {zodResolver} from '@hookform/resolvers/zod'
import {AxiosError} from 'axios'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import {z} from 'zod'
import useAuth from '../hooks/useAuth'

// Components
import {Button, Card, Form, Input, Typography} from 'antd'

// Services
import {useResetPassword} from '../services/mutations'

// Icons
import {LockOutlined} from '@ant-design/icons'

const {Title} = Typography

const Box = styled(Card)`
  width: min(400px, 100%);
  box-shadow: ${({theme}) =>
    `0 4px 12px ${theme.isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'}`};
`

const ResetPassword = () => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const {setToken} = useAuth()
  const navigate = useNavigate()
  const {resetToken} = useParams()

  const resetPasswordSchema = z
    .object({
      newPassword: z.string().min(1, t('auth.resetPassword.validation.newPassword.minLength')),
      confirmPassword: z
        .string()
        .min(1, t('auth.resetPassword.validation.confirmPassword.required')),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('auth.resetPassword.validation.confirmPassword.match'),
      path: ['confirmPassword'],
    })

  type resetPasswordFormData = z.infer<typeof resetPasswordSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<resetPasswordFormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  const {mutate: resetPasswordMutation, isPending} = useResetPassword(resetToken || '')

  const onSubmit = (data: resetPasswordFormData) => {
    resetPasswordMutation(data, {
      onSuccess: data => {
        message.success(t('auth.resetPassword.success'))
        setToken(data.token)
        navigate('/todos')
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError
        const status = axiosError.response?.status
        if (status === 401) message.error(t('auth.resetPassword.error.expiredToken'))
        else message.error(t('auth.resetPassword.error.serverError'))
      },
    })
  }

  return (
    <Box>
      <Title level={3} style={{textAlign: 'center', marginBottom: 32}}>
        {t('auth.resetPassword.title')}
      </Title>

      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword?.message}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({field}) => (
              <Input.Password
                prefix={<LockOutlined />}
                autoComplete="new-password"
                placeholder={t('auth.resetPassword.newPassword')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({field}) => (
              <Input.Password
                prefix={<LockOutlined />}
                autoComplete="new-password"
                placeholder={t('auth.resetPassword.confirmPassword')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
          {t('auth.resetPassword.submit')}
        </Button>
      </Form>
    </Box>
  )
}

export default ResetPassword
