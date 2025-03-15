import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'

// Components
import {Button} from 'antd'
import {Container, Form} from './AddTodo.style'

// Services
import {useCreateTodo} from '../../services/mutations'

// Icons
import {PlusOutlined} from '@ant-design/icons'

const AddTodo = ({createAsImportant = false}: {createAsImportant?: boolean}) => {
  const {t} = useTranslation()
  const [title, setTitle] = useState('')

  const {mutate: createTodo, isPending} = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) return

    createTodo(
      {
        title,
        ...(createAsImportant ? {isImportant: true} : {}),
      },
      {
        onSuccess() {
          setTitle('')
        },
      }
    )
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button icon={<PlusOutlined />} htmlType="submit" size="small" />

        <input
          disabled={isPending}
          name="todo"
          autoComplete="false"
          placeholder={t('todos.add.placeholder')}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form>
    </Container>
  )
}

export default AddTodo
