import { createFileRoute } from '@tanstack/react-router'
import { useTaskStore } from '#/store/task.store'
import { Badge } from '#/components/ui/badge'
import { useInterval } from 'react-use'
import { useState } from 'react'
import { useRandomActions } from '#/hooks/useRandomActions'

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
})

const statusConfig: Record<string, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  },
  inProgress: {
    label: 'In Progress',
    className:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  },
  success: {
    label: 'Success',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  },
}

function StatisticsPage() {
  const tasks = useTaskStore((s) => s.tasks)

  useRandomActions()

  const total = tasks.length

  const getCountByStatus = () => ({
    new: tasks.filter((t) => t.status === 'new').length,
    inProgress: tasks.filter((t) => t.status === 'inProgress').length,
    success: tasks.filter((t) => t.status === 'success').length,
    rejected: tasks.filter((t) => t.status === 'rejected').length,
  })

  const [countByStatus, setCountByStatus] = useState(() => getCountByStatus())

  useInterval(() => {
    setCountByStatus(() => getCountByStatus())
  }, 2000)

  return (
    <main className="page-wrap px-4 pb-8 pt-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Task Statistics
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="mt-1 text-3xl font-bold">{total}</p>
        </div>

        {(Object.keys(countByStatus) as Array<keyof typeof countByStatus>).map(
          (status) => {
            const config = statusConfig[status]
            return (
              <div
                key={status}
                className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge className={config.className}>{config.label}</Badge>
                </div>
                <p className="mt-1 text-3xl font-bold">
                  {countByStatus[status]}
                </p>
              </div>
            )
          },
        )}
      </div>
    </main>
  )
}
