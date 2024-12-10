import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, reset,updateProfile } from '../../features/auth/authSlice';
import './Profile.css'
const Profile = () => {
  const dispatch = useDispatch();


  const { user, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );


    const [formData, setFormData] = useState({
      briefDescription: '',
      detailedDescription: '',
      address: '',
 
    });

    const [isModalOpen, setIsModalOpen] = useState(false);


  console.log("user fetched",user);
  useEffect(() => {
    if(user){
         dispatch(getDetail());
    }
    
     
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };






      const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
          try {
            await dispatch(updateProfile( formData));

            alert('Profile updated successfully!');
            setIsModalOpen(false); 
            dispatch(getDetail()); 
          } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
          }
        } else {
          alert('Please login to update your profile.');
        }
      };

     const toggleModal = () => {
       setIsModalOpen(!isModalOpen);
     };

      useEffect(() => {
        if (user) {
          setFormData({
            briefDescription: user.briefDescription || '',
            detailedDescription: user.detailedDescription || '',
            address: user.address || '',
           
          });
        }
      }, [user]);

  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div>
      <div className='profile-card'>
        <h3>Profile Details</h3>
        {user && (
          <div>
            {user.address ||
            user.briefDescription ||
            user.detailedDescription ? (
              <div>
                <p>Address: {user.address}</p>
                <p>Brief Description: {user.briefDescription}</p>
                <p>Detailed Description: {user.detailedDescription}</p>
              </div>
            ) : (
              <p>NOT set yet</p>
            )}
          </div>
        )}
      </div>

      <button onClick={toggleModal}>Add Profile</button>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Profile Details</h3>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='briefDescription'>Brief Description</label>
                <textarea
                  name='briefDescription'
                  value={formData.briefDescription}
                  onChange={handleChange}
                  placeholder='Brief description'
                ></textarea>
              </div>
              <div className='form-group'>
                <label htmlFor='detailedDescription'>
                  Detailed Description
                </label>
                <textarea
                  name='detailedDescription'
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  placeholder='Detailed description'
                ></textarea>
              </div>
              <div className='form-group'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Enter your address'
                />
              </div>

              <div className='form-actions'>
                <button type='submit' disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                <button type='button' onClick={toggleModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;


