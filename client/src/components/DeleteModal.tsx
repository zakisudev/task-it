import { useDispatch } from 'react-redux';
import { deleteTask } from '../saga/taskActions';
import { toast } from 'react-toastify';

interface DeleteModalProps {
  setDeleteModal: (value: boolean) => void;
  deleteTaskId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  setDeleteModal,
  deleteTaskId,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      if (deleteTaskId) {
        dispatch(deleteTask(deleteTaskId));
        toast.success('Task deleted successfully');
        setDeleteModal(false);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full max-h-screen overflow-hidden inset-0 absolute top-0 bottom-0 right-0 left-0 bg-black/70">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex justify-center items-center bg-white rounded w-1/3 h-32 mx-auto">
          <div className="flex flex-col gap-3 p-5 items-center">
            <h1 className="text-2xl font-bold text-center">
              The selected task will be deleted, are you sure?
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
