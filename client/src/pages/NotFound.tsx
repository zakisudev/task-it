import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen justify-center items-center flex flex-col">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-lg font-semibold italic">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-5 bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 hover:bg-teal-600 transition-all duration-300 ease-in-out"
      >
        Go Back
      </button>
    </div>
  );
};
export default NotFound;
