import React, {useState} from 'react'

// Components
import {Button} from 'antd'
import {Container, Form} from './AddTodo.style'

// Services
import {useCreateTodo} from '../../services/mutations'

// Icons
import {PlusOutlined} from '@ant-design/icons'

const AddTodo = () => {
  const [title, setTitle] = useState('')

  const {mutate: createTodo, isPending} = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) return

    createTodo(
      {title},
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
          placeholder="Add a new todo..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form>
    </Container>
  )
}

export default AddTodo
