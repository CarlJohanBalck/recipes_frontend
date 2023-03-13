import React, {useEffect, useReducer} from 'react';
import FadeIn from "react-fade-in";

import RecipeInput from './RecipeInput'
import IngredientsInput from './IngredientsInput'

var config = require('../config');


const initialState = {
    done: false,
    addRecipeProgress: false,
    addRecipeDone: false,
    addRecipeFailure: false,
    addIngredientProgress: false,
    addIngredientDone: false,
    addIngredientFailure: false,
    databaseErrorAddRecipe: "",
    databaseErrorAddIngredient: "",
    selected: false,
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
                
    case 'confirm_recipe_success':
        return {
            ...state,
            addRecipeProgress: false,
            addRecipeDone: true,
        };
    case 'confirm_recipe_failure':
        return {
            ...state,
            addRecipeFailure: true,
            addRecipeProgress: false,
            databaseErrorAddRecipe: action.payload
        };
    case 'confirm_ingredient_success':
        return {
            ...state,
            addIngredientProgress: false,
            addIngredientDone: true,
        };
    case 'confirm_ingredient_failure':
        return {
            ...state,
            addIngredientProgress: false,
            addIngredientFailure: true,
        };
            
    case 'confirm_recipe_progress':
        return {
            ...state,
            addRecipeProgress: true,
            recipeInfoList: [...state.recipeInfoList, action.payload],
        };
    case 'confirm_ingredient_progress':
        return {
            ...state,
            addIngredientProgress: true,
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


function AddRecipe() {
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
                handleDatabaseResponseAddRecipe(json)
            })
            .catch(function() {
              console.log("error")
          })
        }
    const handleDatabaseResponseAddRecipe = (json) => {
        console.log("RESONSE: ", json)
        if (json === "200") {
            dispatch({type: "confirm_recipe_success"})
        } else {
            dispatch({type: "confirm_recipe_failure", payload: json})
        }

    }
    const handleDatabaseResponseAddIngredient = (json) => {
        console.log("ADD INGREDIENT RESONSE: ", json)
        if (json === "200") {
            dispatch({type: "confirm_ingredient_success"})
        } else {
            dispatch({type: "confirm_ingredient_failure", payload: json})
        }

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
                handleDatabaseResponseAddIngredient(json)
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

    const { done, ingredientsList, unitsList, lastRecipeId, lastIngredientId, lastRecipeIngredientId, addRecipeProgress, addRecipeDone, addRecipeFailure, databaseErrorAddRecipe, addIngredientFailure, databaseErrorAddIngredient, addIngredientProgress, addIngredientDone} = state

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
                    <div>
                        <RecipeInput isFailure={addRecipeFailure} databaseError={databaseErrorAddRecipe} isLoading={addRecipeProgress} isDone={addRecipeDone} onClick={(recipeInfo) => confirmRecipe(recipeInfo)} lastRecipeId={lastRecipeId}/>
                        <IngredientsInput isFailure={addIngredientFailure} databaseError={databaseErrorAddIngredient} isLoading={addIngredientProgress} isDone={addIngredientDone} onClick={(ingredientInfo) => confirmIngredients(ingredientInfo)} ingredients={ingredientsList} units={unitsList} lastRecipeId={lastRecipeId} lastIngredientId={lastIngredientId} lastRecipeIngredientId={lastRecipeIngredientId}/>
                    </div>
                </FadeIn>
            )}
            </div>
            
        </React.Fragment>
    );
}

export default AddRecipe;