import {Spin} from 'antd'
import {Suspense} from 'react'
import type {ComponentType} from 'react'

const withLoading = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={<Spin size="large" fullscreen />}>
      <Component {...props} />
    </Suspense>
  )

  return WrappedComponent
}

export default withLoading
