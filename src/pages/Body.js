import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/usersSlice';
import { openModal } from '../features/modalSlice';
import CustomModal from '../components/Modal';
import Loader from '../components/Loader';

const Body = () => {
  const [likedUsers, setLikedUsers] = useState([]);
 
  const { isOpen } = useSelector((state) => state.modal);
  const { users,loading } = useSelector((state) => state.app)

  const dispatch = useDispatch();

  const toggleLike = (userId) => {
    if (likedUsers.includes(userId)) {
      setLikedUsers(likedUsers.filter(id => id !== userId));
    } else {
      setLikedUsers([...likedUsers, userId]);
    }
  };

  const handleModal = (userId) => {
    dispatch(openModal(userId))
  }

  const handleDelete = (userId) =>{
    dispatch(deleteUser(userId))
  }

  useEffect(() => {
    dispatch(showUser())
  }, [])

  return (
    <>
      {
        loading ?
          <Loader/> :
          <div>
            {isOpen && <CustomModal/>}
            <Card handleDelete={handleDelete} toggleLike={toggleLike} likedUsers={likedUsers} users={users} handleModal={handleModal} />
          </div>
      }
    </>
  )
}

export default Body