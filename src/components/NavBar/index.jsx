import React from 'react';
import { useNavigate, Navigate, Link  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import ArgentBankLogo from "../../assets/img/argentBankLogo.png";

const NavBar = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Appelle l'action de déconnexion
    navigate('/login');
  };

  /* if (loginSuccess) {
      return <Navigate to="/profile"/>
  } else {
    return <Navigate to="/Home"/>
  }; */



  return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to={'/'}>
            <img
              className="main-nav-logo-image"
              src={ArgentBankLogo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>

          <div>
            {isAuthenticated ? (
                <Link className="main-nav-item" onClick={handleLogout}>
                  <i className="fa fa-user-circle"></i>
                  Logout
                </Link>
              ) : (
                <Link className="main-nav-item" onClick={() => navigate('/login')}>
                  <i className="fa fa-user-circle"></i>
                  Login
                </Link>
              )}
          </div>
    </nav>
  )
}

export default NavBar