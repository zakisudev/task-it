// common interfaces for the app

export interface TaskData {
  _id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export interface TaskCardProps {
  task: TaskData;
}

export interface CreateModalProps {
  setCreateModal: (value: boolean) => void;
}

export interface EditTaskProps {
  task: TaskData | null;
  setEditModal: (value: boolean) => void;
}
