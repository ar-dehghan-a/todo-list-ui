import React from 'react'
import {Typography} from 'antd'
import {useResponsive} from '@/hooks'

// styles
import {Container, Wrapper} from './Page.style'

interface PageProps {
  title: string
  Icon: React.ReactElement
  children: React.ReactNode
}

const Page = ({title, Icon, children}: PageProps) => {
  const {isMobile} = useResponsive()
  const styledIcon = React.cloneElement(Icon, {
    style: {marginInlineEnd: '12px', ...Icon.props.style},
  })

  return (
    <Container>
      <div style={{padding: isMobile ? '0 16px' : '0 50px'}}>
        <Typography.Title level={isMobile ? 3 : 2}>
          {styledIcon}
          {title}
        </Typography.Title>
      </div>

      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

export default Page
