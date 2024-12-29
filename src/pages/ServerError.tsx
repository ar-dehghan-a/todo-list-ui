import styled from '@emotion/styled'
import {Result, Button} from 'antd'
import {useTranslation} from 'react-i18next'

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`

const ServerError = ({resetErrorBoundary}: {error: Error; resetErrorBoundary: () => void}) => {
  const {t} = useTranslation()

  return (
    <Container>
      <Result
        status="500"
        title={t('serverError.title')}
        subTitle={t('serverError.subTitle')}
        extra={
          <Button type="primary" onClick={resetErrorBoundary}>
            {t('serverError.tryAgain')}
          </Button>
        }
      />
    </Container>
  )
}

export default ServerError
