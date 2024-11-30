import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ProfileFromPage from './Pages/ProfileFormPage'
import { Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import ProfilePage from './Pages/ProfilePage'
import NotFoundPage from './Pages/NotFoundPage'

function App() {

  return (
    <>
      <Suspense fallback={<div> <CircularProgress /></div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile-form' element={<ProfileFromPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App
