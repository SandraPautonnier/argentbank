import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, type) => {
    switch (type) {
      case 'email':
        setEmail(event.target.value.trim());
        break;
      case 'password':
        setPassword(event.target.value.trim());
        break;
      case 'remember':
        setRemember(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    };
  
    try {
      const reponse = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email : email, password: password }),
      });

      const data = await reponse.json();
  
      if (reponse.ok) {
        const token = data.body?.token;
 
        //console.log("data :", data);
        //console.log("token :", token);
        
        dispatch(
          loginSuccess({
            token,
            remember,
          })
        );
        navigate('/profile');
        
      }
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  };


  return (
    <div className='content-body'>
      <NavBar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon className='sign-in-icon' icon={faUserCircle} />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                id="email"
                onChange={(event) => handleChange(event, 'email')}
                value={email}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(event) => handleChange(event, 'password')}
                value={password}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onChange={(event) => handleChange(event, 'remember')}
                checked={remember}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
