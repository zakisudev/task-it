import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import { TaskCardProps, TaskData } from '../saga/interfaces';
import EditTaskModal from './EditTaskModal';
import { useSelector } from 'react-redux';

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [activeTask, setActiveTask] = useState<String | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);
  const { loading } = useSelector((state: any) => state.loading);

  const handleActive = (task: TaskData) => {
    setActiveTask((prev) => (prev === task._id ? null : task._id));
  };

  const handleDelete = (taskId: string) => {
    setDeleteModal(true);
    setDeleteTaskId(taskId);
  };

  const handleEdit = (task: TaskData) => {
    setEditModal(true);
    setEditingTask(task);
  };

  return (
    <>
      {editModal && (
        <EditTaskModal task={editingTask} setEditModal={setEditModal} />
      )}

      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteTaskId={deleteTaskId}
        />
      )}

      <div
        key={task._id}
        onClick={() => handleActive(task)}
        className={`flex flex-col gap-1 p-2 justify-center cursor-pointer ${
          task.priority === 'low'
            ? 'bg-green-300'
            : task.priority === 'medium'
            ? 'bg-yellow-300'
            : 'bg-red-300'
        } rounded`}
      >
        <div className="flex gap-3 justify-between">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <div className="flex gap-2 text-xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(task);
              }}
              className="p-1 bg-blue-400 rounded-xl text-center hover:bg-blue-500 transition-all duration-200"
            >
              <FaRegEdit />
            </button>
            <button
              disabled={loading}
              onClick={() => handleDelete(task._id)}
              className="p-1 bg-red-400 rounded-xl text-center hover:bg-red-500 transition-all duration-200"
            >
              {loading ? 'Deleting' : <FaRegTrashAlt />}
            </button>
          </div>
        </div>
        <div
          className={`${
            activeTask === task._id ? 'flex' : 'hidden'
          } flex-col bg-gray-200 p-1 rounded transition-all duration-200`}
        >
          {task?.description.length > 1 ? (
            <p>{task.description}</p>
          ) : (
            <p>No description</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
