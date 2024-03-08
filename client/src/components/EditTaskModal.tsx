import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateTask } from '../saga/taskActions';
import { EditTaskProps } from '../saga/interfaces';
import { FaXmark } from 'react-icons/fa6';

const EditTaskModal: React.FC<EditTaskProps> = ({ task, setEditModal }) => {
  const dispatch = useDispatch();
  const [updatedTaskData, setUpdatedTaskData] = useState({
    id: task?._id || '',
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || '',
    completed: task?.completed || false,
  });
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state: any) => state.error);

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateTask(updatedTaskData));
      if (!loading && !error) {
        toast.success('Task updated successfully');
        setUpdatedTaskData({
          id: '',
          title: '',
          description: '',
          priority: '',
          completed: false,
        });
        setEditModal(false);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full max-h-screen overflow-hidden inset-0 absolute top-0 bottom-0 right-0 left-0 bg-black/70 z-50">
      <div className="flex w-full h-full justify-center items-center">
        <div className="bg-white p-5 rounded flex flex-col justify-start items-center shadow-md relative">
          <button
            onClick={() => setEditModal(false)}
            className="absolute top-0 right-0 m-5"
          >
            <FaXmark className="text-red-500 hover:rounded-full text-3xl hover:bg-red-500 hover:text-gray-700 transition-all duration-200" />
          </button>
          <h1 className="text-2xl font-bold mb-5">Update task</h1>
          <form
            onSubmit={handleUpdateTask}
            className="flex flex-col w-[400px] sm:w-[400px] bg-gray-300 p-5 rounded shadow-md pb-7"
          >
            <div className="flex flex-col gap-3 mx-auto w-full">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="title" className="text-left w-full uppercase">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full sm:mr-2 px-2 py-1 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={updatedTaskData.title}
                  onChange={(e) =>
                    setUpdatedTaskData({
                      ...updatedTaskData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="priority"
                  className="text-left w-full uppercase"
                >
                  Priority
                </label>
                <div className="flex gap-3 items-start w-full justify-around">
                  <div className="flex gap-1">
                    <label
                      htmlFor="low"
                      className={`${
                        updatedTaskData.priority === 'low'
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      } px-2 py-1 rounded transition-all duration-300 ease-in-out`}
                    >
                      Low
                    </label>
                    <input
                      type="radio"
                      id="low"
                      name="priority"
                      className="w-full hidden sm:mr-2 px-2 py-1 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      checked={updatedTaskData.priority === 'low'}
                      onChange={(e) =>
                        setUpdatedTaskData({
                          ...updatedTaskData,
                          priority: 'low',
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-1">
                    <label
                      htmlFor="medium"
                      className={`${
                        updatedTaskData.priority === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-gray-200'
                      } px-2 py-1 rounded transition-all duration-300 ease-in-out`}
                    >
                      Medium
                    </label>
                    <input
                      type="radio"
                      id="medium"
                      name="priority"
                      className="w-full hidden sm:mr-2 px-2 py-1 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      checked={updatedTaskData.priority === 'medium'}
                      onChange={(e) =>
                        setUpdatedTaskData({
                          ...updatedTaskData,
                          priority: 'medium',
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-1">
                    <label
                      htmlFor="high"
                      className={`${
                        updatedTaskData.priority === 'high'
                          ? 'bg-red-500'
                          : 'bg-gray-200'
                      } px-2 py-1 rounded transition-all duration-300 ease-in-out`}
                    >
                      High
                    </label>
                    <input
                      type="radio"
                      id="high"
                      name="priority"
                      className="w-full hidden sm:mr-2 px-2 py-1 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      checked={updatedTaskData.priority === 'high'}
                      onChange={(e) =>
                        setUpdatedTaskData({
                          ...updatedTaskData,
                          priority: 'high',
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-1 w-full items-center">
                <label
                  htmlFor="completed"
                  className="text-left w-full uppercase"
                >
                  Completed
                </label>
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  className="w-5 h-5 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  checked={updatedTaskData.completed}
                  onChange={(e) =>
                    setUpdatedTaskData({
                      ...updatedTaskData,
                      completed: !updatedTaskData.completed,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="title" className="text-left w-full uppercase">
                  Description{' '}
                  <span className="text-gray-500 text-sm lowercase">
                    (optional)
                  </span>
                </label>
                <textarea
                  className="w-full sm:mr-2 px-2 py-1 rounded text-sm max-h-40 min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={updatedTaskData.description}
                  onChange={(e) =>
                    setUpdatedTaskData({
                      ...updatedTaskData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-1 bg-teal-500 rounded hover:bg-teal-700 transition-all duration-300 text-white text-lg font-semibold"
              >
                {loading ? 'Loading...' : 'Update Task'}
              </button>

              {error && (
                <p className="text-red-500 text-sm text-center font-semibold">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditTaskModal;
