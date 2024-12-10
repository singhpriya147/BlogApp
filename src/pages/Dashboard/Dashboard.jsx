import Header from "../../component/Header/Header"
import Profile from "../../component/Profile/Profile"
import { useDispatch, useSelector } from 'react-redux';
import { getUserBlogs } from "../../features/blogs/blogSlice";
import { useEffect } from "react";
import './Dashboard.css'

import BlogCard from "../../component/BlogCard/BlogCard";
const Dashboard = () => {
  const dispatch = useDispatch();
   const { user, isError, isLoading, message } = useSelector(
     (state) => state.auth
   );
  const { blogs, loading, error } = useSelector((state) => state.blog); 

  useEffect(() => {
    if (user) {
      
       dispatch(getUserBlogs()); 
    }
     
    
  }, []);
  return (
    <div className="dashboard">
      <Header />
    
      <Profile />
      <div className="blog-container">
        <h3>Your Blogs:</h3>
        <div className='blog-list'>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard