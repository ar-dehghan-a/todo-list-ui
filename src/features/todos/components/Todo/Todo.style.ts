import styled from '@emotion/styled'
import {Button} from 'antd'

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({theme}) => (theme.isDarkMode ? '#2d2d2d' : '#fff')};
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #c8c8c8;
  }
`

export const Title = styled.p`
  margin-bottom: 0;
  margin-inline-start: 8px;
`

export const StarButton = styled(Button)`
  font-size: 20px;
  padding: 6px;
  margin-inline-start: auto;
`
