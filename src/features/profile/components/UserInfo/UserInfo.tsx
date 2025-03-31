import {useAuth} from '@/features/auth'
import {convertFileToBase64, type FileType} from '@/utils/fileUtils'
import {zodResolver} from '@hookform/resolvers/zod'
import ImgCrop from 'antd-img-crop'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'

// Components
import {Avatar, Button, Card, Dropdown, Form, Input, Spin, Upload, message} from 'antd'
import {AvatarContainer, FormGrid} from './UserInfo.style'

// Services
import {uploadAvatar} from '../../services/api'

// Icons
import {EditOutlined, LoadingOutlined, UserOutlined} from '@ant-design/icons'

// Types
import type {MenuProps, UploadProps} from 'antd'

const userInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  surname: z.string().min(2, 'Surname must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  photo: z.string().nullable().optional(),
})
type UserInfoFormData = z.infer<typeof userInfoSchema>

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!')

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) message.error('Image must smaller than 2MB!')

  return isJpgOrPng && isLt2M
}

const UserInfo = () => {
  const {currentUser, isLoading: isLoadingUser} = useAuth()
  const [loading, setLoading] = useState(false)
  const [isDeletedAvatar, setIsDeletedAvatar] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const avatar = isDeletedAvatar ? null : imageUrl || currentUser?.photo

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    values: {
      name: currentUser?.name || '',
      surname: currentUser?.surname || '',
      email: currentUser?.email || '',
    },
  })

  const onSubmit = async (data: UserInfoFormData) => {
    try {
      // TODO: Implement profile update
      console.log(data)
      message.success('Profile updated successfully')
    } catch (error) {
      message.error('Failed to update profile')
    }
  }

  const onChange: UploadProps['onChange'] = async info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      convertFileToBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setIsDeletedAvatar(false)
        setImageUrl(url)
      })
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ImgCrop aspect={1 / 1} cropShape="round">
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
            Upload a photo
          </Upload>
        </ImgCrop>
      ),
    },
    {
      key: '2',
      label: 'Remove photo',
      onClick: () => {
        setValue('photo', null)
        setIsDeletedAvatar(true)
      },
    },
  ]

  return (
    <Card title="Profile Info" loading={isLoadingUser}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarContainer>
          <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large">
            <Avatar size={160} icon={<UserOutlined />} src={avatar} alt="avatar" />
          </Spin>

          <Dropdown menu={{items}} placement="bottom" trigger={['click']}>
            <Button className="edit-button" icon={<EditOutlined />}>
              Edit
            </Button>
          </Dropdown>
        </AvatarContainer>

        <FormGrid>
          <Form.Item
            label="Name"
            help={errors.name?.message}
            validateStatus={errors.name ? 'error' : ''}
          >
            <Controller
              name="name"
              control={control}
              render={({field}) => <Input {...field} placeholder="Name" />}
            />
          </Form.Item>

          <Form.Item
            label="Surname"
            help={errors.surname?.message}
            validateStatus={errors.surname ? 'error' : ''}
          >
            <Controller
              name="surname"
              control={control}
              render={({field}) => <Input {...field} placeholder="Surname" />}
            />
          </Form.Item>
        </FormGrid>

        <Form.Item
          label="Email"
          help={errors.email?.message}
          validateStatus={errors.email ? 'error' : ''}
        >
          <Controller
            name="email"
            control={control}
            render={({field}) => <Input {...field} type="email" placeholder="Email" />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Update Profile
        </Button>
      </form>
    </Card>
  )
}

export default UserInfo
