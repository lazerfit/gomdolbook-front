import {fireEvent, render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import Header from './Header'

describe('Header Component', () => {
  const setup = () => {
    render(<Header />, {wrapper: BrowserRouter})
    const loginButton = screen.getByRole('button', {name: /Log in/})
    const statistics = screen.getByRole('button', {name: /Statistics/i})
    const library = screen.getByRole('button', {name: /Library/i})
    return {
      loginButton,
      statistics,
      library
    }
  }

  it('로그인 버튼을 클릭하면 로그인 모달의 닫기 버튼이 나타난다.', () => {
    const {loginButton} = setup()
    fireEvent.click(loginButton)
    expect(screen.getByRole('button', {name: /Close/})).toBeInTheDocument()
  })

  it('로그인 모달에서 닫기 버튼을 클릭하면 모달이 닫힌다.', () => {
    const {loginButton} = setup()
    fireEvent.click(loginButton)
    const closeButton = screen.getByRole('button', {name: /Close/})
    expect(closeButton).toBeInTheDocument()
    fireEvent.click(closeButton)
    expect(closeButton).not.toBeInTheDocument()
  })

  it('Statistics 버튼을 클릭하면 /statistics 페이지로 전환된다.', () => {
    const {statistics} = setup()
    fireEvent.click(statistics)
    expect(screen.getByText(/statistics/i)).toBeInTheDocument()
  })

  it('Library 버튼을 클릭하면 /library 페이지로 전환된다.', () => {
    const {library} = setup()
    fireEvent.click(library)
    expect(screen.getByText(/library/i)).toBeInTheDocument()
  })
})
