import React, {useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'

// Components
import {Button, Flex} from 'antd'
import {Container, DatePicker, Form} from './AddTodo.style'

// Services
import {useCreateTodo} from '../../services/mutations'

// Icons
import {PlusOutlined} from '@ant-design/icons'

const AddTodo = ({createAsImportant = false}: {createAsImportant?: boolean}) => {
  const {t} = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [date, setDate] = useState<Date | null>(null)

  const {mutate: createTodo, isPending} = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputRef.current) return

    const title = inputRef.current.value

    if (!title.trim()) return

    createTodo(
      {
        title,
        ...(createAsImportant ? {isImportant: true} : {}),
        ...(date ? {dueDate: new Date(date).toISOString()} : {}),
      },
      {
        onSuccess() {
          if (inputRef.current) inputRef.current.value = ''
          setDate(null)
          setTimeout(() => {
            if (inputRef.current) inputRef.current.focus()
          }, 0)
        },
      }
    )
  }

  const handleDateChange = (date: unknown) => {
    setDate(date as Date)
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button icon={<PlusOutlined />} htmlType="submit" size="small" />

        <input
          ref={inputRef}
          disabled={isPending}
          name="todo"
          autoComplete="off"
          placeholder={t('todos.add.placeholder')}
        />

        <DatePicker
          allowClear={false}
          variant="borderless"
          value={date}
          onChange={handleDateChange}
          renderExtraFooter={() => (
            <Flex align="center" justify="center" style={{padding: '3px 0'}}>
              <Button color="blue" variant="link" onClick={() => setDate(null)}>
                {t('actions.clear')}
              </Button>
            </Flex>
          )}
        />
      </Form>
    </Container>
  )
}

export default AddTodo
