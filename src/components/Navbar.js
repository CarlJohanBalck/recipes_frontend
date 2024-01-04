import React from 'react';
import { FaUser } from 'react-icons/fa'; 

 const Navbar = ()=>{
    return(
      <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo center">Recept</a>
        <ul className="left hide-on-med-and-down">
          <li className="inactive"><a href="/addRecipe">Lägg till recept</a></li>
          <li className="inactive">
            <a href="/login">Logga in</a>
          </li>
          <FaUser className="profile-icon" />
        </ul>
      </div>
    </nav>
    )
}

export default Navbar;