import {BrowserRouter, Route, Routes} from 'react-router-dom'
import withLoading from '@/hocs/withLoading.hoc'

// layouts
import {MainLayout} from '@/components/layouts'

// pages
import {Todos} from '@/pages'

const TodosPage = withLoading(Todos)

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TodosPage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
