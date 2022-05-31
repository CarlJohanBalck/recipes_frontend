import React, {useState} from 'react';
import genericfood from '../assets/genericfood.jpg'

// import Soyalax from '../assets/soyalax.jpg'

const Card = ({recepie, index, onClick}) => {
  
  const [card, setCard] = useState({
    selected: false,
    selectionComplete: false,
    groceryList: []
});


  const handleClick = (recept) => {
    const {selected} = card
    setCard({selected: selected ? false : true});
    onClick(recept, selected)
    }
  const {selected} = card
  return (
    <div className="card" key={recepie.id}>
        <div className="card-image">
          <div class="fade"></div>
            <img src={genericfood} alt=''/>
            
            {/* <img src={Soyalax} alt={recepie.title}/> */}
            <span className="card-title">{recepie[0].replace(/ *\([^)]*\) */g, "").slice(0, -1)}</span>
            
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => handleClick(recepie, selected)}><i className="material-icons">add</i></span>
        </div>

        <div className="card-content">
            <p>{recepie.desc}</p>
            <p><b>Pris: {recepie.price}</b></p>
        </div>
      </div>
  );
 }



export default Card;