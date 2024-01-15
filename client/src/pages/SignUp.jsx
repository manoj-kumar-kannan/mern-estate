import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await result.json();

      if (data?.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className='max-w-lg mx-auto px-2'>
      <h1 className='text-slate-700 font-semibold text-3xl text-center my-5'>
        Sign Up
      </h1>
      <form
        onSubmit={handleOnSubmit}
        className='flex flex-col gap-4'
        autoComplete='off'
      >
        <input
          type='text'
          name='username'
          id='usename'
          placeholder='username'
          className='p-3 rounded-lg'
          onChange={handleOnChange}
        />

        <input
          type='text'
          name='email'
          id='email'
          placeholder='email'
          className='p-3 rounded-lg'
          onChange={handleOnChange}
        />

        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
          className='p-3 rounded-lg'
          onChange={handleOnChange}
        />

        <button
          disabled={loading}
          className='bg-slate-600 p-3 text-white rounded-lg uppercase disabled:bg-slate-400 hover:opacity-90'
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </form>

      <div className='flex gap-3 mt-3'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500 underline'>Sign-in</span>
        </Link>
      </div>

      {error && (
        <p className='text-red-700 font-semibold mt-5'>{`Error: ${error}`}</p>
      )}
    </div>
  );
}

export default SignUp;
