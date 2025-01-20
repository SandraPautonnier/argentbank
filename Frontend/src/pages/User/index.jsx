import React from 'react'
import { Navigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/userSlice';
import EditUser from '../../components/EditUser'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Account from '../../components/Account';


const User = () => {

  if (!loginSuccess) {
    return <Navigate to='/login' />
  }

  return (
    <div className='content-body'>
      <NavBar />
      <main className="main bg-dark">
        <EditUser />
        <h2 className="sr-only">Accounts</h2>
        <Account />
        <Account />
        <Account />
      </main>
      <Footer />
    </div>
    
  )
}

export default User