import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import TaskCard from '#/components/TaskCard'
import {
  useTaskStore,
  generateFakeTask,
} from '#/store/task.store'
import { useRandomActions } from '#/hooks/useRandomActions'

export const Route = createFileRoute('/')({ component: TaskListPage })

function TaskListPage() {
  const tasks = useTaskStore((s) => s.tasks)
  const setTasks = useTaskStore((s) => s.setTasks)

  useRandomActions()

  useEffect(() => {
    const initial = Array.from({ length: 5 }, () => generateFakeTask())
    setTasks(initial)
  }, [setTasks])

  return (
    <main className="page-wrap px-4 pb-8 pt-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Tasks</h1>
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks yet.</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </main>
  )
}
