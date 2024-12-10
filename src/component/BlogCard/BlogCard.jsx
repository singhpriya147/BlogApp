import './BlogCard.css'
// const API_URL = 'https://blogapitaskindrajala.onrender.com/blogs';

const BlogCard = ({ title, description, image }) => {
 console.log(image);
  return (
    <div className='blog-card'>
      <h4 className='blog-title'>{title}</h4>
      <p className='blog-description'>{description}</p>
      <img
        src={`https://blogapitaskindrajala.onrender.com/uploads/${image}`}
        alt={title}
      />
    </div>
  );
};

export default BlogCard