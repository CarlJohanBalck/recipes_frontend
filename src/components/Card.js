import React, {useState} from 'react';

const Card = ({recepie, index, onClick}) => {
  
  const [card, setCard] = useState({
    selected: false,
    selectionComplete: false,
    groceryList: []
});


  const handleClick = (recept) => {
    setCard({selected: true});
    // list.push(recept)
    onClick(recept)
    }
  const {selected} = card
  let showComplete = selected ? "cards-selected" : "cards-standard"


  return (
        <div id={`card-${index}`} className={showComplete} onClick={() => handleClick(recepie,index)}>
          <h1>{recepie[0].replace(/ *\([^)]*\) */g, "").slice(0, -1)}</h1>
        </div>
  );
 }



export default Card;