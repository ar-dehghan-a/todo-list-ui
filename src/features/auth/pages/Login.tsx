import styled from '@emotion/styled'
import {zodResolver} from '@hookform/resolvers/zod'
import {AxiosError} from 'axios'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'
import {z} from 'zod'
import useAuth from '../hooks/useAuth'

// Components
import {Button, Card, Form, Input, Typography, message} from 'antd'

// Services
import {useLoginUser} from '../services/mutations'

// Icons
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const {Title} = Typography

const Box = styled(Card)`
  width: min(400px, 100%);
  box-shadow: ${({theme}) =>
    `0 4px 12px ${theme.isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'}`};
`

const Login = () => {
  const {t} = useTranslation()
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

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data, {
      onSuccess: data => {
        message.success(t('auth.login.success'))
        setToken(data.token)
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
                prefix={<UserOutlined />}
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
    </Box>
  )
}

export default Login
