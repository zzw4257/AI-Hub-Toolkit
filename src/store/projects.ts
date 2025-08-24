import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Project {
  id: string
  name: string
  type: 'documentation' | 'workflow' | 'testing'
  status: 'completed' | 'running' | 'in-progress' | 'failed'
  createdAt: string
  updatedAt: string
}

interface ProjectsState {
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  removeProject: (id: string) => void
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [
        {
          id: '1',
          name: 'E-commerce API Docs',
          type: 'documentation',
          status: 'completed',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          name: 'Customer Support Bot',
          type: 'workflow',
          status: 'running',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          name: 'Model Performance Test',
          type: 'testing',
          status: 'in-progress',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      addProject: (project) => set((state) => ({
        projects: [...state.projects, {
          ...project,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }]
      })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        )
      })),
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
    }),
    { name: 'projects-storage' }
  )
)