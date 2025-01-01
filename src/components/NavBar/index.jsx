import { Link } from "react-router-dom";
import React from 'react'
import ArgentBankLogo from "../../assets/img/argentBankLogo.png";

const NavBar = () => {
  return (
        <nav class="main-nav">
      <a class="main-nav-logo" href="./index.html">
        <img
          class="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </a>
      <div>
        <Link className="main-nav-item" to={`/login`}>
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  )
}

export default NavBar