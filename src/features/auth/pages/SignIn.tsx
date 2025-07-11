import {usePushNotifications} from '@/features/notifications'
import {useGlobalMessage} from '@/providers'
import styled from '@emotion/styled'
import {zodResolver} from '@hookform/resolvers/zod'
import {AxiosError} from 'axios'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from 'react-router-dom'
import {z} from 'zod'
import useAuth from '../hooks/useAuth'

// Components
import {Button, Card, Form, Input, Typography} from 'antd'
const {Title} = Typography

// Services
import {useLoginUser} from '../services/mutations'

// Icons
import {LockOutlined, MailOutlined} from '@ant-design/icons'

const Box = styled(Card)`
  width: min(400px, 100%);
  box-shadow: ${({theme}) =>
    `0 4px 12px ${theme.isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'}`};
`

const SignIn = () => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const navigate = useNavigate()
  const {setToken} = useAuth()

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t('auth.login.validation.email.required'))
      .email(t('auth.login.validation.email.invalid')),
    password: z
      .string()
      .min(1, t('auth.login.validation.password.required'))
      .min(8, t('auth.login.validation.password.minLength')),
  })

  type LoginFormData = z.infer<typeof loginSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const {mutate: loginMutation, isPending} = useLoginUser()
  const {subscribe} = usePushNotifications()

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data, {
      onSuccess: data => {
        message.success(t('auth.login.success'))
        setToken(data.token)
        subscribe()
        navigate('/todos')
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError
        const status = axiosError.response?.status
        if (status === 401) message.error(t('auth.login.error.incorrectCredentials'))
        else message.error(t('auth.login.error.serverError'))
      },
    })
  }

  return (
    <Box>
      <Title level={3} style={{textAlign: 'center', marginBottom: 32}}>
        {t('auth.login.title')}
      </Title>

      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <Input
                prefix={<MailOutlined />}
                autoComplete="email"
                placeholder={t('auth.login.email')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            render={({field}) => (
              <Input.Password
                prefix={<LockOutlined />}
                autoComplete="current-password"
                placeholder={t('auth.login.password')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
          {t('auth.login.signIn')}
        </Button>
      </Form>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginTop: 10,
          fontSize: 12,
        }}
      >
        <Link to="/auth/forgot-password">{t('auth.login.forgotPassword')}</Link>
        <Link to="/auth/register">{t('auth.login.signUpLink')}</Link>
      </div>
    </Box>
  )
}

export default SignIn
