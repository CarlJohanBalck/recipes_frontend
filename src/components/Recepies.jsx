import React, {useState, useEffect} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import "../App.scss";
import * as imageLoader from '../assets/prepare-food.json';
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi' 
import Card from './Card'

function Recepies(props) {
    const list = []
    const [recepies, setRecepies] = useState({
            done: false,
            selected: false,
            selectionComplete: false,
            recepiesList: [],
            groceryList: [],
            selected: false
    });
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: imageLoader.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const confirmSelection = () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ list })
      };
        fetch('http://192.168.1.4:5001/Siri/ReactRecepies', requestOptions)
        // fetch('http://localhost:3000/groceryList')
          .then(response => response.json())
          .then(json => {
              console.log("RESPONSE JSON: ", json)
            setRecepies({
                ...recepies,
              groceryList: json,
              selectionComplete: true
            })
          })
          .catch(function() {
            console.log("error")
        })
      }
    const addToList = (recept) => {
        list.push(recept)
        }
    
    
    useEffect(() => {
        setRecepies({done: false});
        fetch("http://192.168.1.4:5001/Siri/Recepies")
        // fetch("http://localhost:3000/recepies")
        .then(response => response.json())
        .then(json => {
            setRecepies({
                recepiesList: json,
                done: true    
            })
        })
        .catch(function() {
            console.log("error")
        })
    }, [])

    const {recepiesList, done, selected} = recepies;
    let showComplete = selected ? "cards-selected" : "cards-standard"
    console.log("SELECTED: ", selected)
    return (
        <React.Fragment>
                <div>
                    {!done ? (
                        <FadeIn>
                            <div className="lottie">
                                <h2>Hämtar recept från Raspberry Pi</h2>
                            </div>
                            <Lottie options={defaultOptions} height={241} width={352} />
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            <div className='cards-slider-wrapper'>
                                {recepiesList.map((recept, index) => (
                                    <Card
                                        onClick={() => addToList(recept)}
                                        key={index}
                                        recepie={recept}
                                        index={index}
                                    />
                                
                                ))}
                            </div>
                            <button onClick={confirmSelection}>Slutför och generera inköpslista</button>
                        </FadeIn>
                        
                    )}
                </div>
            </React.Fragment>
    );
}

export default Recepies;