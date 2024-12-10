import './Header.css';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteUser} from '../../features/auth/authSlice';
import { useState } from 'react';
import { logout } from '../../features/auth/authSlice';
// import { useSelector } from 'react-redux';
import { getUserBlogs, postBlog } from '../../features/blogs/blogSlice';

import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '', // 'description' is the correct field name
    image: null,
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // This should update 'description' field
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append('title', formData.title);
  //   data.append('description', formData.description); // Ensure 'description' is passed
  //   data.append('image', formData.image);

  //   try {
      
  //     await dispatch(postBlog( data, token ));
  //     setIsModalOpen(false); 
  //   } catch (error) {
  //     console.error('Error submitting post:', error);
  //     alert('Failed to submit post.');
  //   }
  // };


const handleSubmit = async (e) => {
  e.preventDefault();

  // const user = JSON.parse(localStorage.getItem('user'));
  // const token = user?.token;

  if (!token) {
    alert('Please log in again.');
    return;
  }

  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('image', formData.image);

  try {
    await dispatch(postBlog(data));
     // Pass token to the action
    setIsModalOpen(false);
    alert('Blog deleted successfully!');
    await dispatch(getUserBlogs())
  } catch (error) {
    console.error('Error submitting post:', error);
    alert('Failed to submit post.');
  }
};

const handleLogout=()=>{
  dispatch(logout())
  navigate('/');
}

  return (
    <nav>
      <h2>LOGO</h2>
      <ul>
        <MdDelete onClick={handleDeleteUser} />
        <button onClick={handleToggleModal}>Add post</button>
        <button onClick={handleLogout}>Logout</button>
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Add New Post</h3>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='Enter post title'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>{' '}
                {/* Updated label */}
                <textarea
                  id='description' // Updated name and id to match 'description'
                  name='description' // Ensure the 'name' matches 'description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='Enter post description'
                  required
                ></textarea>
              </div>
              <div className='form-group'>
                <label htmlFor='image'>Image</label>
                <input
                  type='file'
                  id='image'
                  name='image'
                  accept='image/*'
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className='form-actions'>
                <button type='submit'>Submit</button>
                <button type='button' onClick={handleToggleModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
