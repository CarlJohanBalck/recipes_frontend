import React, {useState, useEffect} from 'react';
 const IngredientsInput = ({isFailure, databaseError, isLoading, isDone, onClick, ingredients, units, lastRecipeIngredientId, lastRecipeId}) => {
    const [ingredientInfo, setIngredientInfo] = useState({});

    useEffect(() => {
        setIngredientInfo((values => ({...values, recipe_id: lastRecipeId + 1})))
        setIngredientInfo((values => ({...values, recipe_ingredient_id: lastRecipeIngredientId + 1})))
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIngredientInfo(values => ({...values, [name]: value}))
        }
    const handleSubmit = (event) => {
        event.preventDefault();
        onClick(ingredientInfo)
    }

    let ingredientsOptions = ingredients.map((ingredients, index)=>{
        return(
            <option key={index} value={ingredients[0]}>{ingredients[1]}</option>
        )
    })

    let unitsOptions = units.map((units, index)=>{
        return(
            <option key={index} value={units[0]}>{units[1]}</option>
        )
    })


    return(
            <div className="row">
                <h3>Lägg till ingredienser</h3>
                <div className="input-field col">
                <label>Mängd</label>
                <input id="icon_prefix" name="amount" type="tel" className="validate" onChange={handleChange}/>
                </div>
                <div className="input-field col">
                <select className="browser-default" name="unit" onChange={handleChange}>
                    {unitsOptions}
                </select>
                </div>
                <div className="input-field col">
                
                <select className="browser-default" name="ingredient" onChange={handleChange}>
                    {ingredientsOptions}
                </select>
                </div>
                <button disabled={false} className="btn waves-effect waves-light" type="submit" name="action" onClick={handleSubmit}>Bekräfta ingrediens
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
    )
}

export default IngredientsInput;