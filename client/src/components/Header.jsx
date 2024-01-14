import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='bg-slate-300 shadow-lg'>
      <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='flex flex-wrap font-bold text-sm sm:text-xl'>
            <span className='text-slate-500'>Manoj</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-xl flex items-center'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-500 ml-2' />
        </form>

        <ul className='flex items-center gap-4'>
          <Link to='/'>
            <li className='text-slate-700 hidden sm:inline hover:underline cursor-pointer'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='text-slate-700 hidden sm:inline hover:underline cursor-pointer'>
              About
            </li>
          </Link>
          <Link to='/sign-in'>
            <li className='text-slate-700 hover:underline cursor-pointer'>
              Sign-in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
