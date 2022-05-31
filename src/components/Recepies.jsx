import React, {useEffect, useReducer} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as imageLoader from '../assets/prepare-food.json';
import Card from './Card'
var config = require('../config');


const initialState = {
    done: false,
    selected: false,
    selectionComplete: false,
    recepiesList: [],
    groceryList: [],
    selectionList: [],
    currentList: []
}

function reducer(state, action) {
    switch (action.type) {
      case 'initialize_success':
        return {
            ...state,
            recepiesList: action.payload,
            done: true

        };
    case 'confirm_selection_success':
        return {
            ...state,
            groceryList: action.payload.slice(0, -1),
            selectionComplete: true,
            price: action.payload[action.payload.length-1]
        };
    case 'add_to_list':
        return {
            ...state,
            currentList: [...state.currentList, action.payload]
        };
    case 'remove_from_list':
        return {
            ...state,
            currentList: [...state.currentList.slice(1)]
        };
      default:
        throw new Error();
    }
  }

function Recepies(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: imageLoader.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const confirmSelection = () => {
        const {currentList} = state
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentList })
      };
        fetch(config.pi_post_selection, requestOptions)
          .then(response => response.json())
          .then(json => {
              dispatch({type: "confirm_selection_success", payload: json})
          })
          .catch(function() {
            console.log("error")
        })
      }
    const addToList = (recept, selected) => {
        console.log("ADD TO LIST----")
        selected ? dispatch({type: "remove_from_list", payload: recept}) : dispatch({type: "add_to_list", payload: recept})
    }
    
    useEffect(() => {
        fetch(config.pi_get_recepies)
        .then(response => response.json())
        .then(json => {
            dispatch({type: 'initialize_success',  payload: json})
        })
        .catch(function() {
            console.log("error")
        })
    }, [])
    const {done, selectionComplete, recepiesList, price, groceryList, currentList } = state

    let itemListTest = recepiesList.map((recept, index)=>{
        return(
            <Card
                onClick={(recept, selected) => addToList(recept, selected)}
                key={index}
                recepie={recept}
                index={index}
            />
        )
    })
   
     
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
                            {!selectionComplete ? (
                                <div className="container">
                                    <h3 className="center">Recept</h3>
                                    <div className="box">
                                    {itemListTest}
                                </div>
                                    <button class="btn waves-effect waves-light" type="submit" name="action" onClick={confirmSelection}>Bekräfta inköpslista
                                        <i class="material-icons right">send</i>
                                    </button>
                                </div>
                            ) : (

                                <div>
                                    <h1>Uppskattad kostnad: {price}kr</h1>
                                    {groceryList.map((grocery, index) => (
                                    <h1 key={index}>{grocery}</h1>
                                    ))}                    
                                </div>
                            )}
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
    );
}

export default Recepies;