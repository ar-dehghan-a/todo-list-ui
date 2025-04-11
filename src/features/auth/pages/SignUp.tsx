import {useGlobalMessage} from '@/hooks'
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

// Services

// Icons
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons'
import {useRegisterUser} from '../services/mutations'

const {Title} = Typography

const Box = styled(Card)`
  width: min(400px, 100%);
  box-shadow: ${({theme}) =>
    `0 4px 12px ${theme.isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'}`};
`

const SignUp = () => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const navigate = useNavigate()
  const {setToken} = useAuth()

  const registerSchema = z
    .object({
      name: z.string().min(1, t('auth.register.validation.name.required')),
      surname: z.string().min(1, t('auth.register.validation.surname.required')),
      email: z
        .string()
        .min(1, t('auth.register.validation.email.required'))
        .email(t('auth.register.validation.email.invalid')),
      password: z
        .string()
        .min(1, t('auth.register.validation.password.required'))
        .min(8, t('auth.register.validation.password.minLength')),
      confirmPassword: z.string().min(1, t('auth.register.validation.confirmPassword.required')),
    })
    .refine(data => data.confirmPassword === data.password, {
      message: t('auth.register.validation.confirmPassword.match'),
      path: ['confirmPassword'],
    })

  type RegisterFormData = z.infer<typeof registerSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  })

  const {mutate: registerMutation, isPending} = useRegisterUser()

  const onSubmit = (data: RegisterFormData) => {
    registerMutation(data, {
      onSuccess: data => {
        message.success(t('auth.register.success'))
        setToken(data.token)
        navigate('/todos')
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError
        const status = axiosError.response?.status
        if (status === 400) message.error(t('auth.register.error.emailExists'))
        else message.error(t('auth.register.error.serverError'))
      },
    })
  }

  return (
    <Box>
      <Title level={3} style={{textAlign: 'center', marginBottom: 32}}>
        {t('auth.register.title')}
      </Title>

      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            render={({field}) => (
              <Input
                prefix={<UserOutlined />}
                autoComplete="given-name"
                placeholder={t('auth.register.name')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.surname ? 'error' : ''} help={errors.surname?.message}>
          <Controller
            name="surname"
            control={control}
            render={({field}) => (
              <Input
                prefix={<UserOutlined />}
                autoComplete="family-name"
                placeholder={t('auth.register.surname')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <Input
                prefix={<MailOutlined />}
                autoComplete="email"
                placeholder={t('auth.register.email')}
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
                autoComplete="new-password"
                placeholder={t('auth.register.password')}
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
                placeholder={t('auth.register.confirmPassword')}
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
          {t('auth.register.signUp')}
        </Button>
      </Form>

      <Link to="/auth/login" style={{display: 'inline-block', marginTop: 10, fontSize: 12}}>
        {t('auth.register.alreadyHaveAccount')}
      </Link>
    </Box>
  )
}

export default SignUp
