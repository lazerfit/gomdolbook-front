import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalStyle from './styles/Global'
import Main from './pages/Main'
import Library from './pages/Library'
import Statistics from './pages/Statistics'

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/library" element={<Library />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  )
}

export default App
