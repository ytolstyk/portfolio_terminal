import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTerminalContext } from '@/context/TerminalContext'
import { HomePage } from '@/pages/HomePage'
import { ProjectPage } from '@/pages/ProjectPage'

function AppRoutes() {
  const location = useLocation()
  const { dispatch } = useTerminalContext()

  // Sync browser back/forward navigation to currentPath
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch({ type: 'SET_PATH', path: '~' })
    }
  }, [location.pathname, dispatch])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:name" element={<ProjectPage />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
