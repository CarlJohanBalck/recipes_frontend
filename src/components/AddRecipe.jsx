import React, {useEffect, useReducer} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as loading from '../assets/prepare-food.json';
import * as upload from '../assets/upload.json';
import * as done_upload from '../assets/done.json';

import Card from './Card'
import RecipeInput from './RecipeInput'
var config = require('../config');


const initialState = {
    done: false,
    selected: false,
    selectionComplete: false,
    selectionInProgress: false,
    ingredientsList: [],
    groceryList: [],
    currentList: [],
    recipeInfoList: [],
    totalPrice: 0
}

function reducer(state, action) {
    switch (action.type) {
      case 'initialize_success':
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        const ingredientsList = shuffle(action.payload);

        return {
            ...state,
            ingredientsList,
            done: true

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
            
    case 'confirm_recipe_progress':
        return {
            ...state,
            recipeInfoList: [...state.recipeInfoList, action.payload],
        };
    case 'remove_from_list':
        return {
            ...state,
            currentList: [...state.currentList.slice(1)],
            recipeInfoList: [...state.recipeInfoList.slice(1)],
            totalPrice: state.totalPrice > 0 ? state.totalPrice - action.payload[action.payload.length-2]: 0,
        };
      default:
        throw new Error();
    }
  }


function AddRecipe(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const confirmRecipe = (recipeInfo) => {
        dispatch({type: "confirm_recipe_progress", payload: recipeInfo})
        console.log("RECIPE INFO LIST: ", recipeInfo)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeInfo })
        };
          fetch(config.pi_post_add_recipe, requestOptions)
            .then(response => response.json())
            .then(json => {
              console.log("SUCCESS: ", json)
                dispatch({type: "confirm_selection_success", payload: json})
            })
            .catch(function() {
              console.log("error")
          })
        }

    
    useEffect(() => {
        fetch(config.pi_get_recepies)
        .then(response => response.json())
        .then(json => {
            console.log("JSON-----", json)
            dispatch({type: 'initialize_success',  payload: json})
        })
        .catch(function() {
            console.log("error")
        })
    }, [])

    return (
        <React.Fragment>
            <div>
                <RecipeInput onClick={(recipeInfo) => confirmRecipe(recipeInfo)}/>
            </div>
        </React.Fragment>
    );
}

export default AddRecipe;