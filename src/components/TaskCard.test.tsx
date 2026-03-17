import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskCard from './TaskCard'
import type { TaskModel } from '#/models/task.model'

describe('TaskCard', () => {
  const baseTask: TaskModel = {
    id: '1',
    name: 'Test Task',
    description: 'A test description',
    status: 'new',
  }

  it('renders the task name in bold', () => {
    render(<TaskCard task={baseTask} />)
    const name = screen.getByText('Test Task')
    expect(name).toBeDefined()
    expect(name.tagName).toBe('H3')
  })

  it('renders the task description', () => {
    render(<TaskCard task={baseTask} />)
    expect(screen.getByText('A test description')).toBeDefined()
  })

  it('renders the status badge with correct text', () => {
    render(<TaskCard task={baseTask} />)
    expect(screen.getByText('New')).toBeDefined()
  })

  it('renders correct badge text for each status', () => {
    const statuses: Array<{ status: TaskModel['status']; label: string }> = [
      { status: 'new', label: 'New' },
      { status: 'inProgress', label: 'In Progress' },
      { status: 'success', label: 'Success' },
      { status: 'rejected', label: 'Rejected' },
    ]

    for (const { status, label } of statuses) {
      const { unmount } = render(<TaskCard task={{ ...baseTask, status }} />)
      expect(screen.getByText(label)).toBeDefined()
      unmount()
    }
  })

  it('applies correct color classes for each status', () => {
    const statuses: Array<{
      status: TaskModel['status']
      expectedClass: string
    }> = [
      { status: 'new', expectedClass: 'bg-blue-100' },
      { status: 'inProgress', expectedClass: 'bg-yellow-100' },
      { status: 'success', expectedClass: 'bg-green-100' },
      { status: 'rejected', expectedClass: 'bg-red-100' },
    ]

    for (const { status, expectedClass } of statuses) {
      const { unmount } = render(<TaskCard task={{ ...baseTask, status }} />)
      const badge = screen.getByTestId('status-badge')
      expect(badge.className).toContain(expectedClass)
      unmount()
    }
  })
})
