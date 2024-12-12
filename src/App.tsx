import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalStyle from './styles/Global'
import Main from './pages/Main'
import Library from './pages/Library'
import Statistics from './pages/Statistics'
import Layout from './components/layout/Layout'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/library" element={<Library />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
