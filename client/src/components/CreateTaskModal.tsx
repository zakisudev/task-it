import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../saga/taskActions';
import { toast } from 'react-toastify';
import { CreateModalProps } from '../saga/interfaces';
import { FaXmark } from 'react-icons/fa6';

const CreateTaskModal: React.FC<CreateModalProps> = ({ setCreateModal }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    completed: false,
  });
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state: any) => state.error);

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(addTask(taskData));
      if (!loading && !error) {
        toast.success('Task created successfully');
        setTaskData({
          title: '',
          description: '',
          priority: '',
          completed: false,
        });
        setCreateModal(false);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full max-h-screen overflow-scroll inset-0 absolute top-0 bottom-0 right-0 left-0 bg-black/70 z-50">
      <div className="flex w-full h-full justify-center items-center">
        <div className="bg-white p-5 rounded flex flex-col justify-start items-center shadow-md relative">
          <button
            onClick={() => setCreateModal(false)}
            className="absolute top-0 right-0 m-5"
          >
            <FaXmark className="text-red-500 hover:rounded-full text-xl hover:bg-red-500 hover:text-gray-700 transition-all duration-200" />
          </button>
          <h1 className="text-2xl font-bold mb-5">Create new task</h1>
          <form
            onSubmit={handleCreateTask}
            className="flex flex-col w-full sm:w-[400px] bg-gray-300 p-2 sm:p-5 rounded shadow-md sm:pb-7"
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
                  value={taskData.title}
                  onChange={(e) =>
                    setTaskData({ ...taskData, title: e.target.value })
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
                        taskData.priority === 'low'
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
                      checked={taskData.priority === 'low'}
                      onChange={(e) =>
                        setTaskData({ ...taskData, priority: 'low' })
                      }
                    />
                  </div>

                  <div className="flex gap-1">
                    <label
                      htmlFor="medium"
                      className={`${
                        taskData.priority === 'medium'
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
                      checked={taskData.priority === 'medium'}
                      onChange={(e) =>
                        setTaskData({ ...taskData, priority: 'medium' })
                      }
                    />
                  </div>

                  <div className="flex gap-1">
                    <label
                      htmlFor="high"
                      className={`${
                        taskData.priority === 'high'
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
                      checked={taskData.priority === 'high'}
                      onChange={(e) =>
                        setTaskData({ ...taskData, priority: 'high' })
                      }
                    />
                  </div>
                </div>
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
                  value={taskData.description}
                  onChange={(e) =>
                    setTaskData({ ...taskData, description: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-1 bg-teal-500 rounded hover:bg-teal-700 transition-all duration-300 text-white text-lg font-semibold"
              >
                {loading ? 'Loading...' : 'Create Task'}
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

export default CreateTaskModal;
