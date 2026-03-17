import { create } from 'zustand'
import { faker } from '@faker-js/faker'
import type { TaskModel } from '#/models/task.model'

const STATUSES: TaskModel['status'][] = [
  'new',
  'inProgress',
  'success',
  'rejected',
]

export function generateFakeTask(): TaskModel {
  return {
    id: faker.string.uuid(),
    name: faker.hacker.phrase(),
    description: faker.lorem.sentence(),
    status: 'new',
  }
}

interface TaskStore {
  tasks: TaskModel[]
  setTasks: (tasks: TaskModel[]) => void
  addTask: (task: TaskModel) => void
  removeTask: (id: string) => void
  changeTaskStatus: (id: string, status: TaskModel['status']) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  changeTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}))

export function getRandomStatus(): TaskModel['status'] {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)]
}
