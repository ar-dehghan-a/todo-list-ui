import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '@/store'
import {closeDrawer} from '../../store/drawerSlice'
import {useLanguage} from '@/features/app'

// Components
import {Button, Checkbox, Drawer, Form, Input, message, Popconfirm} from 'antd'

// Form & Validation
import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'

// Services
import {useTodoById} from '../../services/queries'
import {
  useUpdateTodo,
  useToggleCompletedTodo,
  useToggleImportantTodo,
  useDeleteTodo,
} from '../../services/mutations'

// Icons
import {DeleteOutlined} from '@ant-design/icons'

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  note: z.string().optional(),
})

type TodoFormValues = z.infer<typeof todoSchema>

const TodoDrawer = () => {
  const {t} = useTranslation()
  const {isRTL} = useLanguage()
  const dispatch = useAppDispatch()
  const {isOpen, selectedTodoId} = useAppSelector(state => state.drawer)
  const {data: todo} = useTodoById(selectedTodoId || 0)
  const {mutate: updateTodo} = useUpdateTodo(selectedTodoId || 0)
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()
  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: deleteTodo, isPending: isDeleting} = useDeleteTodo()
  const [messageApi, contextHolder] = message.useMessage()

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    values: {
      title: todo?.title || '',
      note: todo?.note || '',
    },
  })

  const onSubmit = (values: TodoFormValues) => updateTodo(values)
  const onClose = () => dispatch(closeDrawer())

  const handleOpenConfirm = () => setOpenDeleteConfirm(true)
  const handleCancelConfirm = () => setOpenDeleteConfirm(false)

  const onDelete = () =>
    deleteTodo(selectedTodoId || 0, {
      onSuccess: () => {
        handleCancelConfirm()
        onClose()
        messageApi.open({
          type: 'success',
          content: t('todos.edit.deleteTodoSuccess'),
        })
      },
    })

  return (
    <Drawer
      title={t('todos.edit.editTodo')}
      placement={isRTL ? 'left' : 'right'}
      onClose={onClose}
      open={isOpen}
    >
      <Form onBlur={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item
          label={t('todos.edit.title')}
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message}
        >
          <Controller name="title" control={control} render={({field}) => <Input {...field} />} />
        </Form.Item>

        <Form.Item
          label={t('todos.edit.note')}
          validateStatus={errors.note ? 'error' : ''}
          help={errors.note?.message}
        >
          <Controller name="note" control={control} render={({field}) => <Input.TextArea {...field} />} />
        </Form.Item>
      </Form>

      <Checkbox checked={todo?.isCompleted} onClick={() => toggleCompletedTodo(selectedTodoId || 0)}>
        {t('todos.edit.completed')}
      </Checkbox>

      <Checkbox checked={todo?.isImportant} onClick={() => toggleImportantTodo(selectedTodoId || 0)}>
        {t('todos.edit.important')}
      </Checkbox>

      <Popconfirm
        title={t('todos.edit.deleteTodoConfirmationTitle')}
        description={t('todos.edit.deleteTodoConfirmationDescription')}
        open={openDeleteConfirm}
        onConfirm={onDelete}
        okButtonProps={{loading: isDeleting}}
        onCancel={handleCancelConfirm}
        okText={t('todos.edit.deleteTodo')}
        cancelText={t('todos.edit.cancel')}
      >
        <Button danger onClick={handleOpenConfirm} icon={<DeleteOutlined />}>
          {t('todos.edit.deleteTodo')}
        </Button>
      </Popconfirm>

      {contextHolder}
    </Drawer>
  )
}

export default TodoDrawer
