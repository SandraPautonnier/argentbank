import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

const SignIn = () => {

  const [username, setUsername]  = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = (event, type) => {
    switch (type) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;  
      case "remember":
        setRemember(event.target.checked);
        break; 
      default:
        break;
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!username|| !password) {
      alert("Veuillez remplir les champs"); 
    return;
    }

    try {
      const reponse = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST", // ou 'PUT'
        headers: {
          "Content-Type": "application/json",
          /* Autorization: `Bearer ${token}` */
        },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim(),
        }),
      });
  
      const resultat = await reponse.json();
      console.log("Réussite :", resultat);
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  }

  return (
    <div>
      <NavBar />
      <main class="main bg-dark">
        <section class="sign-in-content">
          <i class="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div class="input-wrapper">
              <label for="username">Username</label>
              <input type="text" id="username" onChange={(event) => handleChange(event, "username")} value={username}/>
            </div>
            <div class="input-wrapper">
              <label for="password">Password</label>
              <input type="password" id="password" onChange={(event) => handleChange(event, "password")} value={password}/>
            </div>
            <div class="input-remember">
              <input type="checkbox" id="remember-me" onChange={(event) => handleChange(event, "remember")} value={remember}/>
              <label for="remember-me">Remember me</label>
            </div>
            <button class="sign-in-button" type='submit'>Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn