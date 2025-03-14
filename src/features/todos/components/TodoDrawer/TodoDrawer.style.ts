import styled from '@emotion/styled'
import {Drawer as AntDrawer} from 'antd'

export const Drawer = styled(AntDrawer)`
  background: var(--ant-layout-body-bg) !important;

  .ant-drawer-body {
    padding: 0px 18px;
    margin-top: 12px;
  }

  .ant-drawer-footer {
    display: flex;
    align-items: center;

    .ant-drawer-footer-text {
      font-size: 0.75rem;
      flex: 1;
      text-align: center;
      color: var(--ant-color-text-tertiary);
    }
  }
`

export const TitleWrapper = styled.div`
  z-index: 10;
  position: sticky;
  top: 0;
  background: var(--todo-item-body-bg);
  border-radius: 6px 6px 0 0;

  display: flex;
  align-items: center;
  padding: 16px;

  .title {
    position: relative;
    border-radius: 6px;
    flex: 1 1 0px;

    .content {
      width: 100%;
      overflow: visible;
      text-align: ${({theme}) => (theme.dir === 'rtl' ? 'right' : 'left')};
      box-sizing: border-box;
      padding: 0px 16px 0px 16px;

      &.edit {
        padding: 0%;
      }

      span {
        display: block;
        font-weight: 500;
        font-size: 1.125rem;
      }

      .edit {
        width: 100%;
        word-wrap: break-word;
        word-break: break-word;
      }

      &-textarea {
        width: 100%;
        border: none;
        background: transparent;
        padding: 0;
        display: block;
        font-weight: 500;
        font-size: 1.125rem;
        border-radius: 0;
        box-shadow: none;
        line-height: 1.15;

        &:focus {
          outline: none;
        }
      }
    }
  }
`
