import React from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import ArgentBankLogo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/');
  };

  return (
        <nav className="main-nav">
          <Link className="main-nav-logo" onClick={handleLogout}>
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
                  <FontAwesomeIcon icon={faUserCircle} />
                  Logout
                </Link>
              ) : (
                <Link className="main-nav-item" onClick={() => navigate('/login')}>
                  <FontAwesomeIcon icon={faUserCircle} />
                  Login
                </Link>
              )}
          </div>
    </nav>
  )
}

export default NavBar