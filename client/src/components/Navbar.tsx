import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 h-16 p-2 px-10 flex justify-between items-center shadow-lg bg-white">
      <Link
        to="/"
        className="text-xl font-bold bg-teal-600 px-2 text-white py-1 rounded text-center"
      >
        Task-it
      </Link>
    </nav>
  );
};

export default Navbar;
