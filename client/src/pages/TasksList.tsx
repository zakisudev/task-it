import { useEffect, useState } from 'react';
import { fetchTasks } from '../saga/taskActions';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { TaskData } from '../saga/interfaces';
import CreateTaskModal from '../components/CreateTaskModal';

const Tasks = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const tasks = useSelector((state: any) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      {createModal && <CreateTaskModal setCreateModal={setCreateModal} />}

      <div className="bg-gray-200 h-screen p-2 sm:p-5 flex">
        <div className="bg-white relative p-5 rounded flex flex-col justify-start items-center shadow-md w-full h-full overflow-scroll">
          <h1 className="text-3xl font-bold mb-5">Tasks</h1>

          <div className="absolute top-7 right-7 gap-2 items-center">
            <button
              onClick={() => setCreateModal(true)}
              className="px-1 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition-all duration-200"
            >
              New Task
            </button>
          </div>

          {tasks?.length < 1 ? (
            <h1 className="text-2xl text-center text-gray-400">No tasks yet</h1>
          ) : (
            <div className="flex flex-col-reverse sm:flex-row gap-10 sm;gap-5 w-full">
              <div className="flex flex-col w-full sm:w-2/3">
                <h2 className="text-2xl uppercase ">
                  {tasks?.filter((t: any) => t.completed === true).length === 1
                    ? 'Incomplete task'
                    : 'Incomplete tasks'}
                </h2>
                <div className="flex flex-col gap-3">
                  {tasks &&
                    tasks
                      ?.filter((t: any) => t.completed !== true)
                      ?.map((task: TaskData) => (
                        <TaskCard task={task} key={task._id} />
                      ))}
                </div>
              </div>

              <div className="flex flex-col w-full sm:w-1/3">
                <h2 className="text-2xl uppercase">Completed tasks</h2>
                <div className="flex flex-col gap-3">
                  {tasks?.filter((t: any) => t.completed === true).length <
                  1 ? (
                    <h1 className="text-2xl text-center text-gray-400">
                      No completed tasks
                    </h1>
                  ) : (
                    tasks
                      ?.filter((t: any) => t.completed === true)
                      ?.map((task: TaskData) => (
                        <TaskCard task={task} key={task._id} />
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
