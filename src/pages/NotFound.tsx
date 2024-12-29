import styled from '@emotion/styled'
import {Result, Button} from 'antd'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'

const Container = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
`

const NotFound = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()

  return (
    <Container>
      <Result
        status="404"
        title={t('notFound.title')}
        subTitle={t('notFound.subTitle')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('notFound.backHome')}
          </Button>
        }
      />
    </Container>
  )
}

export default NotFound
