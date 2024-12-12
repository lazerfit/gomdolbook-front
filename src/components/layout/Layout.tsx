import React, {useState} from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import {useOutlet} from 'react-router-dom'

type Props = {}

const Layout = (props: Props) => {
  const outlet = useOutlet()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const onLoggedIn = () => {
    setIsLoggedIn(true)
  }

  const onLoggedOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLoggedIn={onLoggedIn} onLoggedOut={onLoggedOut} />
      <main>{outlet}</main>
      <Footer />
    </>
  )
}

export default Layout
