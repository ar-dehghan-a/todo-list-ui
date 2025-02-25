import React from 'react'
import {Typography} from 'antd'

// styles
import {Container, Wrapper} from './Page.style'

interface PageProps {
  title: string
  Icon: React.ReactElement
  children: React.ReactNode
}

const Page = ({title, Icon, children}: PageProps) => {
  const styledIcon = React.cloneElement(Icon, {
    style: {marginInlineEnd: '12px', ...Icon.props.style},
  })

  return (
    <Container>
      <div style={{padding: '0 50px'}}>
        <Typography.Title level={2}>
          {styledIcon}
          {title}
        </Typography.Title>
      </div>

      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

export default Page
