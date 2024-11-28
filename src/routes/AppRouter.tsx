import React from 'react'
import {Home} from '@/pages'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default AppRouter
