import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTerminalContext } from '@/context/TerminalContext'
import { ProjectDetail } from '@/components/ProjectDetail/ProjectDetail'
import { getProject } from '@/data/projects'

export function ProjectPage() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const { dispatch } = useTerminalContext()

  useEffect(() => {
    if (!name) {
      navigate('/')
      return
    }
    const project = getProject(name)
    if (project) {
      dispatch({ type: 'SET_PATH', path: `~/projects/${name}` })
    }
  }, [name, dispatch, navigate])

  if (!name) return null

  return <ProjectDetail name={name} />
}
