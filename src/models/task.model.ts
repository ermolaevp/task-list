export interface TaskModel {
  id: string // uuid
  name: string
  description: string
  status: 'new' | 'inProgress' | 'success' | 'rejected'
}
