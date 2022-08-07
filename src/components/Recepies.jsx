import React, {useEffect, useReducer} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as loading from '../assets/prepare-food.json';
import * as download from '../assets/download.json';

import Card from './Card'
import { current } from '@reduxjs/toolkit';
var config = require('../config');


const initialState = {
    done: false,
    selected: false,
    selectionComplete: false,
    recepiesList: [],
    groceryList: [],
    currentList: [],
    idList: [],
    totalPrice: 0
}

function reducer(state, action) {
    switch (action.type) {
      case 'initialize_success':
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        const recepiesList = shuffle(action.payload);

        return {
            ...state,
            recepiesList,
            done: true

        };
    case 'confirm_selection_success':
        const groceryListResult = action.payload;
        const currentList = state.currentList;
        downloadLists(groceryListResult, currentList)
        return {
            ...state,
            groceryList: groceryListResult,
            selectionComplete: true,
            price: groceryListResult[groceryListResult.length-1]};
            
    case 'add_to_list':
        return {
            ...state,
            currentList: [...state.currentList, action.payload.slice(1,-1)],
            idList: [...state.idList, action.payload[0]],
            totalPrice: state.totalPrice + action.payload[action.payload.length-1]
        };
    case 'remove_from_list':
        return {
            ...state,
            currentList: [...state.currentList.slice(1)],
            idList: [...state.idList.slice(1)],
            totalPrice: state.totalPrice > 0 ? state.totalPrice - action.payload[action.payload.length-1]: 0,
        };
      default:
        throw new Error();
    }
  }

const downloadLists = (groceryList, dishList) => {
    let groceryString  = groceryList.join('\r\n');
    let dishListString = dishList.join('\r\n');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}`;

    const element = document.createElement("a");
    const file = new Blob([groceryString], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    element.download = "groceryList_"+ date + ".txt";
    document.body.appendChild(element);
    element.click();

    const element2 = document.createElement("a");
    const file2 = new Blob([dishListString], {type: "text/plain"});
    element2.href = URL.createObjectURL(file2);
    element2.download = "dishList_"+ date + ".txt";
    document.body.appendChild(element2);
    element2.click();
}

function Recepies(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const loadingConfig = {
        loop: true,
        autoplay: true,
        animationData: loading.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const completeConfig = {
        loop: false,
        autoplay: true,
        animationData: download.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    
    const confirmSelection = () => {
        const {idList} = state
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idList })
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
    const addToList = (recipe, selected) => {
        selected ? dispatch({type: "remove_from_list", payload: recipe}) : dispatch({type: "add_to_list", payload: recipe})
    }
    
    useEffect(() => {
        fetch(config.pi_get_recepies)
        .then(response => response.json())
        .then(json => {
            console.log("USE EFFECT: ", json)
            dispatch({type: 'initialize_success',  payload: json})
        })
        .catch(function() {
            console.log("error")
        })
    }, [])
    const { done, selectionComplete, recepiesList, currentList, totalPrice } = state

    console.log("TOTAL PRICE", totalPrice)


    let recepiesListRender = recepiesList.map((recipe, index)=>{
        return(
            <Card
                onClick={(recipe, selected) => addToList(recipe, selected)}
                key={index}
                recipe={recipe}
                index={index}
            />
        )
    })
    let buttonStatus = currentList.length > 0 ? false : true;

     
    return (
        <React.Fragment>
                <div>
                    {!done ? (
                        <FadeIn>
                            <div className="center">
                                <h2>Hämtar recept från Raspberry Pi</h2>
                                <Lottie options={loadingConfig} height="25%" width="25%"/>
                            </div>
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            {!selectionComplete ? (
                                <div className="container">
                                    <div className="box">
                                    {recepiesListRender}
                                </div>
                                    <h3>Total kostnad: {totalPrice}kr</h3>
                                    <ul className="collection">
                                    {currentList.map((recipe, index) => (
                                        <li key={index} className="collection-item">{recipe[0]}</li>
                                    ))}  
                                    </ul>
                                    <button disabled={buttonStatus} className="btn waves-effect waves-light" type="submit" name="action" onClick={confirmSelection}>Bekräfta inköpslista
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            ) : (

                                <FadeIn>
                                    <div className="center">
                                        <h2>Laddar ner inköpslista och matlista...</h2>
                                        <Lottie options={completeConfig} height="25%" width="25%"/>
                                    </div>
                                </FadeIn>
                            )}
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
    );
}

export default Recepies;