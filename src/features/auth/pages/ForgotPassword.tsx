import styled from '@emotion/styled'
import {AxiosError} from 'axios'
import {Link} from 'react-router-dom'
import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

// Components
import {Button, Card, Form, Input, Typography, message, notification as AntNotification} from 'antd'

// Services
import {useForgotPassword} from '../services/mutations'

// Icons
import {MailOutlined} from '@ant-design/icons'

const {Title} = Typography

const Box = styled(Card)`
  width: min(400px, 100%);
  box-shadow: ${({theme}) =>
    `0 4px 12px ${theme.isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'}`};
`

const ForgotPassword = () => {
  const {t} = useTranslation()
  const [notification, contextHolder] = AntNotification.useNotification()

  const forgotPasswordSchema = z.object({
    email: z
      .string()
      .min(1, t('auth.forgotPassword.validation.email.required'))
      .email(t('auth.forgotPassword.validation.email.invalid')),
  })

  type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const {mutate: forgotPasswordMutation, isPending, isSuccess} = useForgotPassword()

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation(data.email, {
      onSuccess: () => {
        notification.success({
          message: t('auth.forgotPassword.success'),
          description: t('auth.forgotPassword.successDescription'),
        })
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError
        const status = axiosError.response?.status
        if (status === 502) message.error(t('auth.forgotPassword.error.failedEmail'))
        else message.error(t('auth.forgotPassword.error.serverError'))
      },
    })
  }

  return (
    <Box>
      <Title level={3} style={{textAlign: 'center', marginBottom: 32}}>
        {t('auth.forgotPassword.title')}
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
                placeholder={t('auth.forgotPassword.email')}
                size="large"
                disabled={isSuccess}
                {...field}
              />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isSuccess}
          loading={isPending}
          size="large"
          block
        >
          {t('auth.forgotPassword.send')}
        </Button>
      </Form>

      <Link to="/auth/login" style={{display: 'inline-block', marginTop: 10, fontSize: 12}}>
        {t('auth.forgotPassword.backToLogin')}
      </Link>

      {contextHolder}
    </Box>
  )
}

export default ForgotPassword
