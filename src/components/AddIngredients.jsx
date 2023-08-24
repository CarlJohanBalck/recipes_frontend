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
    recipesList: [],
    lastIngredientId: 0,
    lastRecipeId: 0,
    lastRecipeIngredientId: 0,
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
        const recipesList = (action.payloadRecipes);
        const recipeIngredientsList = (action.payloadRecipeIngredients);
        const lastRecipeIngredientId = recipeIngredientsList.length
        const lastRecipeId = recipesList.length
        const lastIngredientId = ingredientsList.length

        return {
            ...state,
            ingredientsList,
            lastIngredientId,
            lastRecipeIngredientId,
            lastRecipeId,
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


function AddIngredients() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const confirmRecipe = (recipeInfo) => {
        dispatch({type: "confirm_recipe_progress", payload: recipeInfo})
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeInfo })
        };
          fetch(config.pi_post_add_recipe, requestOptions)
            .then(response => response.json())
            .then(json => {
                dispatch({type: "confirm_selection_success", payload: json})
            })
            .catch(function() {
              console.log("error")
          })
        }

    const confirmIngredients = (ingredientInfo) => {
        dispatch({type: "confirm_ingredient_progress", payload: ingredientInfo})
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredientInfo })
        };
        fetch(config.pi_post_add_ingredient, requestOptions)
            .then(response => response.json())
            .then(json => {
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
            fetch(config.pi_get_recepies),
            fetch(config.pi_get_recipe_ingredients)
        ])
            .then(([resIngredients, resUnits, resRecipes, resRecipeIngredients]) => 
            Promise.all([resIngredients.json(), resUnits.json(), resRecipes.json(), resRecipeIngredients.json()])
            )
            .then(([dataIngredients, dataUnits, dataRecipes, dataRecipeIngredients]) => {
                dispatch({type: 'initialize_success',  payloadIngredients: dataIngredients, payloadUnits: dataUnits, payloadRecipes: dataRecipes, payloadRecipeIngredients: dataRecipeIngredients})
            });
        }, []);

    const { done, ingredientsList, unitsList, lastRecipeId, lastIngredientId, lastRecipeIngredientId} = state

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
                    <h3>Lägg till ingredienser i databas</h3>
                    <RecipeInput onClick={(recipeInfo) => confirmRecipe(recipeInfo)} lastRecipeId={lastRecipeId}/>
                    <h3>Lägg till ingredienser</h3>
                    <IngredientsInput onClick={(ingredientInfo) => confirmIngredients(ingredientInfo)} ingredients={ingredientsList} units={unitsList} lastRecipeId={lastRecipeId} lastIngredientId={lastIngredientId} lastRecipeIngredientId={lastRecipeIngredientId}/>
                </FadeIn>
            )}
            </div>
            
        </React.Fragment>
    );
}

export default AddIngredients;