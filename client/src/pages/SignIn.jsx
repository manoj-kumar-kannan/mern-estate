import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(signInStart());
      const result = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();

      if (data?.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='max-w-lg mx-auto px-2'>
      <h1 className='text-3xl font-semibold text-slate-700 my-5 text-center'>
        Sign In
      </h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='email'
          id='email'
          placeholder='email'
          onChange={handleOnChange}
          className='p-3 rounded-lg'
        />

        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
          onChange={handleOnChange}
          className='p-3 rounded-lg'
        />

        <button className='p-3 rounded-lg bg-slate-600 text-white uppercase hover:opacity-90 disabled:bg-slate-500'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <p className='mt-3'>
        <span>Dont have account?</span>
        <Link to={'/sign-up'}>
          <span className='text-blue-700 underline ml-3'>Sign Up</span>
        </Link>
      </p>

      {error && <p className='text-red-700 font-semibold mt-5'>{error}</p>}
    </div>
  );
}

export default SignIn;
