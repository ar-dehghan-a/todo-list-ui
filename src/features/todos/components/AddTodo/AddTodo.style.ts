import styled from '@emotion/styled'
import {PlusOutlined as AntPlusOutlined} from '@ant-design/icons'

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 4px;
  z-index: 10;
  padding: 8px 50px;
  background-color: var(--ant-layout-body-bg);
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  background-color: var(--todo-item-body-bg);
  border-radius: 6px;
  transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);

  button {
    background-color: transparent;
    padding: 0;
    border: none;
    outline: none;
    font-size: 18px;
    box-shadow: none;
  }

  input {
    flex: 1;
    border: none;
    background-color: transparent;
    line-height: 1.25;
    outline: none;
    padding: 14px 0 14px 8px;
  }
`

export const PlusOutlined = styled(AntPlusOutlined, {
  shouldForwardProp: prop => prop !== 'isFocused',
})<{isFocused?: boolean}>`
  rotate: ${({isFocused}) => (isFocused ? '45deg' : '0deg')};
  transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);
`
