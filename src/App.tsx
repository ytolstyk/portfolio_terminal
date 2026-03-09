import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTerminalContext } from '@/context/TerminalContext'
import { useAppContext } from '@/context/AppContext'
import { Terminal } from '@/components/Terminal/Terminal'
import { Portfolio } from '@/components/Portfolio/Portfolio'
import { PortfolioProjectPage } from '@/components/Portfolio/PortfolioProjectPage'
import { ProjectPage } from '@/pages/ProjectPage'

function AppShell() {
  const { terminalVisible } = useAppContext()

  return (
    <>
      <Portfolio />
      <div className={`terminal-overlay ${terminalVisible ? 'terminal-overlay--visible' : 'terminal-overlay--hidden'}`}>
        <Terminal />
      </div>
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const { dispatch } = useTerminalContext()

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch({ type: 'SET_PATH', path: '~' })
    }
  }, [location.pathname, dispatch])

  return (
    <Routes>
      <Route path="/" element={<AppShell />} />
      <Route path="/projects/:name" element={<ProjectPage />} />
      <Route path="/project/:name" element={<PortfolioProjectPage />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
