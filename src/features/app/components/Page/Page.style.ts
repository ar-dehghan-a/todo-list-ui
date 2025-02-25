import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
`

export const Wrapper = styled.div`
  height: 100%;
  padding: 0 50px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`
