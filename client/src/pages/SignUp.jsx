import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className='max-w-lg mx-auto px-2'>
      <h1 className='text-slate-700 font-semibold text-3xl text-center my-5'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4' autoComplete='off'>
        <input
          type='text'
          name='username'
          id='usename'
          placeholder='username'
          className='p-3 rounded-lg'
        />

        <input
          type='text'
          name='email'
          id='email'
          placeholder='email'
          className='p-3 rounded-lg'
        />

        <input
          type='text'
          name='password'
          id='password'
          placeholder='password'
          className='p-3 rounded-lg'
        />

        <button className='bg-slate-600 p-3 text-white rounded-lg uppercase disabled:bg-slate-400 hover:opacity-90'>
          Sign up
        </button>
      </form>

      <div className='flex gap-3 mt-3'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500 underline'>Sign-in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
