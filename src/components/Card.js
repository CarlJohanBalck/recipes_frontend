import React, {useState} from 'react';

const Card = ({recipe, index, onClick}) => {
  
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
  let operation = selected ? "remove" : "add"
  let buttonColor = selected ? "btn-floating halfway-fab waves-effect waves-light red" : "btn-floating halfway-fab waves-effect waves-light green"
  return (
    <div className="card" key={recipe.id}>
        <div className="card-image">
          <div className="fade"/>
            <img src={recipe[recipe.length-1]} alt=''/>            
            <span className="card-title">{recipe[1]}</span>
            <span to="/" className={buttonColor} onClick={() => handleClick(recipe, selected)}><i className="material-icons">{operation}</i></span>
        </div>
        <div className='card-content'>
            <p>{recipe.desc}</p>
        </div>
      </div>
  );
 }
export default Card;