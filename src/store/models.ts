import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Model {
  id: string
  name: string
  provider: string
  apiKey?: string
  status: 'connected' | 'disconnected'
  usage: number
}

interface ModelsState {
  models: Model[]
  addModel: (model: Omit<Model, 'id' | 'usage'>) => void
  updateModel: (id: string, updates: Partial<Model>) => void
  removeModel: (id: string) => void
}

export const useModelsStore = create<ModelsState>()(
  persist(
    (set) => ({
      models: [
        { id: '1', name: 'GPT-4', provider: 'OpenAI', status: 'connected', usage: 1200 },
        { id: '2', name: 'Claude-3', provider: 'Anthropic', status: 'connected', usage: 856 },
        { id: '3', name: 'Gemini Pro', provider: 'Google', status: 'disconnected', usage: 0 },
      ],
      addModel: (model) => set((state) => ({
        models: [...state.models, { ...model, id: Date.now().toString(), usage: 0 }]
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