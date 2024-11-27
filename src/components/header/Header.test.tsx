import {fireEvent, render} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Header from './Header'

describe('Header Component', () => {
  const setup = () => {
    const screen = render(<Header />, {wrapper: BrowserRouter})
    const loginButton = screen.getByText('/Log in/i') as HTMLButtonElement
    return {
      loginButton,
      screen
    }
  }

  it('로그인 버튼을 클릭하면 로그인 모달이 열린다.', () => {
    const {loginButton, screen} = setup()
    fireEvent.click(loginButton)
    expect(screen.getByText('/LoginModal/i')).toBeInTheDocument()
  })
})
