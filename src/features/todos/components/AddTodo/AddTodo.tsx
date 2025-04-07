import React from 'react'
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

  const {mutate: createTodo, isPending} = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input: HTMLInputElement | null = e.currentTarget.querySelector('input[name="todo"]')

    if (!input) return

    const title = input.value

    if (!title.trim()) return

    createTodo(
      {
        title,
        ...(createAsImportant ? {isImportant: true} : {}),
      },
      {
        onSuccess() {
          input.value = ''
          setTimeout(() => {
            if (input) input.focus()
          }, 0)
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
          autoComplete="off"
          placeholder={t('todos.add.placeholder')}
        />
      </Form>
    </Container>
  )
}

export default AddTodo
