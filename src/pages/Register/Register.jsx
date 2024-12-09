

import './Register.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, register } from '../../features/auth/authSlice';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    photo: null, 
  });

  const { name, email, password, phoneNumber, photo } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0], 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('password', password);
    userData.append('phoneNumber', phoneNumber);
    if (photo) {
      userData.append('photo', photo); 
    }
    dispatch(register(userData)); 
  };

  return (
    <div className='container'>
      <div className='right-container'>
        <div className='register-header'>
          <h1>Sign Up</h1>
          <p>Please register yourself</p>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              name='phoneNumber'
              value={phoneNumber}
              placeholder='Your Phone Number'
              onChange={onChange}
            />
          </div>
          <div>
            <h3>Add your profile picture</h3>
            <input
              type='file'
              name='photo'
              onChange={handleFileChange}
            />
          </div>
          <button type='submit' className='button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
