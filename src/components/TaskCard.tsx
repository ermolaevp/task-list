import type { TaskModel } from '#/models/task.model'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'

const statusConfig: Record<
  TaskModel['status'],
  { label: string; className: string }
> = {
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

interface TaskCardProps {
  task: TaskModel
}

export default function TaskCard({ task }: TaskCardProps) {
  const config = statusConfig[task.status]

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold">{task.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
      </div>
      <Badge
        data-testid="status-badge"
        className={cn('shrink-0', config.className)}
      >
        {config.label}
      </Badge>
    </div>
  )
}
