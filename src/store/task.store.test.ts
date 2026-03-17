import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStore, generateFakeTask, getRandomStatus } from './task.store'
import type { TaskModel } from '#/models/task.model'

describe('task store', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
  })

  describe('generateFakeTask', () => {
    it('returns a task with the correct shape', () => {
      const task = generateFakeTask()
      expect(task).toHaveProperty('id')
      expect(task).toHaveProperty('name')
      expect(task).toHaveProperty('description')
      expect(task.status).toBe('new')
      expect(typeof task.id).toBe('string')
      expect(typeof task.name).toBe('string')
      expect(typeof task.description).toBe('string')
    })

    it('generates unique ids', () => {
      const a = generateFakeTask()
      const b = generateFakeTask()
      expect(a.id).not.toBe(b.id)
    })
  })

  describe('getRandomStatus', () => {
    it('returns a valid status', () => {
      const validStatuses: TaskModel['status'][] = [
        'new',
        'inProgress',
        'success',
        'rejected',
      ]
      for (let i = 0; i < 20; i++) {
        expect(validStatuses).toContain(getRandomStatus())
      }
    })
  })

  describe('setTasks', () => {
    it('replaces the task list', () => {
      const tasks = [generateFakeTask(), generateFakeTask()]
      useTaskStore.getState().setTasks(tasks)
      expect(useTaskStore.getState().tasks).toEqual(tasks)
    })
  })

  describe('addTask', () => {
    it('appends a task to the list', () => {
      const task = generateFakeTask()
      useTaskStore.getState().addTask(task)
      expect(useTaskStore.getState().tasks).toHaveLength(1)
      expect(useTaskStore.getState().tasks[0]).toEqual(task)
    })

    it('preserves existing tasks', () => {
      const task1 = generateFakeTask()
      const task2 = generateFakeTask()
      useTaskStore.getState().addTask(task1)
      useTaskStore.getState().addTask(task2)
      expect(useTaskStore.getState().tasks).toHaveLength(2)
    })
  })

  describe('removeTask', () => {
    it('removes a task by id', () => {
      const task1 = generateFakeTask()
      const task2 = generateFakeTask()
      useTaskStore.getState().setTasks([task1, task2])
      useTaskStore.getState().removeTask(task1.id)
      expect(useTaskStore.getState().tasks).toHaveLength(1)
      expect(useTaskStore.getState().tasks[0].id).toBe(task2.id)
    })

    it('does nothing when id not found', () => {
      const task = generateFakeTask()
      useTaskStore.getState().setTasks([task])
      useTaskStore.getState().removeTask('nonexistent')
      expect(useTaskStore.getState().tasks).toHaveLength(1)
    })
  })

  describe('changeTaskStatus', () => {
    it('changes the status of a specific task', () => {
      const task = generateFakeTask()
      useTaskStore.getState().setTasks([task])
      useTaskStore.getState().changeTaskStatus(task.id, 'success')
      expect(useTaskStore.getState().tasks[0].status).toBe('success')
    })

    it('does not change other tasks', () => {
      const task1 = generateFakeTask()
      const task2 = generateFakeTask()
      useTaskStore.getState().setTasks([task1, task2])
      useTaskStore.getState().changeTaskStatus(task1.id, 'rejected')
      expect(useTaskStore.getState().tasks[0].status).toBe('rejected')
      expect(useTaskStore.getState().tasks[1].status).toBe('new')
    })
  })
})
