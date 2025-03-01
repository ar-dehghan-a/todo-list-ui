import React, {useState} from 'react'
import {useCreateTodo} from '../../services'

// Components
import {Container, Form} from './AddTodo.style'
import {Button} from 'antd'

// Icons
import {PlusOutlined} from './AddTodo.style'

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
