import React, {useState} from 'react';

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
  let showComplete = selected ? "cards-selected" : "cards-standard"

  return (
        <div id={`card-${index}`} key={index} className={showComplete} onClick={() => handleClick(recepie, selected)}>
          <h1>{recepie[0].replace(/ *\([^)]*\) */g, "").slice(0, -1)}</h1>
        </div>
  );
 }



export default Card;