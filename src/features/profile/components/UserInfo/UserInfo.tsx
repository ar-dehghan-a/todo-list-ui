import {useAuth} from '@/features/auth'
import {useGlobalMessage} from '@/hooks'
import {convertFileToBase64, type FileType} from '@/utils/fileUtils'
import {zodResolver} from '@hookform/resolvers/zod'
import ImgCrop from 'antd-img-crop'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

// Components
import {Avatar, Button, Card, Dropdown, Form, Input, Spin, Upload} from 'antd'
import {AvatarContainer, FormGrid} from './UserInfo.style'

// Services
import {useUpdateUser, useUploadAvatar} from '../../services/mutations'

// Icons
import {EditOutlined, LoadingOutlined, UserOutlined} from '@ant-design/icons'

// Types
import type {MenuProps, UploadProps} from 'antd'
import type {AxiosError} from 'axios'

const UserInfo = () => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const {currentUser, isLoading: isLoadingUser} = useAuth()
  const [isDeletedAvatar, setIsDeletedAvatar] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const avatar = isDeletedAvatar ? null : imageUrl || currentUser?.photo

  const userInfoSchema = z.object({
    name: z.string().min(2, t('profile.updateUserInfo.validation.nameRequired')),
    surname: z.string().min(2, t('profile.updateUserInfo.validation.surnameRequired')),
    email: z.string().email(t('profile.updateUserInfo.validation.emailInvalid')),
    photo: z.string().nullable().optional(),
  })
  type UserInfoFormData = z.infer<typeof userInfoSchema>

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isDirty},
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    values: {
      name: currentUser?.name || '',
      surname: currentUser?.surname || '',
      email: currentUser?.email || '',
    },
  })

  const {mutateAsync: uploadAvatar, isPending: isUploadingAvatar} = useUploadAvatar()
  const {mutate: updateUser, isPending: isUpdatingUser} = useUpdateUser()

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!')

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) message.error('Image must smaller than 2MB!')

    return isJpgOrPng && isLt2M
  }

  const onSubmit = async (data: UserInfoFormData) => {
    updateUser(data, {
      onSuccess: () => {
        setIsDeletedAvatar(false)
        setImageUrl(null)
        message.success(t('profile.updateUserInfo.updateSuccess'))
      },
      onError: (error: unknown) => {
        const status = (error as AxiosError).response?.status
        if (status === 404) message.error(t('profile.updateUserInfo.error.FileNotFound'))
        if (status === 400) message.error(t('profile.updateUserInfo.error.FileMustImage'))
        else message.error(t('profile.updateUserInfo.error.serverError'))
      },
    })
  }

  const onChange: UploadProps['onChange'] = async info => {
    if (info.file.status === 'done') {
      convertFileToBase64(info.file.originFileObj as FileType, url => {
        setIsDeletedAvatar(false)
        setImageUrl(url)
      })
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ImgCrop
          aspect={1 / 1}
          cropShape="round"
          showGrid
          modalOk={t('actions.crop')}
          modalCancel={t('actions.cancel')}
        >
          <Upload
            listType="text"
            customRequest={async ({file, onSuccess, onError}) => {
              try {
                const response = await uploadAvatar(file as File)
                setValue('photo', response.data.id)
                onSuccess?.(response)
              } catch (error) {
                onError?.(error as Error)
              }
            }}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={onChange}
            accept="image/jpeg, image/png"
          >
            {t('profile.updateUserInfo.uploadPhoto')}
          </Upload>
        </ImgCrop>
      ),
    },
    {
      key: '2',
      label: t('profile.updateUserInfo.removePhoto'),
      onClick: () => {
        setValue('photo', null)
        setIsDeletedAvatar(true)
      },
    },
  ]

  return (
    <Card title={t('profile.updateUserInfo.title')} loading={isLoadingUser}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarContainer>
          <Spin spinning={isUploadingAvatar} indicator={<LoadingOutlined spin />} size="large">
            <Avatar size={160} icon={<UserOutlined />} src={avatar} alt="avatar" />
          </Spin>

          <Dropdown menu={{items}} placement="bottom" trigger={['click']}>
            <Button className="edit-button" icon={<EditOutlined />}>
              {t('actions.edit')}
            </Button>
          </Dropdown>
        </AvatarContainer>

        <FormGrid>
          <Form.Item
            label={t('profile.updateUserInfo.name')}
            help={errors.name?.message}
            validateStatus={errors.name ? 'error' : ''}
          >
            <Controller
              name="name"
              control={control}
              render={({field}) => (
                <Input {...field} placeholder={t('profile.updateUserInfo.name')} />
              )}
            />
          </Form.Item>

          <Form.Item
            label={t('profile.updateUserInfo.surname')}
            help={errors.surname?.message}
            validateStatus={errors.surname ? 'error' : ''}
          >
            <Controller
              name="surname"
              control={control}
              render={({field}) => (
                <Input {...field} placeholder={t('profile.updateUserInfo.surname')} />
              )}
            />
          </Form.Item>
        </FormGrid>

        <Form.Item
          label={t('profile.updateUserInfo.email')}
          help={errors.email?.message}
          validateStatus={errors.email ? 'error' : ''}
        >
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <Input {...field} type="email" placeholder={t('profile.updateUserInfo.email')} />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdatingUser}
          disabled={!isDirty && !isDeletedAvatar && !imageUrl}
        >
          {t('profile.updateUserInfo.update')}
        </Button>
      </form>
    </Card>
  )
}

export default UserInfo
