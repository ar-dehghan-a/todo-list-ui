import {Suspense} from 'react'
import {Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import type {ComponentType} from 'react'

const withLoading = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={<Spin size="large" indicator={<LoadingOutlined />} fullscreen />}>
      <Component {...props} />
    </Suspense>
  )

  return WrappedComponent
}

export default withLoading
