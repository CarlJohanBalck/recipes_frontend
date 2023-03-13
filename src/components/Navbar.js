import React from 'react';
 const Navbar = ()=>{
    return(
      <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo center">Recept
        </a>
        <ul className="left hide-on-med-and-down">
          <li className="inactive"><a href="/addRecipe">Lägg till recept</a></li>
        </ul>
      </div>
    </nav>
    )
}

export default Navbar;