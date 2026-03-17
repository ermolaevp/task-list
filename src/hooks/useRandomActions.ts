import { generateFakeTask, getRandomStatus, useTaskStore } from "#/store/task.store"
import { useInterval } from "react-use"

export const useRandomActions = () => {

  const tasks = useTaskStore((s) => s.tasks)
  
  const addTask = useTaskStore((s) => s.addTask)
  const removeTask = useTaskStore((s) => s.removeTask)
  const changeTaskStatus = useTaskStore((s) => s.changeTaskStatus)

  return useInterval(() => {
    const actions = ['add', 'remove', 'changeStatus'] as const
    const action = actions[Math.floor(Math.random() * actions.length)]

    switch (action) {
      case 'add': {
        if (tasks.length < 100) {
          addTask(generateFakeTask())
        }
        break
      }
      case 'remove': {
        if (tasks.length > 0) {
          const index = Math.floor(Math.random() * tasks.length)
          removeTask(tasks[index].id)
        }
        break
      }
      case 'changeStatus': {
        if (tasks.length > 0) {
          const index = Math.floor(Math.random() * tasks.length)
          changeTaskStatus(tasks[index].id, getRandomStatus())
        }
        break
      }
    }
  }, 2000)
} 