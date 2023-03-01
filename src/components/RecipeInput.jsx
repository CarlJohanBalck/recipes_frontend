import React, {useState, useEffect} from 'react';
 const RecipeInput = ({onClick, lastRecipeId}) => {
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
        <div className="row">
            <form className="col s12">
                <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={lastRecipeId + 1} name="recipe_id" type="tel" className="validate" onChange={handleChange}/>
                    <label for="icon_prefix">Recept ID</label>
                    </div>
                    <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={recipeInfo.recipe_name} name="recipe_name" type="tel" className="validate" onChange={handleChange}/>
                    <label for="icon_prefix">Namn på recept</label>

                    </div>
                    <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={recipeInfo.recipe_url} name="recipe_url" type="tel" className="validate" onChange={handleChange}/>
                    <label for="icon_prefix">Receipe Url</label>
                    </div>
                    <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={recipeInfo.recipe_weekend} name="recipe_weekend" type="tel" className="validate" onChange={handleChange}/>
                    <label for="icon_prefix">Helg</label>
                    </div>
                    <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={recipeInfo.recipe_image_url} name="recipe_image_url" type="tel" className="validate" onChange={handleChange}/>
                    <label for="icon_prefix">Image URL</label>
                    </div>
                    <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={recipeInfo.recipe_instructions} name="recipe_instructions" type="tel" className="validate" onChange={handleChange}/>
                    <label for="icon_prefix">Intructions</label>
                    </div>
                    <button disabled={false} className="btn waves-effect waves-light" type="submit" name="action" onClick={handleSubmit}>Bekräfta recept
                    <i className="material-icons right">send</i>
                 </button>
                </div>
            </form>
            
        </div>
    )
}

export default RecipeInput;