import styled from '@emotion/styled'
import UserInfo from '../components/UserInfo'
import UserPassword from '../components/UserPassword'

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

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

  & > * {
    width: min(900px, 95%);
    margin: 0 auto;
  }
`

const Profile = () => {
  return (
    <Container>
      <UserInfo />
      <UserPassword />
    </Container>
  )
}

export default Profile
