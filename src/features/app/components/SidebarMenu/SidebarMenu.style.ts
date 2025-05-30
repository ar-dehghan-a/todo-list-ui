import styled from '@emotion/styled'
import {Menu as AntMenu, Input} from 'antd'
const {Search: AntSearch} = Input

interface SearchProps {
  collapsed?: boolean
}

export const Menu = styled(AntMenu)`
  border-inline-end: none !important;
  background-color: transparent;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
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
