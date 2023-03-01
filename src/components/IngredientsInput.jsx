import React, {useState} from 'react';
 const IngredientsInput = ({onClick, ingredients, units}) => {
    const [ingredientInfo, setIngredientInfo] = useState({});


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log("NAME: ", name, "VALUE: ", value)
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
        <div>
            <label>Recept Ingrediens ID</label>
            <input id="icon_prefix" name="recipe_ingredient_id" type="tel" className="validate" onChange={handleChange}/>
            <label>Recept ID</label>
            <input id="icon_prefix" name="recipe_id" type="tel" className="validate" onChange={handleChange}/>
            <label>Mängd</label>
            <input id="icon_prefix" name="amount" type="tel" className="validate" onChange={handleChange}/>
            <label>Mått</label>
            <select class="browser-default" name="unit" onChange={handleChange}>
                {unitsOptions}
            </select>
            <label>Ingrediens</label>
            <select class="browser-default" name="ingredient" onChange={handleChange}>
                {ingredientsOptions}
            </select>
            <button disabled={false} className="btn waves-effect waves-light" type="submit" name="action" onClick={handleSubmit}>Bekräfta ingredienser</button>
        </div>
    )
}

export default IngredientsInput;