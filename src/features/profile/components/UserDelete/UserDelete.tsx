import {useGlobalMessage} from '@/hooks'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'

// Components
import {Button, Card, Modal} from 'antd'

// Services
import {useDeleteUser} from '../../services/mutations'

// Types
import type {AxiosError} from 'axios'

const UserDelete = () => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {mutate: deleteUser, isPending} = useDeleteUser()

  const handleDelete = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        message.success(t('profile.deleteUser.success'))
        navigate('/logout')
      },
      onError: (error: Error) => {
        const status = (error as AxiosError).response?.status
        if (status === 404) message.error(t('profile.deleteUser.error.userNotFound'))
        else message.error(t('profile.deleteUser.error.serverError'))
      },
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Card title={t('profile.deleteUser.title')}>
      <p>{t('profile.deleteUser.description')}</p>
      <Button type="primary" danger onClick={handleDelete} loading={isPending}>
        {t('profile.deleteUser.deleteButton')}
      </Button>

      <Modal
        title={t('profile.deleteUser.confirmTitle')}
        okText={t('actions.delete')}
        cancelText={t('actions.cancel')}
        okType="danger"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {t('profile.deleteUser.confirmContent')}
      </Modal>
    </Card>
  )
}

export default UserDelete
