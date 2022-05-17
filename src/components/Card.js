import React, {useState} from 'react';

let count = 0;

const list = []


const Card = ({recepie, index}) => {

  const [card, setCard] = useState({
    selected: false,
    selectionComplete: false,
    groceryList: []
});

  const handleClick = (recept, index) => {
    count += 1;
    setCard({selected: true});

    list.push(recept)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ list, index })
    };
    if (list.length > 4){
      // fetch('http://192.168.1.4:5001/Siri/ReactRecepies', requestOptions)
      fetch('http://localhost:3000/groceryList')
        .then(response => response.json())
        .then(json => {
          console.log("JSON----", json)
          setCard({
            groceryList: json,
            selectionComplete: true
          })
        })
        .catch(function() {
          console.log("error")
      })
      }
    }
  const {selected, selectionComplete, groceryList} = card
  let showComplete = selected ? "cards-green" : ""


  return (
    <React.Fragment>
        <div>
          {!selectionComplete ? (
              <div id={`card-${index}`} className={showComplete}>
                <h1 onClick={() => handleClick(recepie,index)}>{recepie[0]}</h1>
                <h1></h1>
              </div>
          ):(
            <h1>{groceryList[0]}</h1>
          )}
        </div>
      </React.Fragment>
  );
 }



export default Card;