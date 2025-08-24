import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Model {
  id: string
  name: string
  provider: string
  status: 'connected' | 'disconnected'
  usage: number
}

interface ModelsState {
  models: Model[]
  setModels: (models: Model[]) => void
  addModel: (model: Model) => void
  updateModel: (id: string, updates: Partial<Model>) => void
  removeModel: (id: string) => void
}

export const useModelsStore = create<ModelsState>()(
  persist(
    (set) => ({
      models: [], // Initial state will be empty, fetched from backend
      setModels: (models) => set({ models }),
      addModel: (model) => set((state) => ({
        models: [...state.models, model]
      })),
      updateModel: (id, updates) => set((state) => ({
        models: state.models.map(m => m.id === id ? { ...m, ...updates } : m)
      })),
      removeModel: (id) => set((state) => ({
        models: state.models.filter(m => m.id !== id)
      })),
    }),
    { name: 'models-storage' }
  )
)