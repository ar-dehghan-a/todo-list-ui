import styled from '@emotion/styled'
import {Menu as AntMenu, Input} from 'antd'
const {Search: AntSearch} = Input

interface SearchProps {
  collapsed?: boolean
}

export const Menu = styled(AntMenu)`
  margin-top: 45px;
  border-inline-end: none !important;
  background-color: transparent;
`

export const Search = styled(AntSearch, {
  shouldForwardProp: prop => prop !== 'collapsed',
})<SearchProps>`
  margin: 40px 24px 18px;
  width: auto;
  visibility: ${({collapsed}) => (collapsed ? 'hidden' : 'visible')};
  opacity: ${({collapsed}) => (collapsed ? 0 : 1)};
  height: ${({collapsed}) => (collapsed ? 0 : '32px')};
  transition: all 0.2s;
`
