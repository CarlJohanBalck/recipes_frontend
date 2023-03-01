import React from 'react';
 const Navbar = ()=>{
    return(
      <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo center">Recept
        </a>
        <ul class="left hide-on-med-and-down">
          <li class="inactive"><a href="/addRecipe">Lägg till recept</a></li>
          <li class="inactive"><a href="/addIngredients">Lägg till ingredienser</a></li>
        </ul>
      </div>
    </nav>
   
        
    )
}

export default Navbar;