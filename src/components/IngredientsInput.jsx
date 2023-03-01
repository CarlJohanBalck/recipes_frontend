import React, {useState} from 'react';
 const RecipesInput = () => {
    const [recipeInfo, setRecipeInfo] = useState({
        recipe_id: "",
        recipe_name: "",
        recipe_url: "",
        recipe_weekend: "",
        recipe_image_url: "",
        recipe_instructions: "",
    });
    const handleClick = () => {
       alert(recipeInfo.recipe_id + " " + recipeInfo.recipe_name)
        }
    return(
        <div class="row">
            <form class="col s12">
                <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="tel" class="validate" onChange={e => setRecipeInfo({...recipeInfo, recipe_id: e.target.value})}/>
                    <label for="icon_prefix">Recept ID</label>
                    </div>
                    <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="tel" class="validate" onChange={e => setRecipeInfo({...recipeInfo, recipe_name: e.target.value})}/>
                    <label for="icon_prefix">Namn på recept</label>
                    </div>
                    <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="tel" class="validate" onChange={e => setRecipeInfo({...recipeInfo, recipe_url: e.target.value})}/>
                    <label for="icon_prefix">Receipe Url</label>
                    </div>
                    <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="tel" class="validate" onChange={e => setRecipeInfo({...recipeInfo, recipe_weekend: e.target.value})}/>
                    <label for="icon_prefix">Helg</label>
                    </div>
                    <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="tel" class="validate" onChange={e => setRecipeInfo({...recipeInfo, recipe_image_url: e.target.value})}/>
                    <label for="icon_prefix">Image URL</label>
                    </div>
                    <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="tel" class="validate" onChange={e => setRecipeInfo({...recipeInfo, recipe_instructions: e.target.value})}/>
                    <label for="icon_prefix">Intructions</label>
                    </div>
                    <button disabled={false} className="btn waves-effect waves-light" type="submit" name="action" onClick={handleClick}>Bekräfta recept
                    <i className="material-icons right">send</i>
                 </button>
                </div>
            </form>
  </div>
    )
}

export default RecipesInput;