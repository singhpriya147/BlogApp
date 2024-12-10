

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
  });
  const { username, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // user contain token 
  console.log("user",user);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if ( user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('You submitted the login form');
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  const fillCredentials = () => {
    const demoUsername = 'kevin123@gmail.com'; 
    const demoPassword = 'kevin123';
    setFormData({
      ...formData,
      username: demoUsername,
      password: demoPassword,
    });
  };

  return (
    <div className='container'>
      <div className='right-container'>
        <div className='header'>
          <h2>Login</h2>
          <p>Please login to your account</p>
        </div>

   
        <form className='form' onSubmit={onSubmit}>
         
          <div>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='Enter your username'
              onChange={onChange}
            />
          </div>

          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>
          <button
            type='button'
            style={{ backgroundColor: '#6A0DAD' }}
            onClick={fillCredentials}
          >
            Use Demo Credentials
          </button>
          <button type='submit'>Submit</button>
        </form>

        {/* For register section */}
        <div>
          <p>
            Need an Account?{' '}
            <Link to='/register'>
              <span> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
