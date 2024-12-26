import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import withLoading from '@/hocs/withLoading.hoc'

// layouts
import {MainLayout} from '@/components/layouts'

// pages
import {Todos, Important} from '@/pages'

const TodosPage = withLoading(Todos)
const ImportantPage = withLoading(Important)

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/todos" />} />
          <Route path="todos" element={<TodosPage />} />
          <Route path="important" element={<ImportantPage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
