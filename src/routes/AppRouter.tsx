import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import withLoading from '@/hocs/withLoading.hoc'

// layouts
import {MainLayout} from '@/features/app'

// pages
import {NotFound} from '@/features/app'
import {Important, Todos} from '@/features/todos'

const TodosPage = withLoading(Todos)
const ImportantPage = withLoading(Important)

const NotFoundPage = withLoading(NotFound)

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/todos" />} />
          <Route path="todos" element={<TodosPage />} />
          <Route path="important" element={<ImportantPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
