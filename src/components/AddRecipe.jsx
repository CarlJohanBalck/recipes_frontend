import React, {useEffect, useReducer} from 'react';
import FadeIn from "react-fade-in";

import RecipeInput from './RecipeInput'
import IngredientsInput from './IngredientsInput'

var config = require('../config');


const initialState = {
    done: false,
    selected: false,
    selectionComplete: false,
    selectionInProgress: false,
    ingredientsList: [],
    unitsList: [],
    groceryList: [],
    currentList: [],
    recipeInfoList: [],
    totalPrice: 0
}

function reducer(state, action) {
    switch (action.type) {
      case 'initialize_success':
        const ingredientsList = (action.payloadIngredients);
        const unitsList = (action.payloadUnits);
        console.log("UNITS LIST: ", unitsList)

        return {
            ...state,
            ingredientsList,
            unitsList,
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
    case 'confirm_ingredient_progress':
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
        
    const confirmIngredients = (ingredientInfo) => {
        dispatch({type: "confirm_ingredient_progress", payload: ingredientInfo})
        console.log("INGREDIENT INFO LIST: ", ingredientInfo)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredientInfo })
        };
        fetch(config.pi_post_add_ingredient, requestOptions)
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

        Promise.all([
            fetch(config.pi_get_ingredients),
            fetch(config.pi_get_units),
        ])
            .then(([resIngredients, resUnits]) => 
            Promise.all([resIngredients.json(), resUnits.json()])
            )
            .then(([dataIngredients, dataUnits]) => {
                dispatch({type: 'initialize_success',  payloadIngredients: dataIngredients, payloadUnits: dataUnits})
            });
        }, []);

    const { done, ingredientsList, unitsList} = state

    return (
        <React.Fragment>
            <div>
            {!done ? (
                <FadeIn>
                    <div className="center">
                        <h2>Hämtar ingredienser och enheter från databas</h2>
                    </div>
                </FadeIn>
            ) : (
                <FadeIn>
                    <RecipeInput onClick={(recipeInfo) => confirmRecipe(recipeInfo)}/>
                    <IngredientsInput onClick={(ingredientInfo) => confirmIngredients(ingredientInfo)}  ingredients={ingredientsList} units={unitsList}/>
                </FadeIn>
            )}
            </div>
            
        </React.Fragment>
    );
}

export default AddRecipe;