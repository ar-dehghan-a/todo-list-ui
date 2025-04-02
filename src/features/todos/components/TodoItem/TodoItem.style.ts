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
  text-decoration: ${({isCompleted}) => (isCompleted ? 'line-through' : 'none')};
`

export const StarButton = styled(Button)`
  font-size: 20px;
  padding: 6px;
  margin-inline-start: auto;
`
