import React, {useEffect, useReducer} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as loading from '../assets/prepare-food.json';
import * as upload from '../assets/upload.json';
import * as done_upload from '../assets/done.json';
import * as error_ani from '../assets/error.json';

import Card from './Card'
var config = require('../config');


const initialState = {
    done: false,
    loggedIn: false,
    selected: false,
    selectionComplete: false,
    selectionInProgress: false,
    recepiesList: [],
    groceryList: [],
    currentList: [],
    idList: [],
    initialLoadFailure: false
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
    case 'initialize_failure':
        return {
            ...state,
            initialLoadFailure: true
        };
    case 'confirm_selection_in_progress':
        return {
            ...state,
            selectionInProgress: true
        }
                
    case 'confirm_selection_success':
        return {
            ...state,
            selectionComplete: true,
            selectionInProgress: false,
        };
            
    case 'add_to_list':
        return {
            ...state,
            currentList: [...state.currentList, action.payload.slice(1,-1)],
            idList: [...state.idList, action.payload[0]]        
        };
    case 'remove_from_list':
        return {
            ...state,
            currentList: [...state.currentList.slice(1)],
            idList: [...state.idList.slice(1)]
        };
      default:
        throw new Error();
    }
  }



function Recepies() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const loadingConfig = {
        loop: true,
        autoplay: true,
        animationData: loading.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const uploadConfig = {
        loop: true,
        autoplay: true,
        animationData: upload.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const completeConfig = {
        loop: false,
        autoplay: true,
        animationData: done_upload.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const errorAni = {
        loop: false,
        autoplay: true,
        animationData: error_ani.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    
    const confirmSelection = () => {
        const {idList} = state
        dispatch({type: "confirm_selection_in_progress"})
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idList })
      };
        fetch(config.pi_post_selection, requestOptions)
          .then(response => response.json())
          .then(json => {
            console.log("SUCCESS: ", json)
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
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(config.pi_get_recepies, requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type: 'initialize_success',  payload: json})
        })
        .catch(function() {
            dispatch({type: 'initialize_failure'})
            console.log("error")
        })
    }, [])
    const { done, selectionComplete, selectionInProgress, recepiesList, currentList, initialLoadFailure } = state

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
                    {!done && !initialLoadFailure ? (
                        <FadeIn>
                            <div className="center">
                                <h2>Hämtar recept från databas</h2>
                                <Lottie options={loadingConfig} height="25%" width="25%"/>
                            </div>
                        </FadeIn>
                    ) : (
                      
                        <FadeIn>
                            {!selectionComplete && !selectionInProgress && !initialLoadFailure && (
                                <div className="container">
                                    <div className="box">
                                    {recepiesListRender}
                                </div>
                                    <ul className="collection">
                                    {currentList.map((recipe, index) => (
                                        <li key={index} className="collection-item">{recipe[0]}</li>
                                    ))}  
                                    </ul>
                                    <button disabled={buttonStatus} className="btn waves-effect waves-light" type="submit" name="action" onClick={confirmSelection}>Bekräfta inköpslista
                                        <i className="material-icons right">send</i>
                                    </button>
                                    
                                </div>
                            )}
                            {selectionInProgress && !selectionComplete && (
                                <FadeIn>
                                    <div className="center">
                                        <h2>Laddar upp inköpslista till Google Keep</h2>
                                        <Lottie options={uploadConfig} height="25%" width="25%"/>
                                    </div>
                                </FadeIn>
                            )}
                             {!selectionInProgress && selectionComplete && (
                                <FadeIn>
                                    <div className="center">
                                        <h2>Klart!</h2>
                                        <Lottie options={completeConfig} height="25%" width="25%"/>
                                    </div>
                                </FadeIn>
                            )}
                            {initialLoadFailure && (
                                <FadeIn>
                                    <div className="center">
                                        <h2>Kunde inte ladda hem recept</h2>
                                        <Lottie options={errorAni} height="25%" width="25%"/>
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