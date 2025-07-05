import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {Button as AntButton, Layout as AntLayout} from 'antd'

export const Layout = styled(AntLayout)`
  width: 100%;
  height: 100dvh;
  padding: ${({theme}) => (theme.dir === 'ltr' ? '8px 4px 8px 8px' : '8px 8px 8px 4px')};
  gap: 16px;
`

export const Sider = styled(AntLayout.Sider)`
  border-radius: 8px;
  padding: 10px 0;
  transition: all var(--ant-motion-duration-slow) var(--ant-motion-ease-in-out);

  &.sidebar-sider-mobile {
    position: fixed;
    z-index: 999;
    height: calc(100% - 16px);
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

export const Header = styled(AntLayout.Header)`
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: transparent;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 0;
    --ant-layout-header-padding: 0 16px;
  }
`

export const Content = styled(AntLayout.Content)`
  padding-bottom: 16px;
  height: 100%;
`

export const ToggleButton = styled(AntButton)`
  position: absolute;
  top: 14px;
  z-index: 10;
  ${({theme}) => css`
    ${theme.dir === 'rtl' ? 'left: -12px;' : 'right: -12px;'}
  `}

  &.sidebar-toggle-mobile {
    transform: translateX(5px);
  }
`

export const UserInfo = styled.div<{collapsed: boolean}>`
  display: flex;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
  margin: 0 10px;
  overflow: hidden;
  cursor: pointer;

  .user-info-avatar {
    margin-inline: ${({collapsed}) => (collapsed ? '5px 15px' : '0 10px')};
    flex-shrink: 0;
    transition: all var(--ant-motion-duration-slow) var(--ant-motion-ease-in-out);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .user-info-name,
    .user-info-email {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .user-info-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--ant-color-text);
    }

    .user-info-email {
      font-size: 12px;
      color: var(--ant-color-text-tertiary);
    }
  }
`
