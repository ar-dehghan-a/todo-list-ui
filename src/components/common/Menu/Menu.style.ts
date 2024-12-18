import styled from '@emotion/styled'
import {Flex, Typography} from 'antd'

import type {FlexProps} from 'antd'

interface HeaderProps extends FlexProps {
  collapsed?: boolean
}

export const Header = styled(Flex, {
  shouldForwardProp: prop => prop !== 'collapsed',
})<HeaderProps>`
  margin: 30px 18px 16px;
`

export const Title = styled(Typography.Title)`
  color: #0b3673 !important;
  margin: 0 0 0 16px !important;
  white-space: nowrap;
  overflow: hidden;
  transition: all var(--ant-motion-duration-slow) var(--ant-motion-ease-in-out);
`
