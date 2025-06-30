import styled from '@emotion/styled'

export const AvatarContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 32px;

  .edit-button {
    position: absolute;
    z-index: 10;
    bottom: 10%;
    left: 0;
    padding: 12px;
  }

  .ant-spin {
    /* border-radius: 50%; */
  }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    gap: 0;
    grid-template-columns: 1fr;
  }
`
