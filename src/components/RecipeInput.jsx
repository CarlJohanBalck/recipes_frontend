import React, {useState, useEffect} from 'react';
 const RecipeInput = ({onClick, lastRecipeId, isLoading, isDone, isFailure, databaseError}) => {
    const [recipeInfo, setRecipeInfo] = useState({});


    useEffect(() => {
        setRecipeInfo((values => ({...values, recipe_id: lastRecipeId + 1})))
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRecipeInfo(values => ({...values, [name]: value}))
        }
    const handleSubmit = (event) => {
        event.preventDefault();
        onClick(recipeInfo)
    }
       
    return(
        <React.Fragment>
        <div>
                <div>
                    <h4>Antal recept: {lastRecipeId}</h4>
                    <form className=" s12">
                        <div className="row">
                            <div className="input-field col">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" value={recipeInfo.recipe_name} name="recipe_name" type="tel" className="validate" onChange={handleChange}/>
                            <label for="icon_prefix">Namn på recept</label>

                            </div>
                            <div className="input-field col">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" value={recipeInfo.recipe_url} name="recipe_url" type="tel" className="validate" onChange={handleChange}/>
                            <label for="icon_prefix">Receipe Url</label>
                            </div>
                            <div className="input-field col">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" value={recipeInfo.recipe_weekend} name="recipe_weekend" type="tel" className="validate" onChange={handleChange}/>
                            <label for="icon_prefix">Helg</label>
                            </div>
                            <div className="input-field col">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" value={recipeInfo.recipe_image_url} name="recipe_image_url" type="tel" className="validate" onChange={handleChange}/>
                            <label for="icon_prefix">Image URL</label>
                            </div>
                            <div className="input-field col">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" value={recipeInfo.recipe_instructions} name="recipe_instructions" type="tel" className="validate" onChange={handleChange}/>
                            <label for="icon_prefix">Intructions</label>
                            </div>
                            
                            <button disabled={isDone} className="btn waves-effect waves-light" type="submit" name="action" onClick={handleSubmit}>Bekräfta recept
                                {!isLoading && !isDone && !isDone && !isFailure && (
                                    <i className="material-icons right">send</i> 
                                )}
                                {isLoading && (
                                    <i className="material-icons right">loop</i>
                                )}
                                {isFailure && (
                                    <i className="material-icons right">error</i>
                                )}
                                {isDone && (
                                    <i className="material-icons right">check</i>
                                )}
                            </button>

                        </div>
                    </form>
                </div>
  
        </div>
        </React.Fragment>
    )
}

export default RecipeInput;