import './BlogCard.css'
// const API_URL = 'https://blogapitaskindrajala.onrender.com/blogs';

import { deleteBlogById,getUserBlogs } from '../../features/blogs/blogSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
const BlogCard = ({id, title, description, image }) => {


 const dispatch = useDispatch();



const handleDelete = async () => {
  try {
    console.log('Delete clicked');
   
    await dispatch(deleteBlogById(id));

    
    alert('Blog deleted successfully!');

 
    await dispatch(getUserBlogs()); 
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Failed to delete post.');
  }
};
  return (
    <div className='blog-card'>
      <div>
        <h4 className='blog-title'>{title}</h4>
        <p className='blog-description'>{description}</p>
        <img
          src={`https://blogapitaskindrajala.onrender.com/uploads/${image}`}
          alt={title}
        />
      </div>
      <div>
        <AiOutlineDelete onClick={handleDelete}  />
        <FaRegEdit />
      </div>
    </div>
  );
};

export default BlogCard