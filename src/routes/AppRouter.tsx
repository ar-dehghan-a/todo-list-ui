import {lazy} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import withLoading from '@/hocs/withLoading.hoc'
import RequireAuth from './RequireAuth'

// layouts
import {MainLayout} from '@/features/app'

// pages
import {Todos as TodosPage} from '@/features/todos'
const NotFound = lazy(() => import('@/features/app/pages/NotFound'))
const Important = lazy(() => import('@/features/todos/pages/Important'))
const Profile = lazy(() => import('@/features/profile/pages/Profile'))
const AuthLayout = lazy(() => import('@/features/auth/layouts/AuthLayout'))
const SignIn = lazy(() => import('@/features/auth/pages/SignIn'))
const SignUp = lazy(() => import('@/features/auth/pages/SignUp'))
const ForgotPassword = lazy(() => import('@/features/auth/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/features/auth/pages/ResetPassword'))
const Logout = lazy(() => import('@/routes/Logout'))

const NotFoundPage = withLoading(NotFound)
const ImportantPage = withLoading(Important)
const ProfilePage = withLoading(Profile)
const AuthLayoutPage = withLoading(AuthLayout)
const SignInPage = withLoading(SignIn)
const SignUpPage = withLoading(SignUp)
const ForgotPasswordPage = withLoading(ForgotPassword)
const ResetPasswordPage = withLoading(ResetPassword)
const LogoutPage = withLoading(Logout)

const Test = lazy(() => import('@/features/todos/pages/Test'))
const TestPage = withLoading(Test)

const AppRouter = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={protectedLayout}>
          <Route index element={<Navigate to="/todos" replace />} />
          <Route path="todos" element={<TodosPage />}>
            <Route path=":id" element={<TodosPage />} />
          </Route>
          <Route path="important" element={<ImportantPage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="auth" element={<AuthLayoutPage />}>
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:resetToken" element={<ResetPasswordPage />} />
        </Route>
        <Route path="logout" element={<LogoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
