import styled from '@emotion/styled'
import {Button} from 'antd'

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--todo-item-body-bg);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);

  &:hover {
    border: 1px solid #c8c8c8;
  }
`

export const Title = styled.p<{isCompleted: boolean}>`
  margin-bottom: 0;
  margin-inline-start: 8px;
  margin-inline-end: auto;
  text-decoration: ${({isCompleted}) => (isCompleted ? 'line-through' : 'none')};
`

export const StarButton = styled(Button)`
  font-size: 20px;
  padding: 6px;
`

export const DueDateWrapper = styled.span<{redColor: boolean}>`
  margin-inline: 4px;
  flex-shrink: 0;
  color: ${({redColor}) => (redColor ? 'var(--ant-color-error-text)' : 'inherit')};

  .ant-typography {
    color: ${({redColor}) =>
      redColor ? 'var(--ant-color-error-text)' : 'var(--ant-color-text-description)'};
    font-size: 10px;
  }
`
